import { getLenis } from './lenis';
import { prefersReducedMotion } from '../../lib/capabilities';

// Scroll-driven depth parallax for [data-parallax] elements. Speed is the
// fraction of the element's distance-from-viewport-center to translate.
// Sources scroll from Lenis when active, native scroll otherwise.
export function initParallax(signal: AbortSignal) {
  if (prefersReducedMotion()) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!els.length) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of els) {
      const speed = parseFloat(el.dataset.parallax || '0.15');
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      const y = -center * speed;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', onScroll);
    signal.addEventListener('abort', () => lenis.off('scroll', onScroll));
  } else {
    window.addEventListener('scroll', onScroll, { passive: true, signal });
  }
  window.addEventListener('resize', onScroll, { signal });
  update(); // initial position
}
