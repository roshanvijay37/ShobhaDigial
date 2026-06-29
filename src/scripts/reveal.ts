// Scroll-reveal: add .is-visible when elements enter the viewport.
// Re-bindable per page (View Transitions safe). Disconnects on abort.
export function initReveal(signal: AbortSignal) {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');
  if (!reveals.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
  signal.addEventListener('abort', () => io.disconnect());
}
