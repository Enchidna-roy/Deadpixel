/* Semua data konten ada di sini. Ganti foto / teks cukup di file ini. */

export const NAV = [
  { label: "HOME", id: "home" },
  { label: "GEAR", id: "gear" },
  { label: "GALLERIES", id: "galleries" },
  { label: "SELECTED WORKS", id: "works" },
  { label: "CONTACT", id: "contact" },
];

export const SLIDES = [
  { src: "/images/Urban/01.webp", caption: "Street & Nature" },
  { src: "/images/Potraits/06.jpg", caption: "Portraits in Perspective" },
  {
    src: "/images/Graduation/32.jpg",
    caption: "A Moment to Remember",
  },
  { src: "/images/Event/01.webp", caption: "Moments in Motion" },
];

export const HIGHLIGHTS = [
  { title: "Street & Urban", text: "Night streets, neon and human moments." },
  { title: "Portrait & Editorial", text: "Honest faces, cinematic light." },
  { title: "Landscape & Nature", text: "Quiet horizons and raw terrain." },
];

export const PROFILE = {
  label: "BEHIND THE LENS",
  name: "Enchidna",
  role: "Photographer & visual storyteller",
  bio: "21 year old photographer and videographer 🎥 based in Magelang, ID documenting life, places, and moments through my lens.",
  photo: {
    src: "/images/Profile/1000117154.jpg",
    alt: "Foto profil",
    position: "center",
  },
  contact: {
    label: "Let's create something",
    href: "mailto:wildanroikhan11205@gmail.com",
  },
};

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

// Grup foto - digunakan oleh galeri yang dikelompokkan (misal Graduation)
export type PhotoGroup = {
  name: string; // Nama klien / orang
  photos: string[]; // Path foto dalam grup ini
};

// title   -> judul kartu di "Select Gallery"
// heading -> judul besar di modal (gaya slide PDF)
// quote   -> kutipan di bawah heading
// src     -> foto cover kartu
// photos  -> isi modal flat (untuk lightbox navigation)
// groups  -> (opsional) pengelompokan per orang, untuk tampilan section di modal
export const GALLERIES = [
  {
    title: "PORTRAITS",
    heading: "Portraits in Perspective",
    quote:
      "A collection of portraits exploring expression, character, and the quiet details that make every subject distinct.",
    count: "21 frames",
    src: "/images/Potraits/01.webp",
    photos: [
      "/images/Potraits/01.webp",
      "/images/Potraits/02.jpg",
      "/images/Potraits/03.jpg",
      "/images/Potraits/04.jpg",
      "/images/Potraits/05.jpg",
      "/images/Potraits/06.jpg",
      "/images/Potraits/07.jpg",
      "/images/Potraits/08.jpg",
      "/images/Potraits/09.jpg",
      "/images/Potraits/10.jpg",
      "/images/Potraits/11.jpg",
      "/images/Potraits/12.jpg",
      "/images/Potraits/13.jpg",
      "/images/Potraits/14.jpg",
      "/images/Potraits/15.jpg",
      "/images/Potraits/16.jpg",
      "/images/Potraits/17.jpg",
      "/images/Potraits/18.jpg",
      "/images/Potraits/19.jpg",
      "/images/Potraits/20.jpg",
      "/images/Potraits/21.jpg",
    ],
  },
  {
    title: "Events",
    heading: "Moments in Motion",
    quote:
      "Capturing the energy, movement, and fleeting moments that bring every event to life.",
    count: "11 frames",
    src: "/images/Event/01.webp",
    photos: [
      "/images/Event/01.webp",
      "/images/Event/02.jpg",
      "/images/Event/03.jpg",
      "/images/Event/04.jpg",
      "/images/Event/05.jpg",
      "/images/Event/06.jpg",
      "/images/Event/07.jpg",
      "/images/Event/08.jpg",
      "/images/Event/09.png",
      "/images/Event/10.jpg",
      "/images/Event/11.jpg",
    ],
  },
  {
    title: "Street & Nature",
    heading: "Street Photography",
    quote:
      "Capturing the essence of urban life, from bustling streets to quiet corners, highlighting the interplay of light and shadow.",
    count: "13 frames",
    src: "/images/Urban/01.webp",
    photos: [
      "/images/Urban/01.webp",
      "/images/Urban/02.jpg",
      "/images/Urban/03.jpg",
      "/images/Urban/04.jpg",
      "/images/Urban/05.jpg",
      "/images/Urban/06.jpg",
      "/images/Urban/07.jpg",
      "/images/Urban/08.jpg",
      "/images/Urban/09.jpg",
      "/images/Urban/10.jpg",
      "/images/Urban/11.jpg",
      "/images/Urban/12.jpg",
      "/images/Urban/13.jpg",
    ],
  },
  {
    title: "GRADUATION",
    heading: "A Moment to Remember",
    quote:
      "Celebrating a milestone through the people, emotions, and moments that made the day unforgettable.",
    count: "32 frames",
    src: "/images/Graduation/01.webp",
    groups: [
      {
        name: "Sheva",
        photos: [
          "/images/Graduation/01.webp",
          "/images/Graduation/02.jpg",
          "/images/Graduation/03.jpg",
          "/images/Graduation/04.jpg",
          "/images/Graduation/05.jpg",
          "/images/Graduation/06.jpg",
          "/images/Graduation/07.jpg",
          "/images/Graduation/08.jpg",
          "/images/Graduation/09.jpg",
          "/images/Graduation/10.jpg",
          "/images/Graduation/11.jpg",
          "/images/Graduation/12.jpg",
          "/images/Graduation/13.jpg",
        ],
      },
      {
        name: "Franciska",
        photos: [
          "/images/Graduation/14.jpg",
          "/images/Graduation/15.jpg",
          "/images/Graduation/16.jpg",
          "/images/Graduation/17.jpg",
          "/images/Graduation/18.jpg",
          "/images/Graduation/19.jpg",
          "/images/Graduation/20.jpg",
        ],
      },
      {
        name: "Pipit",
        photos: [
          "/images/Graduation/21.jpg",
          "/images/Graduation/22.jpg",
          "/images/Graduation/23.jpg",
          "/images/Graduation/24.jpg",
          "/images/Graduation/25.jpg",
          "/images/Graduation/26.jpg",
          "/images/Graduation/27.jpg",
          "/images/Graduation/28.jpg",
          "/images/Graduation/29.jpg",
          "/images/Graduation/30.jpg",
          "/images/Graduation/31.jpg",
          "/images/Graduation/32.jpg",
        ],
      },
    ],
    photos: [
      "/images/Graduation/01.webp",
      "/images/Graduation/02.jpg",
      "/images/Graduation/03.jpg",
      "/images/Graduation/04.jpg",
      "/images/Graduation/05.jpg",
      "/images/Graduation/06.jpg",
      "/images/Graduation/07.jpg",
      "/images/Graduation/08.jpg",
      "/images/Graduation/09.jpg",
      "/images/Graduation/10.jpg",
      "/images/Graduation/11.jpg",
      "/images/Graduation/12.jpg",
      "/images/Graduation/13.jpg",
      "/images/Graduation/14.jpg",
      "/images/Graduation/15.jpg",
      "/images/Graduation/16.jpg",
      "/images/Graduation/17.jpg",
      "/images/Graduation/18.jpg",
      "/images/Graduation/19.jpg",
      "/images/Graduation/20.jpg",
      "/images/Graduation/21.jpg",
      "/images/Graduation/22.jpg",
      "/images/Graduation/23.jpg",
      "/images/Graduation/24.jpg",
      "/images/Graduation/25.jpg",
      "/images/Graduation/26.jpg",
      "/images/Graduation/27.jpg",
      "/images/Graduation/28.jpg",
      "/images/Graduation/29.jpg",
      "/images/Graduation/30.jpg",
      "/images/Graduation/31.jpg",
      "/images/Graduation/32.jpg",
    ],
  },
];

export type Gallery = (typeof GALLERIES)[number] & { groups?: PhotoGroup[] };

export const WORKS = [
  { src: "/images/Graduation/31.jpg", meta: "Selected work 01" },
  { src: "/images/Graduation/08.jpg", meta: "Selected work 02" },
  { src: "/images/Urban/07.jpg", meta: "Street & Nature" },
  { src: "/images/Potraits/1.jpg", meta: "Portraits in Perspective" },
  { src: "/images/Urban/13.jpg", meta: "Moments in Motion" },
  { src: "/images/Graduation/25.jpg", meta: "A Moment to Remember" },
];

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/deadpixeell?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  },
  { label: "Email", href: "mailto:hello@deadpixel.id" },
];
