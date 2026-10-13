import { type Gallery } from "../data";
import Photo from "./Photo";

type Props = {
  gallery: Gallery;
  show: boolean; // menggerakkan animasi buka/tutup
  onClose: () => void;
  onPhoto: (index: number) => void; // buka lightbox
};

export default function GalleryModal({
  gallery,
  show,
  onClose,
  onPhoto,
}: Props) {
  return (
    <div
      className={`dp-gallery fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[rgb(var(--bg))] transition-opacity duration-300 ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${gallery.title} gallery`}
    >
      <div
        className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 pb-8 pt-24 text-[rgb(var(--fg))] sm:px-5 md:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="dp-gallery-close fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--fg)/0.2)] bg-[rgb(var(--bg))] text-lg text-[rgb(var(--fg))] transition-colors hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))] md:right-10"
        >
          ✕
        </button>

        <div className="grid min-w-0 flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-14">
          {/* kiri: judul + kutipan */}
          <div
            className={`min-w-0 self-start transition-[transform,opacity] duration-300 lg:sticky lg:top-28 ${
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <h3 className="mont break-words text-[clamp(2rem,8vw,3.5rem)] font-extrabold lg:text-[clamp(2rem,3.8vw,3.5rem)]">
              {gallery.heading}
            </h3>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-[rgb(var(--tx))]">
              “{gallery.quote}”
            </p>
          </div>

          {/* kanan: kolase */}
          {/* kanan: kolase masonry (rasio foto asli) */}
          <div className="min-w-0 columns-2 gap-3 md:gap-4 lg:columns-3">
            {gallery.photos.map((p, i) => (
              <button
                key={i}
                onClick={() => onPhoto(i)}
                aria-label={`Buka ${gallery.title} ${i + 1} fullscreen`}
                style={{ transitionDelay: show ? `${Math.min(i, 5) * 40}ms` : "0ms" }}
                className={`group mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-md bg-[rgb(var(--fg)/0.08)] transition-[transform,opacity] duration-300 md:mb-4 ${
                  show
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }`}
              >
                <Photo
                  src={p}
                  sizes="(max-width: 1023px) calc((100vw - 52px) / 2), (max-width: 1280px) 18vw, 240px"
                  alt={`${gallery.title} ${i + 1}`}
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        {/* footer ala slide */}
        <div className="mt-14 flex items-center justify-between text-sm">
          <span className="font-bold">Deadpixel.id</span>
          <span className="text-[rgb(var(--tx))]">@deadpixel.id</span>
        </div>
      </div>
    </div>
  );
}
