// Base-path aware link helper so internal links work whether the site is
// served from a root custom domain ('/') or a GitHub project sub-path
// ('/<repo>/'). Astro prefixes bundled asset URLs automatically, but manual
// <a href> / <img src> values must be prefixed via this helper.
const BASE = import.meta.env.BASE_URL;

export function href(path = '/'): string {
  // Leave absolute URLs, anchors, mail/tel links untouched.
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(path)) return path;
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
