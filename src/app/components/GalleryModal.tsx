import { COLLAGE, type Gallery } from "../data";

type Props = {
  gallery: Gallery;
  show: boolean; // menggerakkan animasi buka/tutup
  origin: { x: number; y: number }; // titik awal reveal (%)
  onClose: () => void;
  onPhoto: (index: number) => void; // buka lightbox
};

export default function GalleryModal({
  gallery,
  show,
  origin,
  onClose,
  onPhoto,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-[rgb(var(--bg))] transition-[clip-path] duration-[700ms] ease-[cubic-bezier(.65,0,.35,1)]"
      style={{
        clipPath: show
          ? `circle(150% at ${origin.x}% ${origin.y}%)`
          : `circle(0% at ${origin.x}% ${origin.y}%)`,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${gallery.title} gallery`}
    >
      <div
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-8 pt-28 text-[rgb(var(--fg))] md:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-5 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--fg)/0.2)] bg-[rgb(var(--bg))] text-lg text-[rgb(var(--fg))] transition hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))] md:right-10"
        >
          ✕
        </button>

        <div className="grid flex-1 gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
          {/* kiri: judul + kutipan */}
          <div
            className={`self-start transition-all duration-700 delay-300 lg:sticky lg:top-28 lg:self-center ${
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <h3 className="mont text-5xl font-extrabold md:text-6xl lg:text-7xl">
              {gallery.heading}
            </h3>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-[rgb(var(--tx))]">
              “{gallery.quote}”
            </p>
          </div>

          {/* kanan: kolase */}
          <div className="grid auto-rows-[120px] grid-flow-dense grid-cols-3 gap-3 sm:auto-rows-[150px] md:auto-rows-[170px] md:gap-4 lg:grid-cols-4">
            {gallery.photos.map((p, i) => (
              <button
                key={i}
                onClick={() => onPhoto(i)}
                aria-label={`Buka ${gallery.title} ${i + 1} fullscreen`}
                style={{ transitionDelay: show ? `${350 + i * 80}ms` : "0ms" }}
                className={`group cursor-zoom-in overflow-hidden bg-[rgb(var(--fg)/0.08)] transition-all duration-700 ${
                  COLLAGE[i % COLLAGE.length]
                } ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"}`}
              >
                <img
                  src={p}
                  alt={`${gallery.title} ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
