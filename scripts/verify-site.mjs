#!/usr/bin/env node
// Verifikasi dist/: screenshot 360/768/1280 (terang + gelap), error console,
// overflow horizontal, link internal mati, gambar tanpa alt, dan toggle tema.
// Jalankan setelah build:  npm run build:preview && npm run verify

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const DIST = path.resolve('dist');
const OUT = path.resolve(process.env.SHOT_DIR ?? 'screenshots');
const PAGES = ['/', '/cv/'];
const WIDTHS = [360, 768, 1280];
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' };

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = path.join(DIST, p);
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, () => resolve(server));
  });
}

const problems = [];
const note = (m) => problems.push(m);

const server = await serve();
const base = `http://localhost:${server.address().port}`;
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

for (const scheme of ['light', 'dark']) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    for (const route of PAGES) {
      const page = await ctx.newPage();
      const tag = `${route === '/' ? 'home' : 'cv'}-${width}-${scheme}`;
      page.on('console', (m) => m.type() === 'error' && note(`[${tag}] console error: ${m.text()}`));
      page.on('pageerror', (e) => note(`[${tag}] page error: ${e.message}`));
      page.on('requestfailed', (r) => {
        if (r.url().startsWith(base)) note(`[${tag}] request gagal: ${r.url()}`);
      });
      const resp = await page.goto(base + route, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(1000);
      if (!resp?.ok()) note(`[${tag}] status ${resp?.status()}`);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (overflow > 0) note(`[${tag}] overflow horizontal ${overflow}px`);

      const noAlt = await page.$$eval('img:not([alt])', (n) => n.length);
      if (noAlt) note(`[${tag}] ${noAlt} gambar tanpa alt`);

      if (scheme === 'light' && width === 1280) {
        const hrefs = await page.$$eval('a[href]', (a) => a.map((x) => x.getAttribute('href')));
        for (const h of new Set(hrefs)) {
          if (!h || /^(mailto:|https?:)/.test(h)) continue;
          const [pathPart, hash] = h.split('#');
          const target = pathPart || route;
          const r = await page.request.get(new URL(target, base + route).href);
          if (!r.ok()) { note(`link mati: ${h} (di ${route})`); continue; }
          if (hash && !pathPart && !(await page.$(`#${hash}`))) note(`anchor tidak ada: #${hash}`);
          if (hash && pathPart) {
            const html = await r.text();
            if (!html.includes(`id="${hash}"`)) note(`anchor tidak ada: ${h}`);
          }
        }
      }
      await page.screenshot({ path: path.join(OUT, `${tag}.png`), fullPage: true });
      await page.close();
    }
    await ctx.close();
  }
}

// Uji toggle tema (sistem terang -> klik -> gelap -> klik -> kembali ke sistem).
{
  const ctx = await browser.newContext({ colorScheme: 'light' });
  const page = await ctx.newPage();
  await page.goto(base + '/');
  const meta = () => page.$eval('meta[name="color-scheme"]', (m) => m.content);
  const stored = () => page.evaluate(() => localStorage.getItem('color-scheme'));
  await page.click('[data-theme-toggle]');
  if ((await meta()) !== 'dark' || (await stored()) !== 'dark') note('toggle: klik pertama harus ke gelap');
  await page.reload();
  if ((await meta()) !== 'dark') note('toggle: pilihan tidak bertahan setelah reload');
  await page.click('[data-theme-toggle]');
  if ((await meta()) !== 'light dark' || (await stored()) !== null) note('toggle: klik kedua harus kembali ke sistem');
  await ctx.close();
}

await browser.close();
server.close();

if (problems.length) {
  console.error(`\nVERIFIKASI: ${problems.length} masalah`);
  problems.forEach((p) => console.error('  - ' + p));
  process.exit(1);
}
console.log(`Verifikasi lolos. Screenshot: ${OUT}`);

