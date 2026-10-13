"use client";

import Image, { type ImageProps } from "next/image";
import { imageLoader, photos } from "../lib/images";

type Props = Omit<ImageProps, "src" | "loader" | "placeholder" | "blurDataURL"> & {
  src: string;
  sizes: string;
};

export default function Photo({ src, fill, alt, ...props }: Props) {
  const photo = photos[src];
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : photo.width}
      height={fill ? undefined : photo.height}
      loader={imageLoader}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      decoding="async"
    />
  );
}
