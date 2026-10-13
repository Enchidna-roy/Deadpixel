Deadpixel photography portfolio, built with Next.js.

## Image loading

Original photos live in `public/images`. Run `npm run images:optimize` after adding or replacing photos. This also runs automatically before `npm run dev` and `npm run build`.

The script generates WebP versions at 320, 640, 960, and 1920 pixels in `public/images/optimized`, plus dimensions and tiny blur placeholders in `src/app/generated/images.json`. Keep these generated files with the source when deploying. Original files are preserved; the page uses responsive derivatives rather than downloading full camera files. The largest derivative is limited to 1920px wide.

`Photo` uses `next/image` with a static loader, responsive `sizes`, lazy loading, and reserved image dimensions. Content hashes in filenames allow a one-year immutable cache without serving an old image after its source changes. Hosting should preserve the cache headers configured in `next.config.ts`.

The slideshow prioritizes its first image and loads subsequent slides gradually. It pauses outside the viewport, in a hidden tab, with reduced motion, or when the browser reports data saving or a 2G connection. Lightbox prefetch fetches only the next responsive photo and skips data-saving/2G connections.

Fonts are served locally from `public/fonts`; their OFL licenses are included. Visitors do not need to contact Google Fonts.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font/local` for Inter, Syne, and Montserrat.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
