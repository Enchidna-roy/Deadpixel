"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   DEADPIXEL — photography portfolio
   Drop into: app/page.tsx  (Next.js App Router + Tailwind CSS)
   Swap any image below with your own, e.g. "/photos/portraits/01.jpg"
   (put files in /public/photos). Uses plain <img> so no next.config
   changes are needed for remote placeholders.

   THEME: dark / light mode lewat CSS variable (lihat blok .dp di <style>).
   Semua warna tema dipakai sebagai rgb(var(--nama)) supaya bisa diberi
   opacity, mis. bg-[rgb(var(--bg)/0.9)]. Ubah palet di satu tempat saja.
------------------------------------------------------------------- */

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Placeholder set of n photos for a gallery (varied heights for the collage look).
const set = (seed: string, n: number) =>
  Array.from({ length: n }, (_, i) =>
    img(`${seed}-${i + 1}`, 900, i % 3 === 0 ? 1200 : 900),
  );

const NAV = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "GEAR", id: "gear" },
  { label: "GALLERIES", id: "galleries" },
  { label: "SELECTED WORKS", id: "works" },
  { label: "CONTACT", id: "contact" },
];

const SLIDES = [
  { src: img("deadpixel-hero-1", 2000, 1200), caption: "Neon rain, Magelang" },
  { src: img("deadpixel-hero-2", 2000, 1200), caption: "Golden hour portrait" },
  {
    src: img("deadpixel-hero-3", 2000, 1200),
    caption: "Volcanic ridge at dawn",
  },
  { src: img("deadpixel-hero-4", 2000, 1200), caption: "Concrete geometry" },
];

const HIGHLIGHTS = [
  { title: "Street & Urban", text: "Night streets, neon and human moments." },
  { title: "Portrait & Editorial", text: "Honest faces, cinematic light." },
  { title: "Landscape & Nature", text: "Quiet horizons and raw terrain." },
];

const GEAR = [
  {
    name: "Sony a6700",
    image: "/images/Gear/sony-a6700.jpg",
  },
  {
    name: "Tamron 17-70mm",
    image: "/images/Gear/tamron-17-70.jpg",
  },
  {
    name: "Sony 50mm F1.4",
    image: "/images/Gear/sony-50mm.jpg",
  },
  {
    name: "Takara Rover 77",
    image: "/images/Gear/takara-rover-77.jpg",
  },
  {
    name: "Godox TT600",
    image: "/images/Gear/godox-TT600.jpg",
  },
  {
    name: "Godox VDS-M2",
    image: "/images/Gear/godox-vds-m2.jpg",
  },
];

// Replace the `photos` arrays with your own files, e.g.
// photos: ["/photos/portraits/01.jpg", "/photos/portraits/02.jpg"]
//
// title   -> judul kartu di "Select Gallery"
// heading -> judul besar di modal (gaya slide PDF)
// quote   -> kutipan di bawah heading
// accent  -> warna blok aksen di atas modal
const GALLERIES = [
  {
    title: "PORTRAITS",
    heading: "Prita - Bridal Session",
    quote:
      "Kumpulan hasil jepretan dari sesi personal branding & bridal photoshoot, menonjolkan detail makeup, kain, dan pencahayaan natural.",
    accent: "#CFA085",
    count: "10 frames",
    src: "/images/Potraits/01.jpg",
    photos: set("dp-portrait", 10),
  },
  {
    title: "LANDSCAPES",
    heading: "Visual Stories",
    quote:
      "Sebuah kumpulan karya fotografi yang menangkap keindahan alam, momen personal, dan cerita di balik setiap gambar.",
    accent: "#4E521E",
    count: "36 frames",
    src: "/images/Landscapes/01.jpeg",
    photos: set("dp-landscape", 9),
  },
  {
    title: "Street & Urban",
    heading: "Street Photography",
    quote:
      "Eksplorasi visual jalanan dan pesisir, menangkap kontras cahaya dan momen yang mudah terlewat oleh mata biasa.",
    accent: "#B0B4BA",
    count: "52 frames",
    src: "/images/Urban/01.jpg",
    photos: set("dp-urban-photo", 9),
  },
  {
    title: "GRADUATION",
    heading: "A milestone worth remembering",
    quote:
      "Hari ini bukan hanya tentang kelulusan, tetapi tentang perjalanan, perjuangan, dan orang-orang yang selalu ada di belakangnya.",
    accent: "#8A93A0",
    count: "29 frames",
    src: "/images/Graduation/01.jpg",
    photos: set("dp-event", 9),
  },
];

// Pola ukuran kolase (berulang tiap 6 foto). Ubah sesuka hati.
const COLLAGE = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
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
  {
    label: "Instagram",
    href: "https://www.instagram.com/deadpixeell?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  },
  { label: "Behance", href: "https://behance.net" },
  { label: "500px", href: "https://500px.com" },
  { label: "Unsplash", href: "https://unsplash.com" },
  { label: "Email", href: "mailto:hello@deadpixel.id" },
];

const go = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

type Theme = "dark" | "light";
const THEME_KEY = "dp-theme";

export default function Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [slide, setSlide] = useState(0);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGallery, setOpenGallery] = useState<number | null>(null);
  const [sel, setSel] = useState(0); // which gallery card is "selected" (character-select)
  const [modalShow, setModalShow] = useState(false); // drives the open/close animation
  const [origin, setOrigin] = useState({ x: 50, y: 50 }); // where the reveal expands from (%)
  const [lb, setLb] = useState<number | null>(null); // index foto di lightbox
  const touchX = useRef<number | null>(null);

  // Tema: ambil pilihan tersimpan, kalau belum ada ikuti pengaturan sistem
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
        return;
      }
    } catch {}
    if (window.matchMedia("(prefers-color-scheme: light)").matches)
      setTheme("light");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  const openG = (i: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setOrigin({
      x: ((r.left + r.width / 2) / window.innerWidth) * 100,
      y: ((r.top + r.height / 2) / window.innerHeight) * 100,
    });
    setOpenGallery(i);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setModalShow(true)),
    );
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
  const isDark = theme === "dark";

  return (
    <main
      data-theme={theme}
      className="dp min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--tx))] antialiased transition-colors duration-300"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500&family=Montserrat:wght@500;700;800&display=swap');
        html { scroll-behavior: smooth; }

        /* ---- Palet tema (format "R G B" supaya bisa dipakai dengan opacity) ---- */
        .dp {
          --bg: 10 10 12;        /* latar utama */
          --bg2: 18 18 20;       /* latar section selang-seling */
          --fg: 255 255 255;     /* judul / teks kuat */
          --tx: 212 212 212;     /* teks isi */
          --mu: 163 163 163;     /* teks sekunder */
          --dm: 115 115 115;     /* teks redup */
          --ac: 168 85 247;      /* aksen ungu */
          --on: 10 10 12;        /* teks di atas tombol aksen */
          color-scheme: dark;
        }
        .dp[data-theme="light"] {
          --bg: 244 244 244;
          --bg2: 233 233 236;
          --fg: 17 17 17;
          --tx: 64 64 64;
          --mu: 82 82 82;
          --dm: 115 115 115;
          --ac: 147 51 234;
          --on: 255 255 255;
          color-scheme: light;
        }

        .dp { font-family: 'Inter', system-ui, sans-serif; }
        .dp .display { font-family: 'Syne', 'Inter', sans-serif; letter-spacing: -0.02em; }
        .dp .mont { font-family: 'Montserrat', 'Inter', sans-serif; letter-spacing: -0.04em; line-height: .95; }
        .dp :focus-visible { outline: 2px solid rgb(var(--ac)); outline-offset: 3px; }
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
          scrolled || menu
            ? "border-b border-[rgb(var(--fg)/0.08)] bg-[rgb(var(--bg)/0.9)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <button
            onClick={() => nav("home")}
            className="display text-xl font-extrabold tracking-[0.2em] text-[rgb(var(--fg))]"
          >
            DEAD<span className="text-[rgb(var(--ac))]">PIXEL</span>
          </button>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => nav(n.id)}
                className="group relative text-xs font-medium tracking-[0.18em] text-[rgb(var(--mu))] transition-colors hover:text-[rgb(var(--ac))]"
              >
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[rgb(var(--ac))] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label={
                isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"
              }
              title={isDark ? "Mode terang" : "Mode gelap"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--fg)/0.2)] text-[rgb(var(--fg))] transition hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))]"
            >
              {isDark ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => nav("contact")}
              className="hidden rounded-full border border-[rgb(var(--ac))] px-5 py-2 text-xs font-semibold tracking-[0.16em] text-[rgb(var(--ac))] transition hover:bg-[rgb(var(--ac))] hover:text-[rgb(var(--on))] hover:shadow-[0_0_24px_rgba(168,85,247,.45)] sm:block"
            >
              GET IN TOUCH
            </button>
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <span
                className={`h-px w-6 bg-[rgb(var(--fg))] transition ${menu ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 bg-[rgb(var(--fg))] transition ${menu ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-6 bg-[rgb(var(--fg))] transition ${menu ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {menu && (
          <nav
            className="flex flex-col gap-1 border-t border-[rgb(var(--fg)/0.08)] px-5 pb-6 pt-3 lg:hidden"
            aria-label="Mobile"
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => nav(n.id)}
                className="py-3 text-left text-sm tracking-[0.18em] text-[rgb(var(--tx))] hover:text-[rgb(var(--ac))]"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => nav("contact")}
              className="mt-3 rounded-full border border-[rgb(var(--ac))] py-3 text-xs font-semibold tracking-[0.16em] text-[rgb(var(--ac))]"
            >
              GET IN TOUCH
            </button>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col justify-end overflow-hidden"
      >
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
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.65)] to-[rgb(var(--bg)/0.4)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--bg)/0.8)] via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-40 md:px-8">
          <div className="dp-in max-w-3xl">
            <h1 className="display text-5xl font-extrabold uppercase leading-[0.95] text-[rgb(var(--ac))] drop-shadow-[0_0_30px_rgba(168,85,247,.25)] sm:text-7xl lg:text-8xl">
              Deadpixel
              <span className="block text-[rgb(var(--fg))]">Visual Arts</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[rgb(var(--tx))] md:text-lg">
              Deadpixel is a photography studio shooting in low light, hard
              shadow and colour that refuses to sit still. We look for the frame
              most people walk past, then make it impossible to ignore.
            </p>
            <p className="mt-4 text-xs tracking-[0.2em] text-[rgb(var(--mu))]">
              Now showing: {SLIDES[slide].caption}
            </p>
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
                  i === slide
                    ? "text-[rgb(var(--ac))]"
                    : "text-[rgb(var(--dm))] hover:text-[rgb(var(--fg))]"
                }`}
              >
                <span
                  className={`h-px transition-all ${
                    i === slide
                      ? "w-8 bg-[rgb(var(--ac))]"
                      : "w-3 bg-[rgb(var(--dm))]"
                  }`}
                />
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          {/* Highlights */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[rgb(var(--fg)/0.12)] bg-[rgb(var(--fg)/0.12)] md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="group bg-[rgb(var(--bg)/0.75)] p-6 backdrop-blur-md transition-colors hover:bg-[rgb(var(--bg2))]"
              >
                <h3 className="display text-lg font-bold uppercase text-[rgb(var(--fg))]">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm text-[rgb(var(--mu))]">{h.text}</p>
                <button
                  onClick={() => nav("galleries")}
                  className="mt-4 text-xs font-semibold tracking-[0.18em] text-[rgb(var(--ac))] transition-all group-hover:tracking-[0.26em]"
                >
                  VIEW GALLERY →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-32"
      >
        <h2 className="display text-4xl font-extrabold uppercase leading-tight text-[rgb(var(--fg))] md:text-5xl">
          Light is the only{" "}
          <span className="text-[rgb(var(--ac))]">subject</span>
        </h2>
        <div className="space-y-5 text-base font-light leading-relaxed">
          <p>
            Deadpixel started with a single stuck pixel on a first camera and a
            decision to treat flaws as style. Today the work spans street,
            portrait, landscape and commercial projects across Indonesia and
            beyond.
          </p>
          <p>
            Every shoot is built around available light, a small kit and a lot
            of patience. The result is imagery that feels lived in, not staged.
          </p>
        </div>
      </section>
      {/* GEAR */}
      <section id="gear" className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* HEADER */}
          <div className="mb-12">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[rgb(var(--ac))]">
              THE TOOLS
            </p>

            <h2 className="display mt-2 text-4xl font-extrabold uppercase tracking-tight text-[rgb(var(--fg))] md:text-5xl">
              MY <span className="text-[rgb(var(--ac))]">GEAR</span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-[rgb(var(--mu))]">
              The gear I use to capture moments, from everyday scenes to bigger
              stories.
            </p>
          </div>

          {/* GEAR */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {GEAR.map((gear) => (
              <article key={gear.name} className="group">
                {/* IMAGE BOX */}
                <div className="aspect-square overflow-hidden rounded-2xl bg-[#151517]">
                  <img
                    src={gear.image}
                    alt={`${gear.brand} ${gear.name}`}
                    loading="lazy"
                    className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* TEXT */}
                <div className="mt-4">
                  <p className="text-[9px] font-medium tracking-[0.2em] text-[rgb(var(--dm))]">
                    {gear.brand}
                  </p>

                  <h3 className="mt-1 text-base font-medium text-[rgb(var(--fg))]">
                    {gear.name}
                  </h3>

                  <span className="mt-3 block text-sm text-[rgb(var(--ac))] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURED GALLERIES */}
      <section
        id="galleries"
        className="bg-[rgb(var(--bg2))] py-24 transition-colors duration-300 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-[rgb(var(--dm))]">
                PLAYER 1
              </p>
              <h2 className="display mt-2 text-4xl font-extrabold uppercase text-[rgb(var(--ac))] md:text-5xl">
                Select Gallery
              </h2>
              <p className="mt-3 max-w-md text-[rgb(var(--mu))]">
                Arahkan kursor atau tap untuk memilih, lalu klik kartu terpilih
                untuk masuk.
              </p>
            </div>
            <p className="display hidden text-5xl font-extrabold text-[rgb(var(--fg)/0.1)] sm:block md:text-7xl">
              {String(sel + 1).padStart(2, "0")}
              <span className="text-2xl md:text-3xl">
                {" "}
                / {String(GALLERIES.length).padStart(2, "0")}
              </span>
            </p>
          </div>

          {/* Character-select row */}
          <div
            className="mt-14 grid grid-cols-2 gap-3 lg:flex lg:h-[600px] lg:items-center lg:justify-center lg:gap-4"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight")
                setSel((s) => (s + 1) % GALLERIES.length);
              if (e.key === "ArrowLeft")
                setSel((s) => (s - 1 + GALLERIES.length) % GALLERIES.length);
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
                  aria-label={
                    on ? `Enter ${g.title} gallery` : `Select ${g.title}`
                  }
                  aria-pressed={on}
                  className={`relative aspect-[4/5] overflow-hidden rounded-xl border text-left transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:aspect-auto lg:shrink-0 ${
                    on
                      ? "z-10 scale-[1.03] border-[rgb(var(--ac))] shadow-[0_0_70px_rgba(168,85,247,.5)] lg:h-[550px] lg:w-[440px] lg:scale-100"
                      : "border-[rgb(var(--fg)/0.12)] lg:h-[400px] lg:w-[190px]"
                  }`}
                >
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      on
                        ? "scale-105 brightness-100 grayscale-0"
                        : "scale-100 brightness-50 grayscale"
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
                      on
                        ? "translate-y-0 opacity-100 delay-300"
                        : "-translate-y-1 opacity-0"
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
                      on
                        ? "opacity-0 duration-200"
                        : "opacity-100 delay-300 duration-500"
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
                        on
                          ? "translate-y-0 opacity-100 delay-500"
                          : "hidden translate-y-2 opacity-0 lg:block"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-neutral-300">
                          FRAMES
                        </span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                          {on && (
                            <div
                              key={`bar-${i}`}
                              className="dp-bar h-full rounded-full bg-gradient-to-r from-[#A855F7] to-fuchsia-400"
                              style={{ width: `${pct}%` }}
                            />
                          )}
                        </div>
                        <span className="text-xs font-bold text-[#C084FC]">
                          {frames}
                        </span>
                      </div>
                      <p className="dp-pulse mt-4 text-xs font-semibold tracking-[0.22em] text-white">
                        ▶ PRESS TO ENTER
                      </p>
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
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.7)] to-[rgb(var(--bg))]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display text-5xl font-extrabold uppercase leading-[0.95] text-[rgb(var(--fg))] md:text-7xl">
              Capturing
              <span className="block text-[rgb(var(--ac))]">the unseen</span>
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-[rgb(var(--tx))]">
              Each project starts with scouting at odd hours, then hours of
              waiting for one moment. Editing stays minimal: contrast, grain and
              a colour grade that keeps the shadows honest.
            </p>
            <button className="mt-8 rounded-full bg-[rgb(var(--ac))] px-7 py-3 text-xs font-bold tracking-[0.18em] text-[rgb(var(--on))] transition hover:shadow-[0_0_32px_rgba(168,85,247,.55)]">
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

      {/* CONTACT + FOOTER */}
      <footer
        id="contact"
        className="border-t border-[rgb(var(--fg)/0.12)] px-5 py-20 text-center"
      >
        <h2 className="display text-3xl font-extrabold tracking-[0.3em] text-[rgb(var(--fg))] md:text-4xl">
          DEAD<span className="text-[rgb(var(--ac))]">PIXEL</span>
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-[rgb(var(--dm))]">
          Booking shoots for portraits, events and brands.
        </p>
        <a
          href="mailto:hello@deadpixel.id"
          className="mt-6 inline-block rounded-full border border-[rgb(var(--ac))] px-7 py-3 text-xs font-semibold tracking-[0.18em] text-[rgb(var(--ac))] transition hover:bg-[rgb(var(--ac))] hover:text-[rgb(var(--on))]"
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
                className="text-sm text-[rgb(var(--mu))] transition-colors hover:text-[rgb(var(--ac))]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-xs text-[rgb(var(--dm))]">
          © {new Date().getFullYear()} Deadpixel. All photographs are protected.
          All rights reserved.
        </p>
      </footer>

      {/* GALLERY MODAL — gaya slide PDF, ikut tema */}
      {active && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-[rgb(var(--bg))] transition-[clip-path] duration-[700ms] ease-[cubic-bezier(.65,0,.35,1)]"
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
          <div
            className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-8 pt-28 text-[rgb(var(--fg))] md:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* blok warna aksen */}
            <span
              className="absolute left-[8%] top-0 h-14 w-[40%] origin-top transition-transform duration-700 delay-300 md:h-20"
              style={{
                background: active.accent,
                transform: modalShow ? "scaleY(1)" : "scaleY(0)",
              }}
            />

            <button
              onClick={closeG}
              aria-label="Close gallery"
              className="absolute right-5 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--fg)/0.2)] bg-[rgb(var(--bg))] text-lg text-[rgb(var(--fg))] transition hover:border-[rgb(var(--ac))] hover:text-[rgb(var(--ac))] md:right-10"
            >
              ✕
            </button>

            <div className="grid flex-1 gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
              {/* kiri: judul + kutipan */}
              <div
                className={`self-start transition-all duration-700 delay-300 lg:sticky lg:top-28 lg:self-center ${
                  modalShow
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <h3 className="mont text-5xl font-extrabold md:text-6xl lg:text-7xl">
                  {active.heading}
                </h3>
                <p className="mt-8 max-w-sm text-base leading-relaxed text-[rgb(var(--tx))]">
                  “{active.quote}”
                </p>
              </div>

              {/* kanan: kolase */}
              <div className="grid auto-rows-[120px] grid-flow-dense grid-cols-3 gap-3 sm:auto-rows-[150px] md:auto-rows-[170px] md:gap-4 lg:grid-cols-4">
                {active.photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setLb(i)}
                    aria-label={`Buka ${active.title} ${i + 1} fullscreen`}
                    style={{
                      transitionDelay: modalShow ? `${350 + i * 80}ms` : "0ms",
                    }}
                    className={`group cursor-zoom-in overflow-hidden bg-[rgb(var(--fg)/0.08)] transition-all duration-700 ${
                      COLLAGE[i % COLLAGE.length]
                    } ${modalShow ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"}`}
                  >
                    <img
                      src={p}
                      alt={`${active.title} ${i + 1}`}
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
      )}

      {/* LIGHTBOX (selalu gelap supaya foto enak dilihat) */}
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
                  <span className="text-[#A855F7]">
                    {String(lb + 1).padStart(2, "0")}
                  </span>
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
