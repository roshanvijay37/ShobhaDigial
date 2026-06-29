// Build-time logo prep: the client's logo PNG sits on a large white canvas, so
// we auto-trim the whitespace and downsize to a clean mark at public/logo-mark.png.
// Robust by design: any failure is swallowed (never breaks the build) — the brand
// wordmark text still renders if the image is missing.
import { existsSync, copyFileSync } from 'node:fs';

const SRC = 'logo/shobha digital belvai with logo copy.png';
const OUT = 'public/logo-mark.png';

async function run() {
  if (!existsSync(SRC)) {
    console.warn('[logo] source not found, skipping:', SRC);
    return;
  }
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.warn('[logo] sharp unavailable; copying original');
    try {
      copyFileSync(SRC, OUT);
    } catch {}
    return;
  }
  try {
    await sharp(SRC)
      .trim({ threshold: 12 }) // remove the surrounding white border
      .resize({ height: 220, withoutEnlargement: false })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(OUT);
    console.log('[logo] trimmed ->', OUT);
  } catch (e) {
    console.warn('[logo] trim failed, copying original:', e?.message);
    try {
      copyFileSync(SRC, OUT);
    } catch {}
  }
}

run().catch((e) => console.warn('[logo]', e?.message));
