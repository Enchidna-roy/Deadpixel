import { PROFILE } from "../data";
import { photos } from "../lib/images";
import Photo from "./Photo";

export default function Profile() {
  const hasPortrait = Boolean(photos[PROFILE.photo.src]);

  return (
    <section id="profile" aria-labelledby="profile-name" className="px-5 pt-16 md:px-8 md:pt-24">
      <div className="relative mx-auto grid max-w-7xl gap-8 rounded-3xl border border-[rgb(var(--fg)/0.1)] bg-[rgb(var(--bg2))] p-6 sm:p-8 md:grid-cols-[14rem_minmax(0,1fr)] md:items-center md:gap-12 lg:p-12">
        <div className="mx-auto w-full max-w-56 md:mx-0">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[rgb(var(--fg)/0.1)] bg-[rgb(var(--bg))]">
            {hasPortrait ? (
              <Photo
                src={PROFILE.photo.src}
                alt={PROFILE.photo.alt}
                fill
                sizes="224px"
                className="object-cover"
                style={{ objectPosition: PROFILE.photo.position }}
              />
            ) : (
              <div role="img" aria-label="Placeholder foto profil" className="flex h-full items-center justify-center text-[rgb(var(--ac)/0.3)]">
                <svg viewBox="0 0 160 160" fill="none" className="h-40 w-40" aria-hidden="true">
                  <circle cx="80" cy="59" r="25" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M29 139v-10a51 51 0 0 1 102 0v10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M18 39V18h21M121 18h21v21M142 121v21h-21M39 142H18v-21" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <p className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.25em] text-[rgb(var(--ac))]">
            <span className="h-px w-8 shrink-0 bg-current" aria-hidden="true" />
            {PROFILE.label}
          </p>
          <h2 id="profile-name" className="display mt-4 break-words text-3xl font-extrabold leading-tight text-[rgb(var(--fg))] sm:text-4xl lg:text-5xl">
            {PROFILE.name}
          </h2>
          <p className="mt-2 text-sm text-[rgb(var(--mu))]">{PROFILE.role}</p>
          <p className="mt-6 max-w-xl whitespace-pre-line text-sm leading-7 text-[rgb(var(--tx))] sm:text-base">
            {PROFILE.bio}
          </p>
          <a
            href={PROFILE.contact.href}
            className="group mt-7 inline-flex min-h-11 max-w-full items-center gap-3 text-sm font-semibold text-[rgb(var(--ac))] transition-colors hover:text-[rgb(var(--fg))]"
          >
            <span>{PROFILE.contact.label}</span>
            <span aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
