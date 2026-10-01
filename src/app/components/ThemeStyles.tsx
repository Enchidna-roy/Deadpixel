/* Palet tema + font + animasi. Ubah warna di blok .dp saja. */
export default function ThemeStyles() {
  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500&family=Montserrat:wght@500;700;800&display=swap');
        html { scroll-behavior: smooth; }

        .dp {
          --bg: 10 10 12;
          --bg2: 18 18 20;
          --fg: 255 255 255;
          --tx: 212 212 212;
          --mu: 163 163 163;
          --dm: 115 115 115;
          --ac: 168 85 247;
          --on: 10 10 12;
          color-scheme: dark;
        }
        .dp[data-theme="light"] {
          --bg: 244 244 244;
          --bg2: 233 233 236;
          --fg: 17 17 17;
          --tx: 64 64 64;
          --mu: 82 82 82;
          --dm: 115 115 115;
          --ac: 147 51 234;
          --on: 255 255 255;
          color-scheme: light;
        }

        .dp { font-family: 'Inter', system-ui, sans-serif; }
        .dp .display { font-family: 'Syne', 'Inter', sans-serif; letter-spacing: -0.02em; }
        .dp .mont { font-family: 'Montserrat', 'Inter', sans-serif; letter-spacing: -0.04em; line-height: .95; }
        .dp :focus-visible { outline: 2px solid rgb(var(--ac)); outline-offset: 3px; }
        @keyframes dp-in { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        .dp-in { animation: dp-in .9s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes dp-pulse { 0%,100% { opacity: 1; } 50% { opacity: .55; } }
        .dp-pulse { animation: dp-pulse 2.4s ease-in-out infinite; }
        @keyframes dp-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .dp-bar { transform-origin: left; animation: dp-bar .7s .15s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes dp-lb { from { opacity: 0; } to { opacity: 1; } }
        .dp-lb { animation: dp-lb .35s ease both; }
        @keyframes dp-lb-img { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: none; } }
        .dp-lb-img { animation: dp-lb-img .4s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .dp *, .dp *::before, .dp *::after { animation: none !important; transition: none !important; }
        }
      `}</style>
  );
}
