// Accessible modal helper shared by the image lightbox, film lightbox and
// mobile menu. Handles: hoisting the overlay out of <main> so the rest of the
// page can be inert-ed, focus trapping, focus restore, body scroll lock, and
// aria-hidden/inert on the background. No dependencies.
type Hooks = { onOpen?: () => void; onClose?: () => void };

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export function createModal(el: HTMLElement, hooks: Hooks = {}) {
  // Move the overlay to be a direct child of <body> so inert-ing siblings
  // (header, main, footer, floating button) never inerts the overlay itself.
  if (el.parentElement !== document.body) document.body.appendChild(el);

  let lastFocused: HTMLElement | null = null;
  let inerted: Element[] = [];

  const focusables = () =>
    Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (n) => !n.hasAttribute('disabled') && n.offsetParent !== null,
    );

  function onKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) {
      e.preventDefault();
      return;
    }
    const first = f[0];
    const last = f[f.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === el)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function open(trigger?: HTMLElement | null) {
    lastFocused = trigger ?? (document.activeElement as HTMLElement | null);
    el.classList.remove('hidden');
    el.classList.add('flex');
    document.body.style.overflow = 'hidden';
    inerted = Array.from(document.body.children).filter(
      (c) => c !== el && c.tagName !== 'SCRIPT',
    );
    inerted.forEach((c) => {
      c.setAttribute('inert', '');
      c.setAttribute('aria-hidden', 'true');
    });
    el.addEventListener('keydown', onKeydown);
    hooks.onOpen?.();
    (focusables()[0] ?? el).focus();
  }

  function close() {
    el.classList.add('hidden');
    el.classList.remove('flex');
    document.body.style.overflow = '';
    inerted.forEach((c) => {
      c.removeAttribute('inert');
      c.removeAttribute('aria-hidden');
    });
    inerted = [];
    el.removeEventListener('keydown', onKeydown);
    hooks.onClose?.();
    lastFocused?.focus?.();
  }

  const isOpen = () => !el.classList.contains('hidden');
  return { open, close, isOpen };
}
