// Run against a local preview: CHROME_PATH=/path/to/chromium node scripts/check-premium-forms.mjs
// Every external request is intercepted. No submissions reach HubSpot.
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

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
  for (const width of [375, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    let requests = [];
    let mode = "success";
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.origin === new URL(base).origin) return route.continue();
      if (url.hostname === "api.hsforms.com") {
        requests.push(route.request().postDataJSON());
        if (mode === "timeout") return; // Browser aborts after the deadline.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return route.fulfill({
          status: mode === "error" ? 500 : 200,
          contentType: "application/json",
          body: "{}",
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      }
      return route.abort();
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const path of ["brochure", "candidature", "evenements", "contact"]) {
      requests = [];
      mode = path === "brochure" ? "error" : "success";
      await page.goto(`${base}/${path}?pour=parent`);
      const form = page.locator("[data-premium-form]");
      await form.waitFor();
      const panels = form.locator("[data-pf-panel]");
      const total = await panels.count();
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
      await form.locator("[data-pf-submit]").click();
      check(requests.length === 0, `${path}/${width}: invalid form never submitted`);
      check((await panels.last().locator("[data-pf-error]").textContent()).includes("votre prénom"),
        `${path}/${width}: parent validation uses vous`);
      await form.locator('[name="firstname"]').fill("   ");
      await form.locator('[name="lastname"]').fill("Test");
      await form.locator('[name="email"]').fill("test@example.com");
      await form.locator('[name="phone"]').fill("0612345678");
      await form.locator("[data-pf-submit]").click();
      check(requests.length === 0, `${path}/${width}: whitespace-only required value rejected`);
      await form.locator('[name="firstname"]').fill("Test");
      await form.locator("[data-pf-back]").click();
      await form.locator("[data-pf-next]").click();
      check(await form.locator('[name="email"]').inputValue() === "test@example.com",
        `${path}/${width}: going back preserves answers`);
      await form.locator("[data-pf-submit]").click();
      check(await form.locator("[data-pf-submit]").isDisabled(), `${path}/${width}: duplicate submit blocked`);
      check(await form.locator('[name="email"]').isDisabled(), `${path}/${width}: pending payload cannot be edited`);
      if (mode === "error") {
        await page.waitForFunction(() => !document.querySelector("[data-pf-submit]").disabled);
        check(await form.locator('[name="email"]').inputValue() === "test@example.com",
          `${path}/${width}: server error preserves answers`);
        check((await panels.last().locator("[data-pf-error]").textContent()).includes("Vos réponses"),
          `${path}/${width}: actionable formal error`);
        if (width === 1440) {
          mode = "timeout";
          await page.clock.install();
          await form.locator("[data-pf-submit]").click();
          await page.waitForFunction(() => document.querySelector("[data-pf-submit]").disabled);
          await page.clock.fastForward(16000);
          await page.waitForFunction(() => !document.querySelector("[data-pf-submit]").disabled);
          check(await form.locator('[name="email"]').inputValue() === "test@example.com",
            "timeout: answers preserved and controls unlocked");
          check((await panels.last().locator("[data-pf-error]").textContent()).includes("Vérifiez votre e-mail"),
            "timeout: ambiguous delivery is not presented as definite failure");
        }
        mode = "success";
        await form.locator("[data-pf-submit]").click();
      }
      await form.locator("[data-pf-done]").waitFor({ state: "visible" });
      check(await form.locator("[data-pf-done-title]").evaluate((el) => el === document.activeElement),
        `${path}/${width}: success confirmation receives focus`);
      check(requests.length === (path === "brochure" ? (width === 1440 ? 3 : 2) : 1), `${path}/${width}: expected submission count`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${path}/${width}: no horizontal overflow`);
    }
    check(errors.length === 0, `${width}: no browser script errors`);
    await context.close();
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  await nojs.route("**/*", (route) =>
    new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
  const page = await nojs.newPage();
  await page.goto(`${base}/brochure`);
  check(await page.locator("[data-pf-panel]:visible").count() === 4, "no JS: all questions visible");
  check(await page.locator(".pf__nojs").isVisible(), "no JS: public contact fallback visible");
  await nojs.close();
  console.log(`${checks} checks passed; all external traffic intercepted.`);
} finally {
  await browser.close();
}
