import { WORKS, img } from "../data";

export default function Works() {
  return (
    <section id="works" className="relative overflow-hidden py-24 md:py-32">
      <img
        src={img("dp-works-bg", 1800, 1200)}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.7)] to-[rgb(var(--bg))]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="display text-5xl font-extrabold uppercase leading-[0.95] text-[rgb(var(--fg))] md:text-7xl">
            Capturing
            <span className="block text-[rgb(var(--ac))]">the unseen</span>
          </h2>
          <p className="mt-6 max-w-md font-light leading-relaxed text-[rgb(var(--tx))]">
            Each project starts with scouting at odd hours, then hours of
            waiting for one moment. Editing stays minimal: contrast, grain and a
            colour grade that keeps the shadows honest.
          </p>
          <button className="mt-8 rounded-full bg-[rgb(var(--ac))] px-7 py-3 text-xs font-bold tracking-[0.18em] text-[rgb(var(--on))] transition hover:shadow-[0_0_32px_rgb(var(--ac)/0.55)]">
            VIEW FULL PROJECT
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {WORKS.map((w, i) => (
            <figure
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg border border-[rgb(var(--fg)/0.12)] transition-colors hover:border-[rgb(var(--ac)/0.6)]"
            >
              <img
                src={w.src}
                alt={`Selected work ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-[rgb(var(--bg)/0.9)] p-2.5 text-center text-[10px] tracking-[0.1em] text-[rgb(var(--ac))] backdrop-blur transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
                {w.meta}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
