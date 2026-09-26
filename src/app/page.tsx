"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   DEADPIXEL — photography portfolio
   Drop into: app/page.tsx  (Next.js App Router + Tailwind CSS)
   Swap any image below with your own, e.g. "/photos/portraits/01.jpg"
   (put files in /public/photos). Uses plain <img> so no next.config
   changes are needed for remote placeholders.
------------------------------------------------------------------- */

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Placeholder set of n photos for a gallery (varied heights for the masonry look).
const set = (seed: string, n: number) =>
  Array.from({ length: n }, (_, i) => img(`${seed}-${i + 1}`, 900, i % 3 === 0 ? 1200 : 900));

const NAV = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "GALLERIES", id: "galleries" },
  { label: "SELECTED WORKS", id: "works" },
  { label: "CONTACT", id: "contact" },
];

const SLIDES = [
  { src: img("deadpixel-hero-1", 2000, 1200), caption: "Neon rain, Magelang" },
  { src: img("deadpixel-hero-2", 2000, 1200), caption: "Golden hour portrait" },
  { src: img("deadpixel-hero-3", 2000, 1200), caption: "Volcanic ridge at dawn" },
  { src: img("deadpixel-hero-4", 2000, 1200), caption: "Concrete geometry" },
];

const HIGHLIGHTS = [
  { title: "Street & Urban", text: "Night streets, neon and human moments." },
  { title: "Portrait & Editorial", text: "Honest faces, cinematic light." },
  { title: "Landscape & Nature", text: "Quiet horizons and raw terrain." },
];

// Replace the `photos` arrays with your own files, e.g.
// photos: ["/photos/portraits/01.jpg", "/photos/portraits/02.jpg"]
const GALLERIES = [
  {
    title: "PORTRAITS",
    count: "10 frames",
    src: "/images/Potraits/01.jpg",
    photos: set("dp-portrait", 10),
  },
  {
    title: "LANDSCAPES",
    count: "36 frames",
    src: "/images/Landscapes/01.jpeg",
    photos: set("dp-landscape", 9),
  },
  {
    title: "Street & Urban",
    count: "52 frames",
    src: "/images/Urban/01.jpg",
    photos: set("dp-urban-photo", 9),
  },
  {
    title: "GRADUATION",
    count: "29 frames",
    src: "/images/Graduation/01.jpg",
    photos: set("dp-event", 9),
  },
];

const WORKS = [
  { src: img("dp-work-1", 700, 700), meta: "35mm | f/1.8 | 1/1000s | ISO 100" },
  { src: img("dp-work-2", 700, 700), meta: "50mm | f/1.4 | 1/500s | ISO 200" },
  { src: img("dp-work-3", 700, 700), meta: "24mm | f/8 | 1/250s | ISO 100" },
  { src: img("dp-work-4", 700, 700), meta: "85mm | f/2.0 | 1/640s | ISO 160" },
  { src: img("dp-work-5", 700, 700), meta: "28mm | f/2.8 | 1/60s | ISO 800" },
  { src: img("dp-work-6", 700, 700), meta: "70mm | f/4 | 1/800s | ISO 100" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/deadpixeell?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" },
  { label: "Behance", href: "https://behance.net" },
  { label: "500px", href: "https://500px.com" },
  { label: "Unsplash", href: "https://unsplash.com" },
  { label: "Email", href: "mailto:hello@deadpixel.id" },
];

const go = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Page() {
  const [slide, setSlide] = useState(0);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGallery, setOpenGallery] = useState<number | null>(null);
  const [sel, setSel] = useState(0); // which gallery card is "selected" (character-select)
  const [modalShow, setModalShow] = useState(false); // drives the open/close animation
  const [origin, setOrigin] = useState({ x: 50, y: 50 }); // where the reveal expands from (%)
  const [lb, setLb] = useState<number | null>(null); // index foto di lightbox
  const touchX = useRef<number | null>(null);

  const openG = (i: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setOrigin({
      x: ((r.left + r.width / 2) / window.innerWidth) * 100,
      y: ((r.top + r.height / 2) / window.innerHeight) * 100,
    });
    setOpenGallery(i);
    requestAnimationFrame(() => requestAnimationFrame(() => setModalShow(true)));
  };

  const closeG = () => {
    setLb(null);
    setModalShow(false);
    setTimeout(() => setOpenGallery(null), 650); // wait for the close animation
  };

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gallery modal + lightbox: keyboard + lock page scroll
  useEffect(() => {
    if (openGallery === null) return;
    const n = GALLERIES[openGallery].photos.length;
    const onKey = (e: KeyboardEvent) => {
      if (lb !== null) {
        if (e.key === "Escape") setLb(null);
        else if (e.key === "ArrowRight") setLb((lb + 1) % n);
        else if (e.key === "ArrowLeft") setLb((lb - 1 + n) % n);
        return;
      }
      if (e.key === "Escape") closeG();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openGallery, lb]);

  // Preload foto sebelah supaya pindah foto tidak berkedip
  useEffect(() => {
    if (openGallery === null || lb === null) return;
    const ph = GALLERIES[openGallery].photos;
    [1, -1].forEach((d) => {
      const im = new Image();
      im.src = ph[(lb + d + ph.length) % ph.length];
    });
  }, [openGallery, lb]);

  const nav = (id: string) => {
    setMenu(false);
    go(id);
  };

  const active = openGallery !== null ? GALLERIES[openGallery] : null;

  return (
    <main className="dp min-h-screen bg-[#0A0A0C] text-neutral-300 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; }
        .dp { font-family: 'Inter', system-ui, sans-serif; }
        .dp .display { font-family: 'Syne', 'Inter', sans-serif; letter-spacing: -0.02em; }
        .dp :focus-visible { outline: 2px solid #A855F7; outline-offset: 3px; }
        @keyframes dp-in { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        .dp-in { animation: dp-in .9s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes dp-pulse { 0%,100% { opacity: 1; } 50% { opacity: .55; } }
        .dp-pulse { animation: dp-pulse 2.4s ease-in-out infinite; }
        @keyframes dp-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .dp-bar { transform-origin: left; animation: dp-bar .7s .15s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes dp-lb { from { opacity: 0; } to { opacity: 1; } }
        .dp-lb { animation: dp-lb .35s ease both; }
        @keyframes dp-lb-img { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: none; } }
        .dp-lb-img { animation: dp-lb-img .4s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .dp *, .dp *::before, .dp *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menu ? "bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <button onClick={() => nav("home")} className="display text-xl font-extrabold tracking-[0.2em] text-white">
            DEAD<span className="text-[#A855F7]">PIXEL</span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => nav(n.id)}
                className="group relative text-xs font-medium tracking-[0.18em] text-neutral-400 transition-colors hover:text-[#A855F7]"
              >
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#A855F7] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => nav("contact")}
              className="hidden rounded-full border border-[#A855F7] px-5 py-2 text-xs font-semibold tracking-[0.16em] text-[#A855F7] transition hover:bg-[#A855F7] hover:text-[#0A0A0C] hover:shadow-[0_0_24px_rgba(168,85,247,.45)] sm:block"
            >
              GET IN TOUCH
            </button>
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <span className={`h-px w-6 bg-white transition ${menu ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-white transition ${menu ? "opacity-0" : ""}`} />
              <span className={`h-px w-6 bg-white transition ${menu ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {menu && (
          <nav className="flex flex-col gap-1 border-t border-white/5 px-5 pb-6 pt-3 lg:hidden" aria-label="Mobile">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => nav(n.id)}
                className="py-3 text-left text-sm tracking-[0.18em] text-neutral-300 hover:text-[#A855F7]"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => nav("contact")}
              className="mt-3 rounded-full border border-[#A855F7] py-3 text-xs font-semibold tracking-[0.16em] text-[#A855F7]"
            >
              GET IN TOUCH
            </button>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen flex-col justify-end overflow-hidden">
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.caption}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/60 to-[#0A0A0C]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/80 via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-40 md:px-8">
          <div className="dp-in max-w-3xl">
            <h1 className="display text-5xl font-extrabold uppercase leading-[0.95] text-[#A855F7] drop-shadow-[0_0_30px_rgba(168,85,247,.25)] sm:text-7xl lg:text-8xl">
              Deadpixel
              <span className="block text-white">Visual Arts</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-neutral-300 md:text-lg">
              Deadpixel is a photography studio shooting in low light, hard shadow and colour that
              refuses to sit still. We look for the frame most people walk past, then make it
              impossible to ignore.
            </p>
            <p className="mt-4 text-xs tracking-[0.2em] text-neutral-500">Now showing: {SLIDES[slide].caption}</p>
          </div>

          {/* Right pagination */}
          <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 md:right-8 md:flex">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === slide}
                className={`display flex items-center gap-3 text-sm font-bold transition-all ${
                  i === slide ? "text-[#A855F7]" : "text-neutral-600 hover:text-neutral-300"
                }`}
              >
                <span className={`h-px transition-all ${i === slide ? "w-8 bg-[#A855F7]" : "w-3 bg-neutral-600"}`} />
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          {/* Highlights */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="group bg-[#0A0A0C]/75 p-6 backdrop-blur-md transition-colors hover:bg-[#121214]"
              >
                <h3 className="display text-lg font-bold uppercase text-white">{h.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{h.text}</p>
                <button
                  onClick={() => nav("galleries")}
                  className="mt-4 text-xs font-semibold tracking-[0.18em] text-[#A855F7] transition-all group-hover:tracking-[0.26em]"
                >
                  VIEW GALLERY →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-32">
        <h2 className="display text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl">
          Light is the only <span className="text-[#A855F7]">subject</span>
        </h2>
        <div className="space-y-5 text-base font-light leading-relaxed">
          <p>
            Deadpixel started with a single stuck pixel on a first camera and a decision to treat
            flaws as style. Today the work spans street, portrait, landscape and commercial
            projects across Indonesia and beyond.
          </p>
          <p>
            Every shoot is built around available light, a small kit and a lot of patience. The
            result is imagery that feels lived in, not staged.
          </p>
        </div>
      </section>

      {/* FEATURED GALLERIES */}
      <section id="galleries" className="bg-[#121214] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500">PLAYER 1</p>
              <h2 className="display mt-2 text-4xl font-extrabold uppercase text-[#A855F7] md:text-5xl">
                Select Gallery
              </h2>
              <p className="mt-3 max-w-md text-neutral-400">
                Arahkan kursor atau tap untuk memilih, lalu klik kartu terpilih untuk masuk.
              </p>
            </div>
            <p className="display hidden text-5xl font-extrabold text-white/10 sm:block md:text-7xl">
              {String(sel + 1).padStart(2, "0")}
              <span className="text-2xl md:text-3xl"> / {String(GALLERIES.length).padStart(2, "0")}</span>
            </p>
          </div>

          {/* Character-select row */}
          <div
            className="mt-14 grid grid-cols-2 gap-3 lg:flex lg:h-[600px] lg:items-center lg:justify-center lg:gap-4"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setSel((s) => (s + 1) % GALLERIES.length);
              if (e.key === "ArrowLeft") setSel((s) => (s - 1 + GALLERIES.length) % GALLERIES.length);
            }}
          >
            {GALLERIES.map((g, i) => {
              const on = sel === i;
              const frames = parseInt(g.count) || 0;
              const pct = Math.min(100, Math.round((frames / 60) * 100));
              return (
                <button
                  key={g.title}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                  onFocus={() => setSel(i)}
                  onClick={(e) => (on ? openG(i, e.currentTarget) : setSel(i))}
                  aria-label={on ? `Enter ${g.title} gallery` : `Select ${g.title}`}
                  aria-pressed={on}
                  className={`relative aspect-[4/5] overflow-hidden rounded-xl border text-left transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:aspect-auto lg:shrink-0 ${
                    on
                      ? "z-10 scale-[1.03] border-[#A855F7] shadow-[0_0_70px_rgba(168,85,247,.5)] lg:h-[550px] lg:w-[440px] lg:scale-100"
                      : "border-white/10 lg:h-[400px] lg:w-[190px]"
                  }`}
                >
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      on ? "scale-105 brightness-100 grayscale-0" : "scale-100 brightness-50 grayscale"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                  {/* scanlines */}
                  <div
                    className={`pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-500 ${
                      on ? "opacity-40" : "opacity-0"
                    }`}
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(255,255,255,.15) 0 1px, transparent 1px 3px)",
                    }}
                  />

                  {/* corner brackets (selalu ada, cuma fade) */}
                  {[
                    "left-4 top-3 border-l-2 border-t-2",
                    "right-3 top-3 border-r-2 border-t-2",
                    "left-3 bottom-3 border-l-2 border-b-2",
                    "right-3 bottom-3 border-r-2 border-b-2",
                  ].map((c) => (
                    <span
                      key={c}
                      className={`pointer-events-none absolute h-7 w-7 border-[#A855F7] transition-opacity duration-500 ${c} ${
                        on ? "opacity-100 delay-300" : "opacity-0"
                      }`}
                    />
                  ))}

                  {/* badge */}
                  <span
                    className={`absolute left-6 top-6 rounded-sm bg-[#A855F7] px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[#0A0A0C] transition-all duration-500 ${
                      on ? "translate-y-0 opacity-100 delay-300" : "-translate-y-1 opacity-0"
                    }`}
                  >
                    P1 SELECTED
                  </span>

                  {/* index number: ukuran tetap, hanya opacity */}
                  <span
                    className={`display absolute right-6 top-5 text-3xl font-extrabold text-white transition-opacity duration-500 ${
                      on ? "opacity-80" : "opacity-30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* judul vertikal (kartu tidak terpilih, desktop) */}
                  <h3
                    aria-hidden
                    className={`display pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 rotate-180 text-lg font-bold uppercase tracking-[0.15em] text-white/80 transition-opacity [writing-mode:vertical-rl] lg:block ${
                      on ? "opacity-0 duration-200" : "opacity-100 delay-300 duration-500"
                    }`}
                  >
                    {g.title}
                  </h3>

                  {/* name plate */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3
                      className={`display text-lg font-bold uppercase leading-tight text-white transition-opacity lg:text-3xl ${
                        on
                          ? "opacity-100 delay-300 duration-500"
                          : "opacity-100 duration-300 lg:opacity-0 lg:duration-200"
                      }`}
                    >
                      {g.title}
                    </h3>

                    <div
                      className={`mt-3 transition-all duration-500 ${
                        on ? "translate-y-0 opacity-100 delay-500" : "hidden translate-y-2 opacity-0 lg:block"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400">FRAMES</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                          {on && (
                            <div
                              key={`bar-${i}`}
                              className="dp-bar h-full rounded-full bg-gradient-to-r from-[#A855F7] to-fuchsia-400"
                              style={{ width: `${pct}%` }}
                            />
                          )}
                        </div>
                        <span className="text-xs font-bold text-[#A855F7]">{frames}</span>
                      </div>
                      <p className="dp-pulse mt-4 text-xs font-semibold tracking-[0.22em] text-white">▶ PRESS TO ENTER</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section id="works" className="relative overflow-hidden py-24 md:py-32">
        <img
          src={img("dp-works-bg", 1800, 1200)}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/70 to-[#0A0A0C]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display text-5xl font-extrabold uppercase leading-[0.95] text-white md:text-7xl">
              Capturing
              <span className="block text-[#A855F7]">the unseen</span>
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-neutral-300">
              Each project starts with scouting at odd hours, then hours of waiting for one
              moment. Editing stays minimal: contrast, grain and a colour grade that keeps the
              shadows honest.
            </p>
            <button className="mt-8 rounded-full bg-[#A855F7] px-7 py-3 text-xs font-bold tracking-[0.18em] text-[#0A0A0C] transition hover:shadow-[0_0_32px_rgba(168,85,247,.55)]">
              VIEW FULL PROJECT
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {WORKS.map((w, i) => (
              <figure
                key={i}
                className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-[#A855F7]/60"
              >
                <img
                  src={w.src}
                  alt={`Selected work ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-[#0A0A0C]/90 p-2.5 text-center text-[10px] tracking-[0.1em] text-[#A855F7] backdrop-blur transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
                  {w.meta}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + FOOTER */}
      <footer id="contact" className="border-t border-white/10 px-5 py-20 text-center">
        <h2 className="display text-3xl font-extrabold tracking-[0.3em] text-white md:text-4xl">
          DEAD<span className="text-[#A855F7]">PIXEL</span>
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-neutral-500">
          Booking shoots for portraits, events and brands.
        </p>
        <a
          href="mailto:hello@deadpixel.id"
          className="mt-6 inline-block rounded-full border border-[#A855F7] px-7 py-3 text-xs font-semibold tracking-[0.18em] text-[#A855F7] transition hover:bg-[#A855F7] hover:text-[#0A0A0C]"
        >
          GET IN TOUCH
        </a>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-neutral-400 transition-colors hover:text-[#A855F7]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-xs text-neutral-600">
          © {new Date().getFullYear()} Deadpixel. All photographs are protected. All rights reserved.
        </p>
      </footer>

      {/* GALLERY MODAL */}
      {active && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#0A0A0C] transition-[clip-path] duration-[700ms] ease-[cubic-bezier(.65,0,.35,1)]"
          style={{
            clipPath: modalShow
              ? `circle(150% at ${origin.x}% ${origin.y}%)`
              : `circle(0% at ${origin.x}% ${origin.y}%)`,
          }}
          onClick={closeG}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} gallery`}
        >
          <div className="mx-auto max-w-6xl px-5 py-20" onClick={(e) => e.stopPropagation()}>
            <div
              className={`flex items-center justify-between transition-all duration-700 delay-300 ${
                modalShow ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <h3 className="display text-3xl font-extrabold uppercase text-[#A855F7] md:text-5xl">{active.title}</h3>
              <button
                onClick={closeG}
                aria-label="Close gallery"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg text-white transition hover:border-[#A855F7] hover:text-[#A855F7]"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 columns-2 gap-4 md:columns-3">
              {active.photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setLb(i)}
                  aria-label={`Buka ${active.title} ${i + 1} fullscreen`}
                  style={{ transitionDelay: modalShow ? `${350 + i * 80}ms` : "0ms" }}
                  className={`group mb-4 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10 transition-all duration-700 hover:border-[#A855F7]/60 ${
                    modalShow ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
                  }`}
                >
                  <img
                    src={p}
                    alt={`${active.title} ${i + 1}`}
                    loading="lazy"
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {active &&
        lb !== null &&
        (() => {
          const n = active.photos.length;
          const step = (d: number) => setLb((lb + d + n) % n);
          return (
            <div
              className="dp-lb fixed inset-0 z-[70] flex items-center justify-center bg-black/95"
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} foto ${lb + 1} dari ${n}`}
              onClick={() => setLb(null)}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              }}
            >
              {/* top bar */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 md:p-8">
                <p className="display text-sm font-bold tracking-[0.2em] text-white/70">
                  <span className="text-[#A855F7]">{String(lb + 1).padStart(2, "0")}</span>
                  <span> / {String(n).padStart(2, "0")}</span>
                  <span className="ml-4 hidden text-xs font-medium tracking-[0.18em] text-white/40 sm:inline">
                    {active.title}
                  </span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLb(null);
                  }}
                  aria-label="Tutup foto"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg text-white transition hover:border-[#A855F7] hover:text-[#A855F7]"
                >
                  ✕
                </button>
              </div>

              {/* prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white backdrop-blur transition hover:border-[#A855F7] hover:text-[#A855F7] md:left-8"
              >
                ←
              </button>

              {/* image */}
              <img
                key={lb}
                src={active.photos[lb]}
                alt={`${active.title} ${lb + 1}`}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
                className="dp-lb-img max-h-[82vh] max-w-[92vw] select-none rounded-md object-contain md:max-w-[80vw]"
              />

              {/* next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Foto berikutnya"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white backdrop-blur transition hover:border-[#A855F7] hover:text-[#A855F7] md:right-8"
              >
                →
              </button>

              <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] tracking-[0.25em] text-white/30">
                ← → UNTUK PINDAH · ESC UNTUK TUTUP
              </p>
            </div>
          );
        })()}
    </main>
  );
}