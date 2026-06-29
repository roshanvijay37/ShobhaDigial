import type { APIRoute } from 'astro';
import { href } from '../lib/url';

// Build-time robots.txt so the Sitemap line always points at the actual deploy
// (github.io project path now, custom domain later) instead of a hardcoded host.
// Uses the slash-safe href() helper since import.meta.env.BASE_URL has no
// trailing slash for a project sub-path.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(href('/sitemap-index.xml'), site).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
