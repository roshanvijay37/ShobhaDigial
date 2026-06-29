import Lenis from 'lenis';
import { prefersReducedMotion } from '../../lib/capabilities';

// Singleton smooth-scroll. Created once and reused across View Transitions
// (re-`new`-ing per navigation causes the known Astro+Lenis history-thrash:
// astro#12725 / lenis#348). Under reduced motion we never instantiate — native
// scroll is used and all consumers tolerate `undefined`.
declare global {
  interface Window {
    __lenis?: Lenis;
    __lenisInit?: boolean;
  }
}

export function getLenis(): Lenis | undefined {
  if (typeof window === 'undefined') return undefined;
  if (window.__lenis) return window.__lenis;
  if (window.__lenisInit) return undefined; // already decided: no Lenis (reduced motion)
  window.__lenisInit = true;

  if (prefersReducedMotion()) return undefined;

  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
  window.__lenis = lenis;

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Reset to top on client-side navigation (registered once).
  document.addEventListener('astro:after-swap', () => {
    lenis.scrollTo(0, { immediate: true });
  });

  return lenis;
}

export function lockScroll(): void {
  window.__lenis?.stop();
  document.body.style.overflow = 'hidden';
}

export function unlockScroll(): void {
  window.__lenis?.start();
  document.body.style.overflow = '';
}
