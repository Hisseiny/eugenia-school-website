import { existsSync, readFileSync } from "node:fs";

const liveUrls = readFileSync("scripts/live-urls.txt", "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);
const config = readFileSync("astro.config.ts", "utf8");
const block = config.match(/const redirects = \{([\s\S]*?)\} as const/);

if (!block) throw new Error("Could not find redirects in astro.config.ts");

const redirects = new Map(
  [...block[1].matchAll(/^\s*"([^"]+)"\s*:\s*"([^"]+)",?\s*$/gm)].map(([, source, target]) => [source, target]),
);
const groups = { OK: [], REDIRECT: [], MISSING: [] };

for (const path of liveUrls) {
  const source = path === "/" ? "/" : path.replace(/\/$/, "");
  const target = redirects.get(source);
  if (target) {
    groups.REDIRECT.push({ path, target, anchor: target.includes("#") });
    continue;
  }

  const fileBase = source === "/" ? "dist/index" : `dist${source}`;
  const htmlFile = [`${fileBase}.html`, `${fileBase}/index.html`].find((file) => existsSync(file));
  if (!htmlFile || /http-equiv="refresh"/i.test(readFileSync(htmlFile, "utf8"))) {
    groups.MISSING.push(path);
  } else {
    groups.OK.push(path);
  }
}

for (const [name, entries] of Object.entries(groups)) {
  console.log(`${name} (${entries.length})`);
  for (const entry of entries) {
    console.log(
      name === "REDIRECT"
        ? `  ${entry.path} → ${entry.target}${entry.anchor ? " (ANCHOR)" : ""}`
        : `  ${entry}`,
    );
  }
}
console.log(`Summary: OK ${groups.OK.length}, REDIRECT ${groups.REDIRECT.length}, MISSING ${groups.MISSING.length}`);

if (process.argv.includes("--strict") && groups.MISSING.length > 0) process.exitCode = 1;
