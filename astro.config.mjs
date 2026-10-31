import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

// URL situs diambil dari src/content/id/profile.yaml (field siteUrl),
// supaya semua hal yang perlu diedit ada di satu tempat.
const profile = load(readFileSync('./src/content/id/profile.yaml', 'utf-8'));
const siteUrl = /^https?:\/\//.test(profile?.siteUrl ?? '')
  ? profile.siteUrl
  : 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [sitemap()],
});

