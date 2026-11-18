// Run against a local preview: CHROME_PATH=/path/to/chromium node scripts/check-premium-forms.mjs
// Use a default build: any attempted external request fails the check.
import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { serveBuild } from "./static-test-route.mjs";

const base = process.argv[2] ?? "http://127.0.0.1:4322";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--disable-software-rasterizer", "--renderer-process-limit=1"],
});
let checks = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  console.log(`PASS ${message}`);
  checks++;
};

try {
  for (const width of (process.env.FORM_WIDTHS ?? "375,1440").split(",").map(Number)) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const unexpected = [];
    let observingSubmission = false;
    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (request.method() === "GET" && url.origin === new URL(base).origin) {
        if (observingSubmission && !["image", "font"].includes(request.resourceType())) unexpected.push(url.href);
        return serveBuild(route);
      }
      unexpected.push(url.href);
      return route.abort();
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const path of ["brochure", "candidature", "evenements", "contact", "recruter-nos-etudiants"]) {
      const recruiter = path === "recruter-nos-etudiants";
      await page.goto(`${base}/${path}?pour=parent`);
      const form = page.locator("[data-premium-form]");
      await form.waitFor();
      check(await form.locator("[data-demo-notice]").isVisible(), `${path}/${width}: demo notice visible`);
      const panels = form.locator("[data-pf-panel]");
      const total = await panels.count();
      if (!recruiter) check(await panels.first().locator(".pf__choice-box").evaluateAll(boxes => boxes.every(box => {
        const icon = box.querySelector(".pf__choice-icon").getBoundingClientRect();
        const label = box.querySelector(".pf__choice-label").getBoundingClientRect();
        return icon.right <= label.left;
      })), `${path}/${width}: choice icons do not overlap their labels`);
      for (let index = 0; index < total - 1; index++) {
        const panel = panels.nth(index);
        const radios = panel.locator('input[type="radio"]');
        if (await radios.count()) {
          const parent = panel.locator('input[value="All.Parent"]');
          if (await parent.count()) {
            await parent.check();
          } else {
            await radios.first().focus();
            await page.keyboard.press("ArrowRight");
          }
          await page.waitForTimeout(220);
          check(await panel.isVisible(), `${path}/${width}: radio selection does not advance`);
        } else {
          await panel.locator("select").selectOption({ index: 1 });
        }
        await form.locator("[data-pf-next]").click();
        check(await panels.nth(index + 1).isVisible(), `${path}/${width}: explicit next step`);
        check(await panels.nth(index + 1).locator("legend").evaluate((el) => el === document.activeElement),
          `${path}/${width}: next question receives focus`);
      }
      if (recruiter) check(await form.getByLabel("Téléphone").isVisible(), `${path}/${width}: labelled phone field`);
      await form.locator("[data-pf-submit]").click();
      check(await form.locator("[data-pf-done]").isHidden(), `${path}/${width}: invalid form never confirmed`);
      check((await panels.last().locator("[data-pf-error]").textContent()).includes("votre prénom"),
        `${path}/${width}: parent validation uses vous`);
      await form.locator('[name="firstname"]').fill("   ");
      await form.locator('[name="lastname"]').fill("Test");
      await form.locator('[name="email"]').fill("test@example.com");
      await form.locator('[name="phone"]').fill("0612345678");
      await form.locator("[data-pf-submit]").click();
      check(await form.locator("[data-pf-done]").isHidden(), `${path}/${width}: whitespace-only required value rejected`);
      await form.locator('[name="firstname"]').fill("Test");
      await form.locator("[data-pf-back]").click();
      await form.locator("[data-pf-next]").click();
      check(await form.locator('[name="email"]').inputValue() === "test@example.com",
        `${path}/${width}: going back preserves answers`);
      observingSubmission = true;
      await form.locator("[data-pf-submit]").click();
      await form.locator("[data-pf-done]").waitFor({ state: "visible" });
      check(await form.locator("[data-pf-done-title]").evaluate((el) => el === document.activeElement),
        `${path}/${width}: success confirmation receives focus`);
      check(await form.locator("[data-pf-done-title]").textContent() === "Simulation terminée, Test.",
        `${path}/${width}: confirmation states simulation and uses first name`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${path}/${width}: no horizontal overflow`);
      if (process.env.FORM_SCREENSHOTS_DIR) {
        await form.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${process.env.FORM_SCREENSHOTS_DIR}/${path}-${width}.png` });
      }
      check(unexpected.length === 0, `${path}/${width}: no submission or unexpected network requests (${unexpected.join(", ")})`);
      observingSubmission = false;
    }
    check(errors.length === 0, `${width}: no browser script errors`);
    await context.close();
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  await nojs.route("**/*", (route) =>
    new URL(route.request().url()).origin === new URL(base).origin ? serveBuild(route) : route.abort());
  const page = await nojs.newPage();
  await page.goto(`${base}/brochure`);
  check(await page.locator("[data-pf-panel]:visible").count() === 4, "no JS: all questions visible");
  check(await page.locator(".pf__nojs").isVisible(), "no JS: public contact fallback visible");
  await page.goto(`${base}/recruter-nos-etudiants`);
  check(await page.locator("#formulaire .pf__nojs a[href^='mailto:']").isVisible(), "no JS: recruiter public contact fallback visible");
  await nojs.close();
  console.log(`${checks} checks passed; all external traffic intercepted.`);
} finally {
  await browser.close();
}
