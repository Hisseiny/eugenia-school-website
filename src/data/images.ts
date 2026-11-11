import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*.{avif,jpg,jpeg,png,webp}",
  { eager: true },
);
const svgModules = import.meta.glob<string>("/src/assets/images/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

const byName: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(modules)) {
  const file = path.split("/").pop()!;
  const name = file.slice(0, file.lastIndexOf("."));
  byName[name] = mod.default;
}

/** Returns the mockup image by file name (without extension). Fails at build time if missing. */
export function img(name: string): ImageMetadata {
  const found = byName[name];
  if (!found) throw new Error(`Unknown image: ${name}`);
  return found;
}

export function svg(name: string): string | undefined {
  return Object.entries(svgModules).find(([path]) => path.endsWith(`/${name}.svg`))?.[1];
}
