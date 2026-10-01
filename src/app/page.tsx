"use client";

import { useEffect, useRef, useState } from "react";
import { GALLERIES } from "./data";
import ThemeStyles from "./components/ThemeStyles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import GearGrid from "./components/GearGrid";
import GallerySelect from "./components/GallerySelect";
import Works from "./components/Works";
import Footer from "./components/Footer";
import GalleryModal from "./components/GalleryModal";
import Lightbox from "./components/Lightbox";

/* ------------------------------------------------------------------
   DEADPIXEL — photography portfolio
   page.tsx hanya merakit komponen + menyimpan state yang dipakai
   bersama: tema, galeri yang terbuka, dan lightbox.
   Data/konten: app/data.ts   |   Komponen: app/components/
------------------------------------------------------------------- */

type Theme = "dark" | "light";
const THEME_KEY = "dp-theme";

export default function Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [openGallery, setOpenGallery] = useState<number | null>(null);
  const [modalShow, setModalShow] = useState(false); // drives the open/close animation
  const [origin, setOrigin] = useState({ x: 50, y: 50 }); // reveal origin (%)
  const [lb, setLb] = useState<number | null>(null); // index foto di lightbox
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tema: ambil pilihan tersimpan, kalau belum ada ikuti pengaturan sistem
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
        return;
      }
    } catch {}
    if (window.matchMedia("(prefers-color-scheme: light)").matches)
      setTheme("light");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openG = (i: number, el: HTMLElement) => {
    clearCloseTimer(); // batalkan penutupan yang masih tertunda
    const r = el.getBoundingClientRect();
    setOrigin({
      x: ((r.left + r.width / 2) / window.innerWidth) * 100,
      y: ((r.top + r.height / 2) / window.innerHeight) * 100,
    });
    setOpenGallery(i);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setModalShow(true)),
    );
  };

  const closeG = () => {
    clearCloseTimer(); // cegah timer dobel (mis. Esc lalu klik cepat)
    setLb(null);
    setModalShow(false);
    closeTimer.current = setTimeout(() => {
      setOpenGallery(null);
      closeTimer.current = null;
    }, 650); // tunggu animasi tutup
  };

  // Gallery modal + lightbox: keyboard + lock page scroll
  useEffect(() => {
    if (openGallery === null) return;
    const n = GALLERIES[openGallery].photos.length;
    const onKey = (e: KeyboardEvent) => {
      if (lb !== null) {
        if (e.key === "Escape") setLb(null);
        else if (e.key === "ArrowRight") setLb((lb + 1) % n);
        else if (e.key === "ArrowLeft") setLb((lb - 1 + n) % n);
        return;
      }
      if (e.key === "Escape") closeG();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openGallery, lb]);

  // Preload foto sebelah supaya pindah foto tidak berkedip
  useEffect(() => {
    if (openGallery === null || lb === null) return;
    const ph = GALLERIES[openGallery].photos;
    [1, -1].forEach((d) => {
      const im = new Image();
      im.src = ph[(lb + d + ph.length) % ph.length];
    });
  }, [openGallery, lb]);

  const active = openGallery !== null ? GALLERIES[openGallery] : null;

  return (
    <main
      data-theme={theme}
      className="dp min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--tx))] antialiased transition-colors duration-300"
    >
      <ThemeStyles />

      <Navbar isDark={theme === "dark"} onToggleTheme={toggleTheme} />
      <Hero />
      <About />
      <GearGrid />
      <GallerySelect onOpen={openG} />
      <Works />
      <Footer />

      {active && (
        <GalleryModal
          gallery={active}
          show={modalShow}
          origin={origin}
          onClose={closeG}
          onPhoto={setLb}
        />
      )}

      {active && lb !== null && (
        <Lightbox
          gallery={active}
          index={lb}
          onClose={() => setLb(null)}
          onStep={(d) => {
            const n = active.photos.length;
            setLb((lb + d + n) % n);
          }}
        />
      )}
    </main>
  );
}
