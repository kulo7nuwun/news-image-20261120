// news-image-20261120 entry: writes the composed front page of
// Friday 20 November 2026's world news to /output/entry.png.
//
// The image (entry.png, next to this file) is the entry itself: a
// newspaper-style front page built for this competition, led by the
// Shenzhen joint declaration of Trump, Xi and Putin, with Cyclone
// Akvan, the Kyiv embassy strikes, Seoul, Fiji and Caracas below.
// The file is named entry.png and holds JPEG bytes, which the
// competition rules allow (a PNG or a JPEG, told apart by its first
// bytes). This program only copies it into the output directory, so
// both runs write byte-identical output.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");

if (!existsSync(source)) {
  throw new Error(`missing entry image: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "entry.png"));

// The gate caps the file at 1 MiB; fail loudly instead of shipping a
// truncated or oversized image.
const bytes = statSync(join(outDir, "entry.png")).size;
if (bytes > 1048576) {
  throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB gate`);
}
console.log(`wrote entry.png (${bytes} bytes) to ${outDir}`);
