"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import { HIGHLIGHTS, SLIDES } from "../data";
import { go } from "../lib/scroll";

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [requested, setRequested] = useState([0]);
  const ready = useRef(new Set<number>());
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    let visible = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const canPlay = () => visible && !document.hidden && !motion.matches && !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    const next = (slide + 1) % SLIDES.length;
    const requestNext = () => {
      if (canPlay()) setRequested((items) => items.includes(next) ? items : [...items, next]);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (section.current) observer.observe(section.current);
    const warm = setTimeout(requestNext, 3500);
    const timer = setInterval(() => {
      if (!canPlay()) return;
      requestNext();
      if (ready.current.has(next)) setSlide(next);
    }, 6000);
    return () => { clearTimeout(warm); clearInterval(timer); observer.disconnect(); };
  }, [slide]);

  return (
    <section
      id="home"
      ref={section}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {SLIDES.map((s, i) => requested.includes(i) && (
        <Photo
          key={s.src}
          src={s.src}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority={i === 0 ? "high" : "low"}
          onLoad={() => ready.current.add(i)}
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
          <h1 className="display text-[clamp(2.25rem,10vw,6rem)] font-extrabold uppercase leading-[0.95] text-[rgb(var(--ac))] drop-shadow-[0_0_30px_rgb(var(--ac)/0.25)]">
            Deadpixel
            <span className="block text-[rgb(var(--fg))]">Visual Arts</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[rgb(var(--tx))] md:text-lg">
            Deadpixel is a photography studio shooting in low light, hard shadow
            and colour that refuses to sit still. We look for the frame most
            people walk past, then make it impossible to ignore.
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
              onClick={() => {
                setRequested((items) => items.includes(i) ? items : [...items, i]);
                setSlide(i);
              }}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === slide}
              className={`display flex items-center gap-3 text-sm font-bold transition-colors ${
                i === slide
                  ? "text-[rgb(var(--ac))]"
                  : "text-[rgb(var(--dm))] hover:text-[rgb(var(--fg))]"
              }`}
            >
              <span
                className={`h-px w-8 origin-right transition-[transform,background-color] ${
                  i === slide
                    ? "scale-x-100 bg-[rgb(var(--ac))]"
                    : "scale-x-[0.375] bg-[rgb(var(--dm))]"
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
              className="group bg-[rgb(var(--bg)/0.9)] p-5 transition-colors hover:bg-[rgb(var(--bg2))] md:p-6"
            >
              <h3 className="display text-lg font-bold uppercase text-[rgb(var(--fg))]">
                {h.title}
              </h3>
              <p className="mt-2 text-sm text-[rgb(var(--mu))]">{h.text}</p>
              <button
                onClick={() => go("galleries")}
                className="mt-4 text-xs font-semibold tracking-[0.18em] text-[rgb(var(--ac))] transition-transform group-hover:translate-x-1"
              >
                VIEW GALLERY →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
