import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*.webp",
  { eager: true },
);

const byName: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split("/").pop()!.replace(/\.webp$/, "");
  byName[name] = mod.default;
}

/** Returns the mockup image by file name (without extension). Fails at build time if missing. */
export function img(name: string): ImageMetadata {
  const found = byName[name];
  if (!found) throw new Error(`Unknown image: ${name}`);
  return found;
}
