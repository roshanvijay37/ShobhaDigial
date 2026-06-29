import type { APIRoute } from 'astro';

// Build-time robots.txt so the Sitemap line always points at the actual deploy
// (github.io project path now, custom domain later) instead of a hardcoded host.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(import.meta.env.BASE_URL + 'sitemap-index.xml', site).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
