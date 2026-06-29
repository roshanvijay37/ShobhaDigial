import { ui, defaultLang, type Lang } from './ui';
import { href } from '../lib/url';

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, ''); // '' or '/ShobhaDigial'

// Routes that have a Kannada (/kn/...) version. Extend as pages are translated.
export const TRANSLATED_ROUTES = new Set<string>(['/']);
export function isTranslated(route: string): boolean {
  return TRANSLATED_ROUTES.has(route);
}

export function asLang(lang: string | undefined): Lang {
  return lang === 'kn' ? 'kn' : 'en';
}

export function useTranslations(lang: string | undefined) {
  const l = asLang(lang);
  return function t(key: keyof (typeof ui)['en']): string {
    return ui[l][key] ?? ui[defaultLang][key];
  };
}

// Strip the base path and any /kn locale prefix → canonical route like '/services'.
export function routeWithoutLocale(pathname: string): string {
  let p = pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  if (!p.startsWith('/')) p = '/' + p;
  p = p.replace(/\/+$/, '') || '/';
  if (p === '/kn') return '/';
  if (p.startsWith('/kn/')) return p.slice(3);
  return p;
}

// Base-aware URL for a canonical route in a given locale.
export function localized(route: string, lang: Lang): string {
  if (lang === 'en') return href(route);
  return href(route === '/' ? '/kn' : '/kn' + route);
}

// Nav link: keep Kannada users on /kn for translated routes, else fall back to English.
export function navHref(route: string, lang: Lang): string {
  if (lang === 'kn' && isTranslated(route)) return localized(route, 'kn');
  return href(route);
}

// Language-toggle target: switch the current page to the other locale (or that
// locale's home if the current page isn't translated yet — avoids 404s).
export function altLink(pathname: string, currentLang: Lang): { lang: Lang; href: string } {
  const other: Lang = currentLang === 'en' ? 'kn' : 'en';
  const route = routeWithoutLocale(pathname);
  const target = isTranslated(route) ? route : '/';
  return { lang: other, href: localized(target, other) };
}

// hreflang alternates for the <head> (only for routes that exist in both locales).
export function getHreflangs(pathname: string, site: URL | string | undefined) {
  const route = routeWithoutLocale(pathname);
  if (!isTranslated(route) || !site) return [];
  const en = new URL(localized(route, 'en'), site).href;
  const kn = new URL(localized(route, 'kn'), site).href;
  return [
    { hreflang: 'en', href: en },
    { hreflang: 'kn', href: kn },
    { hreflang: 'x-default', href: en },
  ];
}
