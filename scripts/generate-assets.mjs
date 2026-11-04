import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
fs.mkdirSync(PUBLIC, { recursive: true });

async function run() {
  const browser = await chromium.launch();

  // 1. Generate OG Image (1200x630)
  const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

  // Read base64 photo
  const photoPath = path.join(ROOT, 'src/assets/profile/foto_profile_formal.jpg');
  const photoBase64 = fs.existsSync(photoPath)
    ? `data:image/jpeg;base64,${fs.readFileSync(photoPath).toString('base64')}`
    : '';

  const ogHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #faf8f5;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      color: #1c1b18;
      display: flex;
      padding: 64px 72px;
      position: relative;
      overflow: hidden;
    }
    body::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 85% 20%, rgba(31, 94, 75, 0.08), transparent 50%),
                  radial-gradient(circle at 10% 90%, rgba(31, 94, 75, 0.05), transparent 45%);
      pointer-events: none;
    }
    .inner {
      width: 100%;
      height: 100%;
      border: 1px solid #e4dfd7;
      border-radius: 16px;
      background: #f2efe9;
      padding: 48px 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04);
      position: relative;
      z-index: 1;
    }
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: #faf8f5;
      border: 1px solid #1f5e4b;
      color: #1f5e4b;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      width: fit-content;
    }
    .pulse {
      width: 8px; height: 8px; border-radius: 50%; background: #16a34a;
    }
    h1 {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 52px;
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #1c1b18;
    }
    .role {
      font-size: 22px;
      font-weight: 700;
      color: #1f5e4b;
    }
    .summary {
      font-size: 16px;
      color: #57534e;
      line-height: 1.5;
      max-width: 580px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .tag {
      padding: 6px 12px;
      border-radius: 6px;
      background: #faf8f5;
      border: 1px solid #e4dfd7;
      font-size: 13px;
      font-weight: 600;
      color: #1c1b18;
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
    }
    .avatar-frame {
      width: 200px;
      height: 250px;
      border-radius: 12px;
      border: 2px solid #e4dfd7;
      overflow: hidden;
      background: #c2c6ca;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    .avatar-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 12%;
    }
    .domain {
      font-size: 14px;
      font-weight: 600;
      color: #57534e;
      letter-spacing: 0.02em;
    }
  </style>
</head>
<body>
  <div class="inner">
    <div class="left">
      <div class="kicker">
        <span class="pulse"></span>
        <span>Portofolio & Resume Teknis</span>
      </div>
      <h1>Miftahullah Surya Nugraha</h1>
      <p class="role">Machine Learning Engineer / Data Analyst</p>
      <p class="summary">
        Merancang model machine learning terapan, optimasi kuantitatif, dan pipeline data dengan Python. Lulusan S1 Informatika (IPK 3.77) · Coding Camp DBS Foundation (Nilai A) · Semi Finalist Samsung SIC5.
      </p>
      <div class="tags">
        <span class="tag">Machine Learning</span>
        <span class="tag">Quantitative Finance</span>
        <span class="tag">Recommender System</span>
        <span class="tag">Streamlit & Plotly</span>
        <span class="tag">Python & SQL</span>
      </div>
    </div>
    <div class="right">
      <div class="avatar-frame">
        <img src="${photoBase64}" alt="Foto Profil">
      </div>
      <span class="domain">miftahsuryan.vercel.app</span>
    </div>
  </div>
</body>
</html>`;

  await ogPage.setContent(ogHtml, { waitUntil: 'networkidle' });
  await ogPage.screenshot({ path: path.join(PUBLIC, 'og-image.png') });
  await ogPage.close();
  console.log('✓ public/og-image.png created');

  // 2. Generate Dual-Type CV PDFs from local dev server
  const cvPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    // 2a. Generate CV ATS (1-Column Minimalist)
    console.log('Generating public/cv-ats.pdf from http://localhost:4321/cv?type=ats ...');
    await cvPage.goto('http://localhost:4321/cv?type=ats', { waitUntil: 'networkidle', timeout: 12000 });
    await cvPage.waitForTimeout(1000);
    await cvPage.pdf({
      path: path.join(PUBLIC, 'cv-ats.pdf'),
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });
    console.log('✓ public/cv-ats.pdf created');

    // Default cv.pdf is synced with ATS version
    fs.copyFileSync(path.join(PUBLIC, 'cv-ats.pdf'), path.join(PUBLIC, 'cv.pdf'));
    console.log('✓ public/cv.pdf synced with ATS version');

    // 2b. Generate CV Visual (2-Column Modern Teal)
    console.log('Generating public/cv-visual.pdf from http://localhost:4321/cv?type=visual ...');
    await cvPage.goto('http://localhost:4321/cv?type=visual', { waitUntil: 'networkidle', timeout: 12000 });
    await cvPage.waitForTimeout(1000);
    await cvPage.pdf({
      path: path.join(PUBLIC, 'cv-visual.pdf'),
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });
    console.log('✓ public/cv-visual.pdf created');
  } catch (err) {
    console.warn('Could not generate CV PDFs from localhost:4321/cv:', err.message);
  } finally {
    await cvPage.close();
  }

  await browser.close();
}

run();

