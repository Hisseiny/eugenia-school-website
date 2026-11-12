// Isolated built-component smoke test; not a full-page Lighthouse/CLS measurement.
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const built = readFileSync("dist/carrieres.html", "utf8");
const section = built.match(/<section class="container dest"[\s\S]*?<\/section>/)[0];
const styles = [...built.matchAll(/<link[^>]*stylesheet[^>]*>|<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0]).join("");
const scripts = [...built.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].filter((m) => m[1].includes("data-logo-flow")).map((m) => m[0]).join("");
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">${styles}<script>document.documentElement.classList.add("js");</script></head><body>${section}${scripts}</body></html>`;
const output = process.env.PREVIEW_OUTPUT || "../attached_assets/scrolling-grid";
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH,
  args: ["--no-sandbox", "--disable-gpu"],
  ...(process.env.PREVIEW_LIBS ? { env: { ...process.env, LD_LIBRARY_PATH: process.env.PREVIEW_LIBS, LD_PRELOAD: "" } } : {}),
});
async function routes(page) {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === "/") return route.fulfill({ contentType: "text/html", body: html });
    try { await route.fulfill({ path: resolve("dist", `.${url.pathname}`) }); }
    catch { await route.abort(); }
  });
}
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await routes(page);
  await page.goto("http://preview.local/", { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.locator("img").evaluateAll((images) => Promise.all(images.map((img) => img.decode().catch(() => {}))));
  const root = page.locator("[data-logo-flow]");
  const transform = () => page.locator(".logo-flow__track").first().evaluate((el) => getComputedStyle(el).transform);
  await page.mouse.move(1439, 999);
  await page.waitForTimeout(300);
  const before = await transform();
  await page.waitForTimeout(300);
  assert.notEqual(await transform(), before, "grid moves continuously");
  await root.hover();
  const hovered = await transform();
  await page.waitForTimeout(250);
  assert.equal(await transform(), hovered, "hover pauses movement");
  await root.locator("button").click();
  await page.locator("h2").click();
  await page.mouse.move(1439, 999);
  assert.equal(await root.locator("button").getAttribute("aria-pressed"), "true");
  const paused = await transform();
  await page.waitForTimeout(250);
  assert.equal(await transform(), paused, "manual pause persists after focus/hover leave");
  await root.locator("button").click();
  await page.locator("h2").click();
  await page.mouse.move(1439, 999);
  await page.locator(".dest").screenshot({ path: `${output}/desktop.png` });
  const frameCount = Number(process.env.SCROLL_FRAMES || 0);
  for (let i = 0; i < frameCount; i++) {
    await root.screenshot({ path: `${output}/frame-${String(i).padStart(3, "0")}.png` });
    await page.waitForTimeout(125);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "no mobile horizontal overflow");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.locator(".logo-flow__motion").isVisible(), false);
  assert.equal(await page.locator(".logo-flow__static li").count(), 36);
  assert.equal(await page.locator(".logo-flow__static").isVisible(), true);
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await routes(noJS);
  await noJS.goto("http://preview.local/", { waitUntil: "domcontentloaded" });
  assert.equal(await noJS.locator(".logo-flow__motion").isVisible(), false);
  assert.equal(await noJS.locator(".logo-flow__static li").count(), 36);
  console.log("PASS: continuous movement, hover/manual pause, mobile width, reduced motion, no-JS full list.");
} finally { await browser.close(); }
