import { createModal } from '../lib/modal';

// Gallery filtering + accessible lightbox. Re-bindable per page; all
// document-level listeners use the abort signal so they don't accumulate
// across View Transitions navigations.
export function initGallery(signal: AbortSignal) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return; // gallery not on this page

  // ── Filtering ──────────────────────────────────────────────────────────
  const filterBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('.gallery-filter'));
  const figures = Array.from(document.querySelectorAll<HTMLElement>('.gallery-item'));
  filterBtns.forEach((btn) => {
    btn.addEventListener(
      'click',
      () => {
        const cat = btn.dataset.filter;
        filterBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('bg-maroon', active);
          b.classList.toggle('text-cream', active);
          b.classList.toggle('border-maroon', active);
          b.classList.toggle('text-maroon', !active);
          b.classList.toggle('border-maroon/25', !active);
          b.setAttribute('aria-pressed', String(active));
        });
        figures.forEach((fig) => {
          const show = cat === 'All' || fig.dataset.category === cat;
          fig.classList.toggle('hidden', !show);
        });
      },
      { signal },
    );
  });

  // ── Lightbox ───────────────────────────────────────────────────────────
  const lightboxEl = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img') as HTMLImageElement | null;
  const lbCat = document.getElementById('lb-cat');
  const lbTitle = document.getElementById('lb-title');
  if (!lightboxEl || !lbImg) return;

  const openers = Array.from(document.querySelectorAll<HTMLButtonElement>('.gallery-open'));
  let visible: HTMLButtonElement[] = [];
  let index = 0;
  const modal = createModal(lightboxEl);

  function render() {
    const btn = visible[index];
    if (!btn || !lbImg) return;
    const full = btn.dataset.full || '';
    const thumb = btn.querySelector('img')?.getAttribute('src') || '';
    lbImg.onerror = () => {
      if (thumb && lbImg.src !== thumb) lbImg.src = thumb;
    };
    lbImg.src = full || thumb;
    lbImg.alt = btn.dataset.alt || '';
    if (lbCat) lbCat.textContent = btn.dataset.cat || '';
    if (lbTitle) lbTitle.textContent = btn.dataset.title || '';
  }
  function openLb(btn: HTMLButtonElement) {
    visible = openers.filter((b) => !b.closest('.gallery-item')?.classList.contains('hidden'));
    index = Math.max(0, visible.indexOf(btn));
    render();
    modal.open(btn);
  }
  const step = (dir: number) => {
    if (!visible.length) return;
    index = (index + dir + visible.length) % visible.length;
    render();
  };

  openers.forEach((btn) => btn.addEventListener('click', () => openLb(btn), { signal }));
  document.getElementById('lb-close')?.addEventListener('click', () => modal.close(), { signal });
  document.getElementById('lb-prev')?.addEventListener('click', () => step(-1), { signal });
  document.getElementById('lb-next')?.addEventListener('click', () => step(1), { signal });
  lightboxEl.addEventListener(
    'click',
    (e) => {
      if (e.target === lightboxEl) modal.close();
    },
    { signal },
  );
  document.addEventListener(
    'keydown',
    (e) => {
      if (!modal.isOpen()) return;
      if (e.key === 'Escape') modal.close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    },
    { signal },
  );

  // Ensure body scroll / inert is released if we navigate away while open.
  signal.addEventListener('abort', () => {
    if (modal.isOpen()) modal.close();
  });
}
