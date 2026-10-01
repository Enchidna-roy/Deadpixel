/* Semua data konten ada di sini. Ganti foto / teks cukup di file ini. */

export const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Placeholder set of n photos for a gallery (varied heights for the collage look).
export const set = (seed: string, n: number) =>
  Array.from({ length: n }, (_, i) =>
    img(`${seed}-${i + 1}`, 900, i % 3 === 0 ? 1200 : 900),
  );

export const NAV = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "GEAR", id: "gear" },
  { label: "GALLERIES", id: "galleries" },
  { label: "SELECTED WORKS", id: "works" },
  { label: "CONTACT", id: "contact" },
];

export const SLIDES = [
  { src: img("deadpixel-hero-1", 2000, 1200), caption: "Neon rain, Magelang" },
  { src: img("deadpixel-hero-2", 2000, 1200), caption: "Golden hour portrait" },
  {
    src: img("deadpixel-hero-3", 2000, 1200),
    caption: "Volcanic ridge at dawn",
  },
  { src: img("deadpixel-hero-4", 2000, 1200), caption: "Concrete geometry" },
];

export const HIGHLIGHTS = [
  { title: "Street & Urban", text: "Night streets, neon and human moments." },
  { title: "Portrait & Editorial", text: "Honest faces, cinematic light." },
  { title: "Landscape & Nature", text: "Quiet horizons and raw terrain." },
];

export const GEAR = [
  { name: "Sony a6700", image: "/images/Gear/sony-a6700.jpg", brand: "Sony" },
  {
    name: "Tamron 17-70mm",
    image: "/images/Gear/tamron-17-70.jpg",
    brand: "Tamron",
  },
  {
    name: "Sony 50mm F1.4",
    image: "/images/Gear/sony-50mm.jpg",
    brand: "Sony",
  },
  {
    name: "Takara Rover 77",
    image: "/images/Gear/takara-rover-77.jpg",
    brand: "Takara",
  },
  {
    name: "Godox TT600",
    image: "/images/Gear/godox-TT600.jpg",
    brand: "Godox",
  },
  {
    name: "Godox VDS-M2",
    image: "/images/Gear/godox-vds-m2.jpg",
    brand: "Godox",
  },
];

// title   -> judul kartu di "Select Gallery"
// heading -> judul besar di modal (gaya slide PDF)
// quote   -> kutipan di bawah heading
// src     -> foto cover kartu
// photos  -> isi modal (ganti dengan foto asli, mis. ["/photos/portraits/01.jpg"])
export const GALLERIES = [
  {
    title: "PORTRAITS",
    heading: "Prita - Bridal Session",
    quote:
      "Kumpulan hasil jepretan dari sesi personal branding & bridal photoshoot, menonjolkan detail makeup, kain, dan pencahayaan natural.",
    count: "10 frames",
    src: "/images/Potraits/01.webp",
    photos: set("dp-portrait", 20),
  },
  {
    title: "LANDSCAPES",
    heading: "Visual Stories",
    quote:
      "Sebuah kumpulan karya fotografi yang menangkap keindahan alam, momen personal, dan cerita di balik setiap gambar.",
    count: "36 frames",
    src: "/images/Landscapes/01.webp",
    photos: set("dp-landscape", 20),
  },
  {
    title: "Street & Urban",
    heading: "Street Photography",
    quote:
      "Eksplorasi visual jalanan dan pesisir, menangkap kontras cahaya dan momen yang mudah terlewat oleh mata biasa.",
    count: "52 frames",
    src: "/images/Urban/01.webp",
    photos: set("dp-urban-photo", 20),
  },
  {
    title: "GRADUATION",
    heading: "A milestone worth remembering",
    quote:
      "Hari ini bukan hanya tentang kelulusan, tetapi tentang perjalanan, perjuangan, dan orang-orang yang selalu ada di belakangnya.",
    count: "29 frames",
    src: "/images/Graduation/01.webp",
    photos: set("dp-event", 20),
  },
];

export type Gallery = (typeof GALLERIES)[number];

// Pola ukuran kolase (berulang tiap 6 foto). Ubah sesuka hati.
export const COLLAGE = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
];

export const WORKS = [
  { src: img("dp-work-1", 700, 700), meta: "35mm | f/1.8 | 1/1000s | ISO 100" },
  { src: img("dp-work-2", 700, 700), meta: "50mm | f/1.4 | 1/500s | ISO 200" },
  { src: img("dp-work-3", 700, 700), meta: "24mm | f/8 | 1/250s | ISO 100" },
  { src: img("dp-work-4", 700, 700), meta: "85mm | f/2.0 | 1/640s | ISO 160" },
  { src: img("dp-work-5", 700, 700), meta: "28mm | f/2.8 | 1/60s | ISO 800" },
  { src: img("dp-work-6", 700, 700), meta: "70mm | f/4 | 1/800s | ISO 100" },
];

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/deadpixeell?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  },
  { label: "Behance", href: "https://behance.net" },
  { label: "500px", href: "https://500px.com" },
  { label: "Unsplash", href: "https://unsplash.com" },
  { label: "Email", href: "mailto:hello@deadpixel.id" },
];
