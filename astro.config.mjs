// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ── Deployment configuration ─────────────────────────────────────────────
// SITE_URL : the public URL of the site. Set this to your custom domain once
//            purchased (e.g. https://shobhadigitalstudio.in).
// BASE_PATH: the sub-path the site is served from.
//            - On a custom root domain  -> '/'
//            - On a GitHub project page  -> '/<repo-name>' (the deploy workflow
//              sets this automatically via the BASE_PATH env var).
// The GitHub Actions workflow injects BASE_PATH so the test deploy works at
// https://<user>.github.io/<repo>/ . When you attach the custom domain, drop
// BASE_PATH (serve from root) and update SITE_URL + public/CNAME.
const SITE_URL = process.env.SITE_URL || 'https://shobhadigitalstudio.in';
// Normalize to a leading-slash, no-trailing-slash path (or '/'), so a
// hand-set repo variable like "ShobhaDigial" can't diverge from Astro's
// asset prefixing.
const rawBase = process.env.BASE_PATH || '/';
const BASE_PATH = rawBase === '/' ? '/' : '/' + rawBase.replace(/^\/+|\/+$/g, '');

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'kn'],
    routing: { prefixDefaultLocale: false }, // English at /, Kannada at /kn/
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
