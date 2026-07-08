// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';

// If a custom domain is set (public/CNAME present), always serve from the root
// of that domain — this overrides the GitHub project sub-path automatically.
let cname = '';
try {
  cname = readFileSync(new URL('./public/CNAME', import.meta.url), 'utf-8').trim();
} catch {
  /* no custom domain yet — fall back to env / sub-path */
}

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
const SITE_URL = cname ? `https://${cname}` : process.env.SITE_URL || 'https://shobhadigitalstudio.in';
// On the custom domain the base is always '/'. Otherwise normalize the env
// value to a leading-slash, no-trailing-slash path (or '/').
const rawBase = cname ? '/' : process.env.BASE_PATH || '/';
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
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', kn: 'kn' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
