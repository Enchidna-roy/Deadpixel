export type Theme = "dark" | "light";
const THEME_KEY = "dp-theme";
let fallback: Theme | null = null;

export function readTheme(): Theme {
  if (fallback) return fallback;
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  window.addEventListener("storage", onChange);
  window.addEventListener("dp-theme-change", onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("dp-theme-change", onChange);
    media.removeEventListener("change", onChange);
  };
}

export const serverTheme = (): Theme => "dark";

export function toggleTheme() {
  const next = readTheme() === "dark" ? "light" : "dark";
  try { localStorage.setItem(THEME_KEY, next); } catch { fallback = next; }
  window.dispatchEvent(new Event("dp-theme-change"));
}
