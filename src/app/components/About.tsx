export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-32"
    >
      <h2 className="display text-4xl font-extrabold uppercase leading-tight text-[rgb(var(--fg))] md:text-5xl">
        Light is the only <span className="text-[rgb(var(--ac))]">subject</span>
      </h2>
      <div className="space-y-5 text-base font-light leading-relaxed">
        <p>
          Deadpixel started with a single stuck pixel on a first camera and a
          decision to treat flaws as style. Today the work spans street,
          portrait, landscape and commercial projects across Indonesia and
          beyond.
        </p>
        <p>
          Every shoot is built around available light, a small kit and a lot of
          patience. The result is imagery that feels lived in, not staged.
        </p>
      </div>
    </section>
  );
}
