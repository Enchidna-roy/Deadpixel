import { SOCIALS } from "../data";

export default function Footer() {
  return (
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
  );
}
