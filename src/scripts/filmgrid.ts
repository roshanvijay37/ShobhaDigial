import { createModal } from '../lib/modal';

// Film poster grid → YouTube lightbox. Re-bindable per page.
export function initFilmGrid(signal: AbortSignal) {
  const lb = document.getElementById('film-lightbox');
  const frame = document.getElementById('film-frame') as HTMLIFrameElement | null;
  if (!lb || !frame) return;

  const modal = createModal(lb, {
    onClose: () => {
      frame.src = '';
    },
  });

  const openFilm = (id: string, title: string, trigger: HTMLElement) => {
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = title ? `Film: ${title}` : 'Film player';
    modal.open(trigger);
  };

  document.querySelectorAll<HTMLElement>('.film-open').forEach((btn) => {
    btn.addEventListener(
      'click',
      () => {
        const id = btn.dataset.yt;
        if (id) openFilm(id, btn.dataset.title || '', btn);
      },
      { signal },
    );
  });
  document.getElementById('film-close')?.addEventListener('click', () => modal.close(), { signal });
  lb.addEventListener(
    'click',
    (e) => {
      if (e.target === lb) modal.close();
    },
    { signal },
  );
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && modal.isOpen()) modal.close();
    },
    { signal },
  );

  signal.addEventListener('abort', () => {
    if (modal.isOpen()) modal.close();
  });
}
