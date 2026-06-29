import Lenis from 'lenis';
import { prefersReducedMotion, hasFinePointer } from '../../lib/capabilities';

// Singleton smooth-scroll. Created once and reused across View Transitions
// (re-`new`-ing per navigation causes the known Astro+Lenis history-thrash:
// astro#12725 / lenis#348). Under reduced motion OR on touch devices we never
// instantiate — native momentum scroll is best on phones, and all consumers
// tolerate `undefined` (falling back to passive native scroll listeners).
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

  if (prefersReducedMotion() || !hasFinePointer()) return undefined;

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

// Body-scroll lock for modals. On desktop (Lenis active) a simple overflow:hidden
// + lenis.stop() suffices. On touch (no Lenis) iOS ignores overflow:hidden, so we
// pin the body with position:fixed and restore the scroll position on unlock.
let lockedY = 0;
export function lockScroll(): void {
  const lenis = window.__lenis;
  const b = document.body;
  if (lenis) {
    lenis.stop();
    b.style.overflow = 'hidden';
    return;
  }
  lockedY = window.scrollY || 0;
  b.style.position = 'fixed';
  b.style.top = `-${lockedY}px`;
  b.style.left = '0';
  b.style.right = '0';
  b.style.width = '100%';
  b.style.overflow = 'hidden';
}

export function unlockScroll(): void {
  const lenis = window.__lenis;
  const b = document.body;
  if (lenis) {
    b.style.overflow = '';
    lenis.start();
    return;
  }
  b.style.position = '';
  b.style.top = '';
  b.style.left = '';
  b.style.right = '';
  b.style.width = '';
  b.style.overflow = '';
  window.scrollTo(0, lockedY);
}
