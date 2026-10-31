#!/usr/bin/env node
// Penjaga konten: menggagalkan build produksi bila masih ada placeholder,
// pelanggaran privasi, atau klaim yang dilarang.
// Untuk pratinjau lokal saat data belum lengkap: ALLOW_TODO=true (npm run build:preview).

import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'src/content');
const allowTodo = process.env.ALLOW_TODO === 'true';

const errors = [];
const todos = [];
const rel = (p) => path.relative(ROOT, p);
const words = (s) => (s ? s.trim().split(/\s+/).filter(Boolean).length : 0);

const PLACEHOLDER = /\b(TODO|FIXME|TBD|LOREM IPSUM)\b/i;
const CLICHE = /\b(passionate|innovative|cutting-edge|ninja|rockstar|50\+\s*proyek)\b/i;
const SKILL_PERCENT = /\b[A-Za-z+#.]{2,20}\s*[:=-]?\s*\d{1,3}\s?%/;
const NIK = /\b\d{16}\b/;
const PHONE = /(\+62|\b08)[\s-]?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{2,5}\b/;

function scan(file) {
  const isYaml = /\.ya?ml$/.test(file);
  fs.readFileSync(file, 'utf-8').split('\n').forEach((line, i) => {
    const at = `${rel(file)}:${i + 1}`;
    const isComment = isYaml && line.trim().startsWith('#');
    if (PLACEHOLDER.test(line)) todos.push(`${at}  ${line.trim().slice(0, 90)}`);
    if (isComment) return;
    if (CLICHE.test(line)) errors.push(`${at}  kata klise terdeteksi: "${line.match(CLICHE)[0]}"`);
    if (SKILL_PERCENT.test(line) && /skill|bar|persen/i.test(file + line))
      errors.push(`${at}  dilarang memakai persentase skill`);
    if (NIK.test(line)) errors.push(`${at}  16 digit berurutan (mirip NIK) dilarang tampil`);
    if (PHONE.test(line)) errors.push(`${at}  mirip nomor telepon: hapus kecuali Anda mengizinkan`);
  });
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (/\.(ya?ml|md)$/.test(e.name)) scan(full);
  }
}

function frontmatter(file) {
  const m = fs.readFileSync(file, 'utf-8').match(/^---\n([\s\S]*?)\n---/);
  return m ? load(m[1]) : {};
}

function checkAsset(file, field, value) {
  if (value && !PLACEHOLDER.test(value) && !fs.existsSync(path.join(ROOT, value)))
    errors.push(`${rel(file)}  ${field}: file "${value}" tidak ditemukan`);
}

walk(CONTENT);

for (const loc of fs.readdirSync(CONTENT)) {
  const dir = path.join(CONTENT, loc);
  if (!fs.statSync(dir).isDirectory()) continue;

  const profileFile = path.join(dir, 'profile.yaml');
  if (fs.existsSync(profileFile)) {
    const p = load(fs.readFileSync(profileFile, 'utf-8')) ?? {};
    if (words(p.about) > 120) errors.push(`${rel(profileFile)}  "about" ${words(p.about)} kata (maks. 120)`);
    checkAsset(profileFile, 'avatar', p.avatar);
  }

  const slugs = new Set();
  const projDir = path.join(dir, 'projects');
  if (fs.existsSync(projDir)) {
    for (const f of fs.readdirSync(projDir).filter((x) => x.endsWith('.md'))) {
      const file = path.join(projDir, f);
      slugs.add(f.replace(/\.md$/, ''));
      const fm = frontmatter(file);
      if (!PLACEHOLDER.test(fm.status ?? '') && !['selesai', 'prototipe', 'sedang-dikerjakan'].includes(fm.status))
        errors.push(`${rel(file)}  status harus: selesai | prototipe | sedang-dikerjakan`);
      checkAsset(file, 'coverImage', fm.coverImage);
      if (fm.coverImage && !fm.coverAlt) errors.push(`${rel(file)}  coverImage butuh coverAlt`);
    }
  }

  const skillsFile = path.join(dir, 'skills.yaml');
  if (fs.existsSync(skillsFile)) {
    const s = load(fs.readFileSync(skillsFile, 'utf-8')) ?? {};
    for (const g of s.groups ?? [])
      for (const it of g.items ?? []) {
        if (!it.projectSlugs?.length && !it.evidence?.length)
          errors.push(`${rel(skillsFile)}  skill "${it.name}" belum punya bukti (projectSlugs atau evidence)`);
        for (const slug of it.projectSlugs ?? [])
          if (!slugs.has(slug)) errors.push(`${rel(skillsFile)}  skill "${it.name}" merujuk proyek "${slug}" yang tidak ada`);
      }
  }
}

if (errors.length) {
  console.error(`\nKESALAHAN KONTEN (${errors.length}):`);
  errors.forEach((e) => console.error('  - ' + e));
}

if (todos.length) {
  if (allowTodo) {
    console.log(`\nPeringatan: ${todos.length} placeholder tersisa (ALLOW_TODO=true, hanya untuk pratinjau).`);
  } else {
    console.error(`\nBUILD PRODUKSI DIBATALKAN: ${todos.length} placeholder masih ada.`);
    todos.slice(0, 12).forEach((t) => console.error('  - ' + t));
    if (todos.length > 12) console.error(`  ... dan ${todos.length - 12} lainnya`);
    console.error('\nLengkapi konten di src/content/, atau pakai "npm run build:preview" untuk pratinjau.');
  }
}

if (errors.length || (todos.length && !allowTodo)) process.exit(1);
console.log('Pengecekan konten lolos.');

