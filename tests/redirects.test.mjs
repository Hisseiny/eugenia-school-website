import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("public/_redirects and astro.config.ts redirects have identical sets", () => {
  const publicRedirects = readFileSync("public/_redirects", "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [source, target, status] = line.split(/\s+/);
      return `${source} ${target} ${status}`;
    });
  const config = readFileSync("astro.config.ts", "utf8");
  const block = config.match(/const redirects = \{([\s\S]*?)\} as const/);

  assert.ok(block, "redirect map not found in astro.config.ts");
  const astroRedirects = [
    ...block[1].matchAll(/^\s*"([^"]+)"\s*:\s*"([^"]+)",?\s*$/gm),
  ].map(([, source, target]) => `${source} ${target} 301`);

  assert.deepEqual(new Set(publicRedirects), new Set(astroRedirects));
  assert.equal(publicRedirects.length, astroRedirects.length);
});
