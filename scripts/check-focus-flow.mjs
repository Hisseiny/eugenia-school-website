import { chromium } from "playwright-core";
import assert from "node:assert/strict";
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox", "--disable-gpu", "--disable-software-rasterizer", "--renderer-process-limit=1"] });
let checks = 0;
const ok = (value, label) => { assert.ok(value, label); console.log(`PASS ${label}`); checks++; };
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    const payloads = [];
    await context.route("**/*", (route) => {
      const url = new URL(route.request().url());
      if (url.origin === "http://127.0.0.1:4322") return route.continue();
      if (url.hostname === "api.hsforms.com") {
        payloads.push({ url: route.request().url(), body: route.request().postDataJSON() });
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
      }
      return route.abort();
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4322/candidature");
    await page.evaluate(() => document.fonts.ready);
    ok(await page.locator(".site-header, .footer").count() === 0, `${width}: no marketing navigation`);
    await page.screenshot({ path: `../attached_assets/eugenia-preview/focus-${width}.png`, fullPage: true });
    await page.locator('label:has(input[value="All.Parent"])').click();
    ok(await page.locator("[data-pf-step]").textContent() === "2", `${width}: one click advances`);
    ok(await page.locator('[data-focus-story="parent"]').getAttribute("aria-hidden") === "false", `${width}: parent story`);
    await page.locator('label:has(input[value="MSc Gamma"])').click();
    ok(await page.locator("[data-pf-step]").textContent() === "3", `${width}: programme advances`);
    ok(await page.locator('[data-focus-story="msc"]').getAttribute("aria-hidden") === "false", `${width}: MSc story`);
    await page.locator('label:has(input[value="Y3"])').click();
    ok(await page.locator("[data-pf-step]").textContent() === "4", `${width}: contact in three clicks`);
    await page.locator('[name="firstname"]').fill("Camille");
    await page.locator('[name="lastname"]').fill("Exemple");
    await page.locator('[name="email"]').fill("camille@gmial.com");
    await page.locator('[name="phone"]').focus();
    await page.locator("[data-email-suggestion]").click();
    ok(await page.locator('[name="email"]').inputValue() === "camille@gmail.com", `${width}: explicit typo correction`);
    await page.locator('[name="phone"]').fill("0612345678");
    await page.locator('[name="email"]').focus();
    ok(await page.locator('[name="phone"]').inputValue() === "06 12 34 56 78", `${width}: telephone display formatting`);
    const initialMetrics = await page.evaluate(() => window.dataLayer ?? []);
    await page.reload();
    ok(await page.locator("[data-pf-step]").textContent() === "4", `${width}: restored step`);
    ok(await page.locator('[name="firstname"]').inputValue() === "Camille", `${width}: restored answers`);
    await page.screenshot({ path: `../attached_assets/eugenia-preview/focus-contact-${width}.png`, fullPage: true });
    await page.locator("[data-pf-submit]").click();
    await page.locator("[data-pf-done]").waitFor({ state: "visible" });
    const fields = Object.fromEntries(payloads[0].body.fields.map((f) => [f.name, f.value]));
    assert.deepEqual(fields, { all_type_multiple_checkboxes: "All.Parent", one_targetted_training: "MSc Gamma", all_current_academic_year: "Y3", firstname: "Camille", lastname: "Exemple", email: "camille@gmail.com", phone: "0612345678" });
    ok(payloads[0].url.endsWith("/636c087a-248a-470d-8e70-b50dd08a73b8"), `${width}: same destination and field contract`);
    ok(await page.evaluate(() => sessionStorage.getItem("eugenia:form:v2:candidature")) === null, `${width}: draft cleared after success`);
    ok(await page.locator("[data-student-share]").isHidden(), `${width}: no student CTA for parents`);
    const metrics = [...initialMetrics, ...await page.evaluate(() => window.dataLayer)];
    ok(["form_start", "form_step_view", "form_step_complete", "form_submit"].every((name) => metrics.some((e) => e.event === name)), `${width}: funnel events`);
    ok(!JSON.stringify(metrics).includes("Camille") && !JSON.stringify(metrics).includes("gmail"), `${width}: no personal data in analytics`);
    await page.screenshot({ path: `../attached_assets/eugenia-preview/focus-done-${width}.png`, fullPage: true });
    await context.close();
  }
  console.log(`${checks} focus checks passed; all external requests intercepted.`);
} finally { await browser.close(); }
