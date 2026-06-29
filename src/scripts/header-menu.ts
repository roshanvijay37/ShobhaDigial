import { createModal } from '../lib/modal';

// Mobile menu (focus-trapped dialog). Re-bindable per page.
export function initMenu(signal: AbortSignal) {
  const openBtn = document.getElementById('menu-open');
  const menu = document.getElementById('mobile-menu');
  if (!openBtn || !menu) return;

  const modal = createModal(menu, {
    onOpen: () => openBtn.setAttribute('aria-expanded', 'true'),
    onClose: () => openBtn.setAttribute('aria-expanded', 'false'),
  });

  openBtn.addEventListener('click', () => modal.open(openBtn), { signal });
  document.getElementById('menu-close')?.addEventListener('click', () => modal.close(), { signal });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => modal.close(), { signal }));
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
