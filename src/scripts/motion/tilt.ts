import { hasFinePointer, prefersReducedMotion } from '../../lib/capabilities';

// Pointer-driven 3D tilt for [data-tilt] elements. Desktop pointers only.
export function initTilt(signal: AbortSignal) {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  const els = document.querySelectorAll<HTMLElement>('[data-tilt]');
  els.forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '6'); // max degrees
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', onMove, { signal });
    el.addEventListener('pointerleave', reset, { signal });
  });
}
