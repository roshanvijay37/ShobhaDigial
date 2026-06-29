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

let pageController: AbortController | null = null;

function initPage() {
  pageController?.abort();
  pageController = new AbortController();
  const { signal } = pageController;

  initReveal(signal);
  initGallery(signal);
  initFilmGrid(signal);
  initMenu(signal);
  initContactForm(signal);
}

// Tear down the previous page's listeners just before the DOM is swapped.
document.addEventListener('astro:before-swap', () => pageController?.abort());
// Re-initialise after each client-side navigation (also resets scroll).
document.addEventListener('astro:after-swap', initPage);
// First (full) page load — fires once; subsequent navs use after-swap above.
document.addEventListener('astro:page-load', initPage, { once: true });
