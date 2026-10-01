"use client";

import { useRef } from "react";
import type { Gallery } from "../data";

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
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 md:p-8">
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
        className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white backdrop-blur transition hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))] md:left-8"
      >
        ←
      </button>

      {/* image */}
      <img
        key={index}
        src={gallery.photos[index]}
        alt={`${gallery.title} ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
        className="dp-lb-img max-h-[82vh] max-w-[92vw] select-none rounded-md object-contain md:max-w-[80vw]"
      />

      {/* next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white backdrop-blur transition hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))] md:right-8"
      >
        →
      </button>

      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] tracking-[0.25em] text-white/30">
        ← → UNTUK PINDAH · ESC UNTUK TUTUP
      </p>
    </div>
  );
}
