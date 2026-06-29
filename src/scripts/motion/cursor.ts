import { hasFinePointer, prefersReducedMotion } from '../../lib/capabilities';

// Refined custom cursor: a small gold dot (exact) + a trailing ring (eased) that
// grows and shows a contextual label over interactive elements. Desktop pointers
// only; native cursor everywhere else. Re-created per page (body is swapped by
// View Transitions); listeners bound to the abort signal.
export function initCursor(signal: AbortSignal) {
  if (!hasFinePointer() || prefersReducedMotion()) return;

  const root = document.documentElement;
  root.classList.add('has-custom-cursor');

  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  const label = document.createElement('span');
  label.className = 'cursor-label';
  ring.appendChild(label);
  document.body.append(dot, ring);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let raf = 0;
  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  window.addEventListener(
    'pointermove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { signal },
  );

  const SEL = 'a, button, input, textarea, select, [role="button"], [data-cursor], .reel-item, .gallery-open, .film-open';
  const labelFor = (el: HTMLElement) =>
    el.dataset.cursor ||
    (el.classList.contains('reel-item') ? 'Drag' : el.classList.contains('gallery-open') ? 'View' : el.classList.contains('film-open') ? 'Play' : '');

  document.addEventListener(
    'pointerover',
    (e) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(SEL);
      if (!el) return;
      ring.classList.add('is-active');
      const text = labelFor(el);
      label.textContent = text;
      ring.classList.toggle('has-label', Boolean(text));
    },
    { signal },
  );
  document.addEventListener(
    'pointerout',
    (e) => {
      if ((e.target as HTMLElement).closest(SEL)) {
        ring.classList.remove('is-active', 'has-label');
        label.textContent = '';
      }
    },
    { signal },
  );
  window.addEventListener('pointerdown', () => ring.classList.add('is-down'), { signal });
  window.addEventListener('pointerup', () => ring.classList.remove('is-down'), { signal });

  signal.addEventListener('abort', () => {
    cancelAnimationFrame(raf);
    root.classList.remove('has-custom-cursor');
    dot.remove();
    ring.remove();
  });
}
