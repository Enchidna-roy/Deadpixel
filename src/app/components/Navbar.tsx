"use client";

import { useEffect, useState } from "react";
import { NAV } from "../data";
import { go } from "../lib/scroll";

type Props = { isDark: boolean; onToggleTheme: () => void };

export default function Navbar({ isDark, onToggleTheme }: Props) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (id: string) => {
    setMenu(false);
    go(id);
  };

  return (
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

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
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
            onClick={onToggleTheme}
            aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
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
            className="hidden rounded-full border border-[rgb(var(--ac))] px-5 py-2 text-xs font-semibold tracking-[0.16em] text-[rgb(var(--ac))] transition hover:bg-[rgb(var(--ac))] hover:text-[rgb(var(--on))] hover:shadow-[0_0_24px_rgb(var(--ac)/0.45)] sm:block"
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
  );
}
