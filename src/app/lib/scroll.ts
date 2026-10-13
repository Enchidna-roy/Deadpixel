export const go = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
