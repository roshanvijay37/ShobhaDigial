// One-time intro reveal: a cream curtain with the gold monogram that lifts to
// reveal the page. Shown once per browser session, skips on reduced motion, and
// can be dismissed with a click/key. Called only on the first page load (not on
// View Transitions navigations) so it never repeats while browsing.
export function initIntro() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (sessionStorage.getItem('introSeen')) return;
    sessionStorage.setItem('introSeen', '1');
  } catch {
    return;
  }

  const el = document.createElement('div');
  el.id = 'intro';
  el.innerHTML =
    '<div class="intro-mark"><svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">' +
    '<rect x="3" y="3" width="58" height="58" rx="12" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>' +
    '<text x="32" y="45" font-family="Georgia, serif" font-size="40" font-weight="700" text-anchor="middle" fill="currentColor">S</text>' +
    '</svg></div>';
  document.body.appendChild(el);
  document.documentElement.classList.add('intro-active');

  let removed = false;
  const done = () => {
    if (removed) return;
    removed = true;
    el.remove();
    document.documentElement.classList.remove('intro-active');
  };
  const lift = () => {
    el.classList.add('intro-lift');
    setTimeout(done, 850); // fallback in case transitionend misses
  };

  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('intro-show')));
  const timer = setTimeout(lift, 550);
  el.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') done();
  });
  el.addEventListener('click', () => {
    clearTimeout(timer);
    lift();
  });
}
