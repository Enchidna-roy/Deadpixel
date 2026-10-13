import manifest from "../generated/images.json";

type Photo = {
  width: number;
  height: number;
  blurDataURL: string;
  variants: Record<string, string>;
};

export const photos: Record<string, Photo> = manifest;

export function imageLoader({ src, width }: { src: string; width: number }) {
  const photo = photos[src];
  if (!photo) throw new Error(`Run npm run images:optimize for ${src}`);
  const sizes = Object.keys(photo.variants).map(Number).sort((a, b) => a - b);
  const size = sizes.find((size) => size >= width) ?? sizes[sizes.length - 1];
  return photo.variants[size];
}
