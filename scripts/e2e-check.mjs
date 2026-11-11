// Drives the three interactions in a real Chrome against a running server and reports pass/fail.
// Usage: node scripts/e2e-check.mjs [baseUrl]
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://127.0.0.1:4322";
const exe = process.env.CHROME_PATH ?? "/home/ubuntu/.local/bin/google-chrome";
const browser = await chromium.launch({ executablePath: exe, headless: true });
let failures = 0;
const check = (name, ok, extra = "") => {
  console.log(`${ok ? "PASS" : "FAIL"} ${name} ${extra}`);
  if (!ok) failures++;
};

// Carousel (desktop)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "load" });
  const visibleName = () => page.locator("[data-slide]:not([hidden]) .testi__name").innerText();
  check("carousel starts on Noah", (await visibleName()) === "Noah S.");
  await page.click("[data-next]");
  check("next shows Nina", (await visibleName()) === "Nina L.");
  await page.click("[data-prev]");
  await page.click("[data-prev]");
  check("prev wraps to Maxime", (await visibleName()) === "Maxime B.");
  await page.locator('[role="tab"]').nth(2).click();
  check("dot 3 shows Victor", (await visibleName()) === "Victor P.");
  await page.locator('[role="tab"][aria-selected="true"]').focus();
  await page.keyboard.press("ArrowRight");
  check("keyboard arrow shows Ian", (await visibleName()) === "Ian L.");
  const selected = await page.locator('[role="tab"][aria-selected="true"]').count();
  check("exactly one selected dot", selected === 1);
  await page.waitForTimeout(400); // let the 0.3 s width transition finish
  const activeWidth = await page.locator('[role="tab"][aria-selected="true"]').evaluate((el) => getComputedStyle(el).width);
  check("active dot is 32px", activeWidth === "32px", activeWidth);
  const stickyHeader = await page.locator("header").evaluate((el) => getComputedStyle(el).position);
  check("header is sticky", stickyHeader === "sticky");
  await page.close();
}

// Accordion (admissions)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/admissions", { waitUntil: "load" });
  const buttons = page.locator("[data-accordion] button");
  check("first question open", (await buttons.nth(0).getAttribute("aria-expanded")) === "true");
  check("second answer hidden", await page.locator("#faq-a-1").isHidden());
  await buttons.nth(1).click();
  check("second opens", (await buttons.nth(1).getAttribute("aria-expanded")) === "true");
  check("first closes (one at a time)", (await buttons.nth(0).getAttribute("aria-expanded")) === "false");
  await buttons.nth(1).click();
  check("clicking again closes it", (await buttons.nth(1).getAttribute("aria-expanded")) === "false");
  await buttons.nth(1).focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  check("keyboard: ArrowDown + Enter opens third", (await buttons.nth(2).getAttribute("aria-expanded")) === "true");
  await page.close();
}

// Mobile menu (375)
{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await page.goto(base + "/programmes", { waitUntil: "load" });
  check("nav hidden on mobile until opened", await page.locator("#site-nav").isHidden());
  await page.click("[data-nav-toggle]");
  check("toggle opens nav", await page.locator("#site-nav").isVisible());
  check("aria-expanded true", (await page.getAttribute("[data-nav-toggle]", "aria-expanded")) === "true");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300); // exit transition (200 ms, display allow-discrete)
  check("Escape closes nav", await page.locator("#site-nav").isHidden());
  const redButtons = await page.locator(".btn").evaluateAll((els) => els.filter((e) => { const r = e.getBoundingClientRect(); return r.top < 800 && r.bottom > 0; }).length);
  check("exactly one red button in the first mobile screen", redButtons === 1, String(redButtons));
  await page.close();
}

// No-JS: content readable, answers visible
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + "/admissions", { waitUntil: "load" });
  check("without JS all answers are visible", await page.locator("#faq-a-3").isVisible());
  await page.goto(base + "/", { waitUntil: "load" });
  check("without JS the hero h1 is visible", await page.locator("h1").isVisible());
  check("without JS all 5 testimonials are readable", (await page.locator("[data-slide]:visible").count()) === 5);
  check("without JS the form fallback does not link to itself", !(await page.goto(base + "/contact", { waitUntil: "load" })) || (await page.locator(".hs-form noscript a[href='/contact'], .hs-form a[href='/contact']").count()) === 0);
  await ctx.close();
}

await browser.close();
console.log(failures ? `${failures} failure(s)` : "all interaction checks passed");
process.exit(failures ? 1 : 0);
