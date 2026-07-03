import { getLenis } from './lenis';
import { prefersReducedMotion, hasFinePointer } from '../../lib/capabilities';

// ── 1. Masked word-by-word heading reveals ──────────────────────────────────
// Splits .reveal-words text into masked word spans that slide up when scrolled
// into view. Flash-free: if JS never runs, the heading shows as plain text.
export function initTextReveal(signal: AbortSignal) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal-words'));
  if (!els.length) return;

  els.forEach((el) => {
    if (el.dataset.split === '1') return;
    const text = el.textContent || '';
    const frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach((token) => {
      if (token.trim() === '') {
        frag.appendChild(document.createTextNode(token));
        return;
      }
      const mask = document.createElement('span');
      mask.className = 'word-mask';
      const inner = document.createElement('span');
      inner.className = 'word';
      inner.textContent = token;
      mask.appendChild(inner);
      frag.appendChild(mask);
    });
    el.textContent = '';
    el.appendChild(frag);
    el.dataset.split = '1';
    el.querySelectorAll<HTMLElement>('.word').forEach((w, i) => {
      w.style.transitionDelay = `${(i * 0.05).toFixed(2)}s`;
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );
  els.forEach((el) => io.observe(el));
  signal.addEventListener('abort', () => io.disconnect());
}

// ── 1b. Cinematic image curtain reveals ─────────────────────────────────────
// Adds .is-shown when a [data-img-reveal] element enters the viewport; CSS
// wipes an ivory curtain off the image. Siblings revealed in the same pass
// get a small stagger so grids cascade instead of popping at once.
export function initImgReveal(signal: AbortSignal) {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-img-reveal]'));
  if (!els.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-shown'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      const entering = entries.filter((e) => e.isIntersecting);
      entering.forEach((e, i) => {
        const el = e.target as HTMLElement;
        el.style.setProperty('--rv-delay', `${(i * 0.09).toFixed(2)}s`);
        el.classList.add('is-shown');
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
  signal.addEventListener('abort', () => io.disconnect());
}

// ── 2. Scroll progress bar ─────────────────────────────────────────────────
export function initProgress(signal: AbortSignal) {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const y = window.scrollY || doc.scrollTop;
    const p = max > 0 ? y / max : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
  };
  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', update);
    signal.addEventListener('abort', () => lenis.off('scroll', update));
  } else {
    window.addEventListener('scroll', update, { passive: true, signal });
  }
  window.addEventListener('resize', update, { signal });
  update();
}

// ── 4. Pinned cinematic section (CSS sticky + JS scrub) ─────────────────────
export function initPinned(signal: AbortSignal) {
  if (prefersReducedMotion() || !hasFinePointer()) return; // mobile gets the static still
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-pinned]'));
  if (!sections.length) return;
  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    for (const sec of sections) {
      const total = sec.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-sec.getBoundingClientRect().top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const bg = sec.querySelector<HTMLElement>('[data-pinned-bg]');
      const content = sec.querySelector<HTMLElement>('[data-pinned-content]');
      if (bg) bg.style.transform = `scale(${(1.05 + p * 0.22).toFixed(3)})`;
      if (content) {
        const o = p < 0.25 ? p / 0.25 : p > 0.85 ? Math.max(0, (1 - p) / 0.15) : 1;
        content.style.opacity = o.toFixed(2);
        content.style.transform = `translateY(${((0.5 - p) * 36).toFixed(1)}px)`;
      }
    }
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', onScroll);
    signal.addEventListener('abort', () => lenis.off('scroll', onScroll));
  } else {
    window.addEventListener('scroll', onScroll, { passive: true, signal });
  }
  window.addEventListener('resize', onScroll, { signal });
  update();
}

// ── 5. Drag-to-scroll for horizontal reels ──────────────────────────────────
export function initReel(signal: AbortSignal) {
  document.querySelectorAll<HTMLElement>('.reel-wrap').forEach((reel) => {
    let down = false;
    let startX = 0;
    let startScroll = 0;
    reel.addEventListener(
      'pointerdown',
      (e) => {
        if (e.pointerType !== 'mouse') return;
        down = true;
        startX = e.clientX;
        startScroll = reel.scrollLeft;
        reel.classList.add('dragging');
      },
      { signal },
    );
    reel.addEventListener(
      'pointermove',
      (e) => {
        if (!down) return;
        reel.scrollLeft = startScroll - (e.clientX - startX);
      },
      { signal },
    );
    const up = () => {
      down = false;
      reel.classList.remove('dragging');
    };
    reel.addEventListener('pointerup', up, { signal });
    reel.addEventListener('pointerleave', up, { signal });
  });
}

// ── 3. Scroll-velocity skew ────────────────────────────────────────────────
export function initSkew(signal: AbortSignal) {
  if (prefersReducedMotion() || !hasFinePointer()) return; // never on touch (caused jitter/overflow)
  const lenis = getLenis();
  if (!lenis) return; // needs Lenis velocity
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-skew]'));
  if (!els.length) return;

  let raf = 0;
  let value = 0;
  const apply = () => {
    raf = 0;
    value *= 0.9;
    if (Math.abs(value) < 0.05) {
      value = 0;
      els.forEach((el) => (el.style.transform = ''));
      return;
    }
    els.forEach((el) => (el.style.transform = `skewY(${value.toFixed(2)}deg)`));
    raf = requestAnimationFrame(apply);
  };
  const onScroll = (e: { velocity?: number }) => {
    value = Math.max(-3.5, Math.min(3.5, (e.velocity || 0) * 0.35));
    if (!raf) raf = requestAnimationFrame(apply);
  };
  lenis.on('scroll', onScroll);
  signal.addEventListener('abort', () => {
    lenis.off('scroll', onScroll);
    if (raf) cancelAnimationFrame(raf);
    els.forEach((el) => (el.style.transform = ''));
  });
}
