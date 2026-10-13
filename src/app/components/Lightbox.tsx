"use client";

import { useRef } from "react";
import type { Gallery } from "../data";
import Photo from "./Photo";

type Props = {
  gallery: Gallery;
  index: number;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
};

/* Selalu gelap supaya foto enak dilihat. */
export default function Lightbox({ gallery, index, onClose, onStep }: Props) {
  const touchX = useRef<number | null>(null);
  const n = gallery.photos.length;

  return (
    <div
      className="dp-lb fixed inset-0 z-[70] flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={`${gallery.title} foto ${index + 1} dari ${n}`}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
      }}
    >
      {/* top bar */}
      <div className="dp-lb-top absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 md:p-8">
        <p className="display text-sm font-bold tracking-[0.2em] text-white/70">
          <span className="text-[rgb(var(--ac))]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span> / {String(n).padStart(2, "0")}</span>
          <span className="ml-4 hidden text-xs font-medium tracking-[0.18em] text-white/40 sm:inline">
            {gallery.title}
          </span>
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Tutup foto"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg text-white transition hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))]"
        >
          ✕
        </button>
      </div>

      {/* prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Foto sebelumnya"
        className="absolute bottom-12 left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/80 text-xl text-white transition-colors hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))] md:bottom-auto md:left-8 md:top-1/2 md:-translate-y-1/2"
      >
        ←
      </button>

      {/* image */}
      <div className="dp-lb-frame relative w-full" onClick={(e) => e.stopPropagation()}>
      <Photo
        key={index}
        src={gallery.photos[index]}
        fill
        sizes="(max-width: 767px) 100vw, 80vw"
        loading="eager"
        fetchPriority="high"
        alt={`${gallery.title} ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
        className="dp-lb-img select-none object-contain"
      />
      </div>

      {/* next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Foto berikutnya"
        className="absolute bottom-12 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/80 text-xl text-white transition-colors hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))] md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2"
      >
        →
      </button>

      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] tracking-[0.25em] text-white/30">
        ← → UNTUK PINDAH · ESC UNTUK TUTUP
      </p>
    </div>
  );
}
