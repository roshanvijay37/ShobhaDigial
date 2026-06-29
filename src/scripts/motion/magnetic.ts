import { hasFinePointer, prefersReducedMotion } from '../../lib/capabilities';

// Magnetic pull toward the pointer for [data-magnetic] elements (CTAs).
export function initMagnetic(signal: AbortSignal) {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '0.3');
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move, { signal });
    el.addEventListener('pointerleave', reset, { signal });
  });
}
