// Build-time logo prep. The client's logo PNG is the maroon "SD" film-strip
// emblem on a large white canvas (with near-white noise on the right). We:
//   1. trim the white border,
//   2. if the result is still wide (leftover near-white), extract the left
//      square and trim again to isolate the emblem,
//   3. downsize to a clean mark at public/logo-mark.png.
// Any failure is swallowed so it never breaks the build (the wordmark text still
// renders if the image is missing).
import { existsSync, copyFileSync } from 'node:fs';

const SRC = 'logo/shobha digital belvai with logo copy.png';
const OUT = 'public/logo-mark.png';
const T = { threshold: 40 };

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
    let buf = await sharp(SRC).trim(T).toBuffer();
    let meta = await sharp(buf).metadata();
    // Isolate the emblem if a wide near-white strip survived the trim.
    if (meta.width && meta.height && meta.width > meta.height * 1.4) {
      buf = await sharp(buf)
        .extract({ left: 0, top: 0, width: meta.height, height: meta.height })
        .trim(T)
        .toBuffer();
    }
    await sharp(buf)
      .resize({ height: 220, withoutEnlargement: false })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(OUT);
    const m2 = await sharp(OUT).metadata();
    console.log(`[logo] done -> ${OUT} (${m2.width}x${m2.height})`);
  } catch (e) {
    console.warn('[logo] processing failed, copying original:', e?.message);
    try {
      copyFileSync(SRC, OUT);
    } catch {}
  }
}

run().catch((e) => console.warn('[logo]', e?.message));
