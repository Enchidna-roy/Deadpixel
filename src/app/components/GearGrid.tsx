import { GEAR } from "../data";

export default function GearGrid() {
  return (
    <section id="gear" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
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

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {GEAR.map((gear) => (
            <article key={gear.name} className="group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-[#151517]">
                <img
                  src={gear.image}
                  alt={`${gear.brand} ${gear.name}`}
                  loading="lazy"
                  className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

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
  );
}
