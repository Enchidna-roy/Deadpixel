"use client";

import { useState } from "react";
import { GALLERIES } from "../data";
import Photo from "./Photo";

type Props = { onOpen: (index: number, el: HTMLElement) => void };

export default function GallerySelect({ onOpen }: Props) {
  const [sel, setSel] = useState(0); // kartu yang sedang "terpilih"

  return (
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
          className="mt-10 grid grid-cols-2 gap-3 lg:h-[550px] lg:grid-cols-4 lg:items-center lg:gap-4"
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
                onClick={(e) => (on ? onOpen(i, e.currentTarget) : setSel(i))}
                aria-label={on ? `Enter ${g.title} gallery` : `Select ${g.title}`}
                aria-pressed={on}
                className={`dp-gallery-card relative min-w-0 aspect-[3/5] overflow-hidden rounded-xl border text-left transition-[transform,border-color] duration-300 ease-out sm:aspect-[4/5] lg:aspect-auto lg:h-[480px] ${
                  on
                    ? "z-10 border-[rgb(var(--ac))] lg:scale-105"
                    : "border-[rgb(var(--fg)/0.12)]"
                }`}
              >
                <Photo
                  src={g.src}
                  fill
                  sizes="(max-width: 1023px) 44vw, (max-width: 1280px) 23vw, 290px"
                  alt={g.title}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    on
                      ? "scale-105"
                      : "scale-100"
                  }`}
                />
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${on ? "opacity-0" : "opacity-100"}`} />
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

                {/* corner brackets */}
                {[
                  "left-4 top-3 border-l-2 border-t-2",
                  "right-3 top-3 border-r-2 border-t-2",
                  "left-3 bottom-3 border-l-2 border-b-2",
                  "right-3 bottom-3 border-r-2 border-b-2",
                ].map((c) => (
                  <span
                    key={c}
                    className={`pointer-events-none absolute h-7 w-7 border-[rgb(var(--ac))] transition-opacity duration-500 ${c} ${
                      on ? "opacity-100 delay-300" : "opacity-0"
                    }`}
                  />
                ))}

                {/* badge */}
                <span
                  className={`absolute left-3 top-5 rounded-sm bg-[rgb(var(--ac))] px-2 py-1 text-[8px] font-bold tracking-[0.08em] text-[rgb(var(--on))] transition-[transform,opacity] duration-300 sm:left-6 sm:px-3 sm:text-[10px] ${
                    on
                      ? "translate-y-0 opacity-100 delay-300"
                      : "-translate-y-1 opacity-0"
                  }`}
                >
                  P1 SELECTED
                </span>

                {/* index number */}
                <span
                  className={`display absolute right-3 top-5 text-xl font-extrabold text-white transition-opacity duration-300 sm:right-6 sm:text-3xl ${
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
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
                  <h3
                    className={`display break-words text-sm font-bold uppercase leading-tight text-white transition-opacity sm:text-lg lg:text-2xl ${
                      on
                        ? "opacity-100 delay-300 duration-500"
                        : "opacity-100 duration-300 lg:opacity-0 lg:duration-200"
                    }`}
                  >
                    {g.title}
                  </h3>

                  <div
                    className={`mt-3 transition-[transform,opacity] duration-300 ${
                      on
                        ? "translate-y-0 opacity-100 delay-500"
                        : "hidden translate-y-2 opacity-0 lg:block"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-neutral-300">
                        FRAMES
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                        {on && (
                          <div
                            key={`bar-${i}`}
                            className="dp-bar h-full rounded-full bg-gradient-to-r from-[rgb(var(--ac))] to-fuchsia-400"
                            style={{ width: `${pct}%` }}
                          />
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#C084FC]">
                        {frames}
                      </span>
                    </div>
                    <p className="mt-3 text-[9px] font-semibold tracking-[0.08em] text-white sm:text-xs sm:tracking-[0.18em]">
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
  );
}
