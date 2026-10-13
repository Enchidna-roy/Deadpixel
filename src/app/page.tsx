"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
import { imageLoader } from "./lib/images";
import { readTheme, serverTheme, subscribeTheme, toggleTheme } from "./lib/theme";

/* ------------------------------------------------------------------
   DEADPIXEL — photography portfolio
   page.tsx hanya merakit komponen + menyimpan state yang dipakai
   bersama: tema, galeri yang terbuka, dan lightbox.
   Data/konten: app/data.ts   |   Komponen: app/components/
------------------------------------------------------------------- */

export default function Page() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
  const [openGallery, setOpenGallery] = useState<number | null>(null);
  const [modalShow, setModalShow] = useState(false); // drives the open/close animation
  const [lb, setLb] = useState<number | null>(null); // index foto di lightbox
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openG = (i: number) => {
    clearCloseTimer(); // batalkan penutupan yang masih tertunda
    setOpenGallery(i);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setModalShow(true)),
    );
  };

  const closeG = useCallback(() => {
    clearCloseTimer(); // cegah timer dobel (mis. Esc lalu klik cepat)
    setLb(null);
    setModalShow(false);
    closeTimer.current = setTimeout(() => {
      setOpenGallery(null);
      closeTimer.current = null;
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300);
  }, [clearCloseTimer]);

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openGallery, lb, closeG]);

  // Preload foto sebelah supaya pindah foto tidak berkedip
  useEffect(() => {
    if (openGallery === null || lb === null) return;
    const ph = GALLERIES[openGallery].photos;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "")) return;
    // Give the current photo a head start; warm only one optimized neighbour.
    const timer = setTimeout(() => {
      const im = new Image();
      im.decoding = "async";
      im.fetchPriority = "low";
      im.sizes = "(max-width: 767px) 100vw, 80vw";
      const src = ph[(lb + 1) % ph.length];
      im.srcset = [320, 640, 960, 1920].map((width) => `${imageLoader({ src, width })} ${width}w`).join(", ");
      im.src = imageLoader({ src, width: 960 });
    }, 800);
    return () => clearTimeout(timer);
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
