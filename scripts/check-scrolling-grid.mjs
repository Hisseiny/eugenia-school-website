// Full 60-second built-component browser check; not a full-page Lighthouse measurement.
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const built = readFileSync("dist/carrieres.html", "utf8");
const section = built.match(/<section class="container dest"[\s\S]*?<\/section>/)[0];
const styles = [...built.matchAll(/<link[^>]*stylesheet[^>]*>|<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0]).join("");
const scripts = [...built.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].filter((m) => {
  if (m[1].includes("data-logo-flow")) return true;
  const src = m[0].match(/src="([^"]+)"/)?.[1];
  return src && readFileSync(resolve("dist", `.${src}`), "utf8").includes("data-logo-flow");
}).map((m) => m[0]).join("");
assert.ok(scripts, "controller included in isolated fixture");
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">${styles}<script>document.documentElement.classList.add("js");</script></head><body>${section}${scripts}</body></html>`;
const output = process.env.PREVIEW_OUTPUT || "../attached_assets/logo-wall";
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
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await routes(page);
  await page.goto("http://preview.local/", { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.locator("img").evaluateAll((images) => Promise.all(images.map((img) => img.decode().catch(() => {}))));
  const root = page.locator("[data-logo-flow]");
  await page.mouse.move(1439, 999);
  // Observe every rendered frame, including outgoing + incoming layers during replacement.
  await page.evaluate(() => {
    const wall = document.querySelector(".logo-flow__motion");
    const cells = [...wall.children].filter((cell) => !cell.hidden);
    const geometry = () => [wall, ...cells].map((cell) => {
      const { x, y, width, height } = cell.getBoundingClientRect(); return [x,y,width,height];
    });
    const initial = JSON.stringify(geometry());
    const report = { maxChanging: 0, duplicate: false, shifted: false, cls: 0, slots: [], seen: [], samples: 0 };
    const shifts = new PerformanceObserver((entries) => {
      for (const entry of entries.getEntries()) if (!entry.hadRecentInput) report.cls += entry.value;
    });
    shifts.observe({ type: "layout-shift", buffered: false });
    const seen = new Set();
    let lastActive = null;
    const start = performance.now();
    window.wallDone = new Promise((resolve) => {
      const sample = () => {
        const changing = cells.filter((cell) => cell.classList.contains("is-changing"));
        report.maxChanging = Math.max(report.maxChanging, changing.length);
        if (changing[0] && changing[0] !== lastActive) report.slots.push(Number(changing[0].dataset.slot));
        lastActive = changing[0] || null;
        const visible = cells.flatMap((cell) => [...cell.children].filter((layer) => Number(getComputedStyle(layer).opacity) > .01));
        const names = visible.map((layer) => Number(layer.dataset.logoIndex));
        names.forEach((name) => seen.add(name));
        if (new Set(names).size !== names.length) report.duplicate = true;
        if (JSON.stringify(geometry()) !== initial) report.shifted = true;
        report.samples++;
        if (performance.now() - start < 60000) requestAnimationFrame(sample);
        else { shifts.disconnect(); report.seen = [...seen]; resolve(report); }
      };
      requestAnimationFrame(sample);
    });
  });
  // 90 browser captures at 6 fps => 15-second preview, without video-recorder overhead.
  if (process.env.CAPTURE_VIDEO === "1") {
    const start = Date.now();
    for (let i = 0; i < 90; i++) {
      await page.waitForTimeout(Math.max(0, start + i * 1000 / 6 - Date.now()));
      await root.screenshot({ path: `${output}/frame-${String(i).padStart(3, "0")}.png` });
    }
  }
  const report = await page.evaluate(() => window.wallDone);
  assert.deepEqual(errors, [], "no controller errors");
  console.log(JSON.stringify({ ...report, seen: report.seen.length, slots: report.slots.length }));
  assert.equal(report.maxChanging, 1);
  assert.equal(report.duplicate, false);
  assert.equal(report.shifted, false);
  assert.equal(report.cls, 0, "no layout shift while the isolated component animates");
  assert.ok(report.seen.length >= 30, `${report.seen.length} logos seen`);
  for (let i = 1; i < report.slots.length; i++) {
    const a = report.slots[i], b = report.slots[i - 1];
    assert.ok(!report.slots.slice(Math.max(0, i - 3), i).includes(a));
    assert.notEqual(Math.abs(Math.floor(a / 6) - Math.floor(b / 6)) + Math.abs(a % 6 - b % 6), 1);
  }
  const snapshot = () => root.locator(".logo-flow__motion").innerHTML();
  const cell = root.locator(".logo-flow__cell").first();
  await cell.hover();
  await page.waitForFunction(() => {
    const cell = document.querySelector(".logo-flow__cell");
    return cell.matches(":hover") && getComputedStyle(cell.querySelector("img")).filter === "none";
  }, undefined, { timeout: 3000 });
  assert.equal(await cell.locator("img").first().evaluate((img) => getComputedStyle(img).filter), "none");
  const hovered = await snapshot(); await page.waitForTimeout(1800);
  assert.equal(await snapshot(), hovered);
  await root.locator("button").click();
  await page.locator("h2").click(); await page.mouse.move(1439, 999);
  const paused = await snapshot(); await page.waitForTimeout(1800);
  assert.equal(await snapshot(), paused);
  assert.equal(await root.locator("button").getAttribute("aria-pressed"), "true");
  for (const [width, count] of [[800,9],[390,6],[1440,12]]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForTimeout(150);
    assert.equal(await root.locator(".logo-flow__cell:visible").count(), count);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(Number(await root.locator("[data-remaining]").textContent()), 36 - count);
  }
  await root.locator("[data-show-all]").click();
  assert.equal(await root.locator(".logo-flow__motion").isVisible(), false);
  assert.equal(await root.locator(".logo-flow__static li").count(), 36);
  await page.screenshot({ path: `${output}/all-companies.png`, fullPage: true });
  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await routes(reduced); await reduced.goto("http://preview.local/", { waitUntil: "domcontentloaded" });
  assert.equal(await reduced.locator(".logo-flow__motion").isVisible(), false);
  assert.equal(await reduced.locator(".logo-flow__static li .gray").count(), 36);
  const noJS = await browser.newPage({ javaScriptEnabled: false });
  await routes(noJS); await noJS.goto("http://preview.local/", { waitUntil: "domcontentloaded" });
  assert.equal(await noJS.locator(".logo-flow__motion").isVisible(), false);
  assert.equal(await noJS.locator(".logo-flow__static li .gray").count(), 36);
  writeFileSync(`${output}/checks.json`, JSON.stringify(report, null, 2));
  console.log("PASS: 60s uniqueness/coverage, one nonadjacent replacement, fixed geometry, gray/hover, pause, responsive counts, show all, reduced motion and no JS.");
} finally { await browser.close(); }
