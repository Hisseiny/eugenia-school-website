// Full-page screenshots of every page at the widths the brief asks for.
// Usage: node scripts/screenshot.mjs [baseUrl] [widths...]   e.g. node scripts/screenshot.mjs http://127.0.0.1:4321 1440 375
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:4321";
const widths = process.argv.slice(3).map(Number).filter(Boolean);
const sizes = widths.length ? widths : [1440, 375];
const only = process.env.PAGES?.split(",");
const pages = only ?? ["index", "programmes", "carrieres", "ecole", "admissions", "entreprises"];
const exe = process.env.CHROME_PATH ?? "/home/ubuntu/.local/bin/google-chrome";

const dir = process.env.OUT_DIR ?? "screenshots";
mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ executablePath: exe, headless: true });
for (const width of sizes) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.route("**/*googletagmanager.com/**", (route) => route.abort());
  await page.route("**/connect.facebook.net/**", (route) => route.abort());
  for (const entry of pages) {
    // "name" or "name=/path" (the second form is used for the live site's old URLs)
    const [name, custom] = entry.split("=");
    const path = custom ?? (name === "index" ? "/" : `/${name}`);
    await page.goto(base + path, { waitUntil: "load", timeout: 60000 });
    await page.evaluate(async () => {
      // Force lazy images to load before the capture.
      for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      await Promise.race([
        Promise.all(Array.from(document.images).filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
        new Promise((r) => setTimeout(r, 8000)),
      ]);
    });
    await page.waitForTimeout(300);
    const file = `${dir}/${name}_${width}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
  }
  await ctx.close();
}
await browser.close();
