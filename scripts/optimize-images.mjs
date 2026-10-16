import { createHash } from "node:crypto";
import { readdir, readFile, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const output = path.join(root, "public/images/optimized");
const widths = [320, 640, 960, 1920];
const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;
await mkdir(output, { recursive: true });

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "optimized") await scan(file);
      continue;
    }
    if (!/\.(jpe?g|png|webp)$/i.test(entry.name)) continue;
    const input = await readFile(file);
    originalBytes += input.length;
    const hash = createHash("sha256").update(input).update("webp-75-v1").digest("hex").slice(0, 16);
    const image = sharp(input).rotate();
    const metadata = await image.metadata();
    const swapped = [5, 6, 7, 8].includes(metadata.orientation);
    const width = swapped ? metadata.height : metadata.width;
    const height = swapped ? metadata.width : metadata.height;
    const variants = {};
    for (const size of widths) {
      const name = `${hash}-${size}.webp`;
      const target = path.join(output, name);
      try { await stat(target); } catch {
        await image.clone().resize({ width: size, withoutEnlargement: true }).webp({ quality: 75, effort: 4 }).toFile(target);
      }
      optimizedBytes += (await stat(target)).size;
      variants[size] = `/images/optimized/${name}`;
    }
    const preview = await image.clone().resize({ width: 16 }).webp({ quality: 35 }).toBuffer();
    const source = `/${path.relative(path.join(root, "public"), file).split(path.sep).join("/")}`;
    manifest[source] = { width, height, blurDataURL: `data:image/webp;base64,${preview.toString("base64")}`, variants };
  }
}

await scan(path.join(root, "public/images"));
await mkdir(path.join(root, "src/app/generated"), { recursive: true });
await writeFile(path.join(root, "src/app/generated/images.json"), JSON.stringify(manifest));
console.log(`${Object.keys(manifest).length} photos: ${(originalBytes / 1e6).toFixed(1)} MB originals; ${(optimizedBytes / 1e6).toFixed(1)} MB across all four responsive sizes.`);
