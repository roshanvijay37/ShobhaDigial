import type { ImageMetadata } from 'astro';

// Eagerly load every portfolio image so it can be optimized by astro:assets
// and looked up by filename from the data files.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/*.{jpeg,jpg,png,webp,avif}',
  { eager: true },
);

export function getImage(file: string): ImageMetadata {
  const match = images[`../assets/portfolio/${file}`];
  if (!match) {
    throw new Error(
      `Portfolio image "${file}" not found. Add it to src/assets/portfolio/.`,
    );
  }
  return match.default;
}

export function hasImage(file: string): boolean {
  return Boolean(images[`../assets/portfolio/${file}`]);
}
