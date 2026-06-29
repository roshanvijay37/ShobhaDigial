// Capability/preference detection for progressive enhancement.
// saveData / deviceMemory are Chromium-only — optional-chained; their absence
// means "assume capable" (don't degrade just because the signal is missing).

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export function canUseWebGL(): boolean {
  if (typeof window === 'undefined' || !window.WebGLRenderingContext) return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export function isLowPower(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData === true) return true; // Chromium-only
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return true; // Chromium-only
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2) return true;
  return false;
}
