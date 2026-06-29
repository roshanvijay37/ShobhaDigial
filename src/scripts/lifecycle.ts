// Central client lifecycle. With Astro's <ClientRouter />, bundled module
// scripts run ONCE and do not re-run on client-side navigations. So we register
// init listeners once on the persistent `document`, and (re)bind every page's
// interactive code on each navigation via an AbortController that is aborted on
// the next `astro:before-swap` — preventing listener accumulation.
import { initReveal } from './reveal';
import { initGallery } from './gallery';
import { initFilmGrid } from './filmgrid';
import { initMenu } from './header-menu';
import { initContactForm } from './contact-form';
import { getLenis } from './motion/lenis';
import { initTilt } from './motion/tilt';
import { initParallax } from './motion/parallax';
import { initMagnetic } from './motion/magnetic';
import { canUseWebGL, hasFinePointer, isLowPower, prefersReducedMotion } from '../lib/capabilities';

// Lazy, capability-gated WebGL signature effect. The OGL chunk is only fetched
// on capable pointer devices — never for bots, reduced-motion, touch, or low-end.
async function initWebGL(signal: AbortSignal) {
  if (prefersReducedMotion() || !hasFinePointer() || !canUseWebGL() || isLowPower()) return;
  if (!document.querySelector('[data-webgl]')) return;
  try {
    const { initHoverDistortion } = await import('./motion/webgl/hoverDistortion');
    if (!signal.aborted) initHoverDistortion(signal);
  } catch {
    /* WebGL enhancement is optional — ignore failures */
  }
}

let pageController: AbortController | null = null;
let hasInit = false;

function initPage() {
  hasInit = true;
  pageController?.abort();
  pageController = new AbortController();
  const { signal } = pageController;

  getLenis(); // start smooth scroll once (singleton; no-op under reduced motion)
  initReveal(signal);
  initGallery(signal);
  initFilmGrid(signal);
  initMenu(signal);
  initContactForm(signal);
  initTilt(signal);
  initParallax(signal);
  initMagnetic(signal);
  void initWebGL(signal);
}

// Tear down the previous page's listeners just before the DOM is swapped.
document.addEventListener('astro:before-swap', () => pageController?.abort());
// Re-initialise after each client-side navigation (also resets scroll).
document.addEventListener('astro:after-swap', initPage);
// First (full) page load — fires once; subsequent navs use after-swap above.
document.addEventListener('astro:page-load', initPage, { once: true });
// Safety net: if astro:page-load never fires on first load (so .reveal content
// would stay hidden), initialise anyway. Guarded so it can't double-bind.
window.addEventListener(
  'load',
  () => {
    if (!hasInit) initPage();
  },
  { once: true },
);
