import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://127.0.0.1:4322";
const executablePath = process.env.CHROME_PATH ?? "/home/ubuntu/.local/bin/google-chrome";
const screenshots = "screenshots/pr9-review";
mkdirSync(screenshots, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
let failures = 0;
const check = (name, ok, extra = "") => {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${extra ? ` — ${extra}` : ""}`);
  if (!ok) failures++;
};
const blockTracking = async (page) => {
  await page.route("**/*googletagmanager.com/**", (route) => route.abort());
  await page.route("**/connect.facebook.net/**", (route) => route.abort());
};
const alignFormLabel = async (page) => {
  await page.evaluate(() => {
    const label = document.querySelector("#formulaire .live-form__label");
    if (label) window.scrollTo(0, Math.max(0, window.scrollY + label.getBoundingClientRect().top - 120));
  });
};

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await blockTracking(page);
await page.goto(`${base}/recruter-nos-etudiants`, { waitUntil: "load", timeout: 60000 });
await page.locator("#formulaire form").waitFor({ state: "visible", timeout: 30000 });

const desktop = await page.evaluate(() => {
  const root = document.querySelector("#formulaire");
  const embed = root?.querySelector(".hs-form[data-hs-form-id]");
  const form = root?.querySelector("form");
  const columns = [...(root?.querySelectorAll("fieldset.form-columns-2") ?? [])].map((fieldset) =>
    (() => {
      const template = getComputedStyle(fieldset).gridTemplateColumns.trim();
      const repeated = template.match(/^repeat\((\d+),/);
      return repeated ? Number(repeated[1]) : template.startsWith("minmax(") ? 1 : template.split(/\s+/).length;
    })(),
  );
  const controls = [...(root?.querySelectorAll(
    'input.hs-input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]), select.hs-input, textarea.hs-input',
  ) ?? [])]
    .filter((control) => control.getBoundingClientRect().width > 0)
    .map((control) => {
      const style = getComputedStyle(control);
      const rect = control.getBoundingClientRect();
      const parent = control.closest(".input")?.getBoundingClientRect();
      return {
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        minHeight: Number.parseFloat(style.minHeight),
        width: rect.width,
        parentWidth: parent?.width ?? 0,
        borderWidth: style.borderTopWidth,
        borderColor: style.borderTopColor,
        borderRadius: style.borderTopLeftRadius,
      };
    });
  const label = root?.querySelector("label:not(.hs-error-msg)");
  const labelStyle = label ? getComputedStyle(label) : null;
  const submit = root?.querySelector('input[type="submit"].hs-button');
  const submitStyle = submit ? getComputedStyle(submit) : null;
  return {
    formId: embed?.getAttribute("data-hs-form-id"),
    inlineMinHeight: embed?.style.minHeight,
    rootHeight: root?.getBoundingClientRect().height ?? 0,
    formHeight: form?.getBoundingClientRect().height ?? 0,
    padding: root ? getComputedStyle(root).paddingTop : "",
    columns,
    controls,
    label: labelStyle ? { fontSize: labelStyle.fontSize, fontFamily: labelStyle.fontFamily } : null,
    submit: submitStyle
      ? {
          fontSize: submitStyle.fontSize,
          fontFamily: submitStyle.fontFamily,
          minHeight: Number.parseFloat(submitStyle.minHeight),
          backgroundColor: submitStyle.backgroundColor,
          color: submitStyle.color,
          borderRadius: submitStyle.borderTopLeftRadius,
        }
      : null,
  };
});

check("HubSpot form renders for the recruiter page", desktop.formId === "b98543e3-c9ae-49d6-99bc-7c0418dd95ba");
check("the content-sized container has no fixed minimum height", desktop.inlineMinHeight === "");
check("HubSpot columns use two tracks on desktop", desktop.columns.length > 0 && desktop.columns.every((count) => count === 2), JSON.stringify(desktop.columns));
check(
  "text controls use the site’s 16px form style",
  desktop.controls.length > 0 && desktop.controls.every((control) =>
    control.fontSize === "16px" &&
    control.fontFamily.includes("Work Sans") &&
    control.minHeight >= 48 &&
    control.borderWidth === "1px" &&
    control.borderRadius === "4px" &&
    Math.abs(control.width - control.parentWidth) < 1,
  ),
  JSON.stringify(desktop.controls),
);
check("HubSpot labels use the site label style", desktop.label?.fontSize === "13px" && desktop.label.fontFamily.includes("Work Sans"));
check(
  "HubSpot submit matches the site button tokens",
  desktop.submit?.fontSize === "16px" &&
    desktop.submit.fontFamily.includes("Work Sans") &&
    desktop.submit.minHeight >= 44 &&
    desktop.submit.backgroundColor === "rgb(227, 48, 84)" &&
    desktop.submit.color === "rgb(255, 255, 255)" &&
    desktop.submit.borderRadius === "100px",
  JSON.stringify(desktop.submit),
);

await page.locator("#formulaire").scrollIntoViewIfNeeded();
await alignFormLabel(page);
await page.waitForTimeout(500);
await page.screenshot({ path: `${screenshots}/recruter-form_1440.png` });

for (const width of [320, 375, 767, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(100);
  const responsive = await page.evaluate(() => {
    const root = document.querySelector("#formulaire");
    const columns = root?.querySelector("fieldset.form-columns-2");
    const template = columns ? getComputedStyle(columns).gridTemplateColumns.trim() : "";
    const repeated = template.match(/^repeat\((\d+),/);
    const visibleControls = [...(root?.querySelectorAll(
      'input.hs-input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]), select.hs-input, textarea.hs-input',
    ) ?? [])].filter((control) => control.getBoundingClientRect().width > 0);
    return {
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      gridTracks: repeated ? Number(repeated[1]) : template.startsWith("minmax(") ? 1 : template ? template.split(/\s+/).length : 0,
      controlsFit: visibleControls.every((control) => {
        const rect = control.getBoundingClientRect();
        const container = root.getBoundingClientRect();
        return rect.left >= container.left && rect.right <= container.right;
      }),
    };
  });
  const expectedTracks = width < 768 ? 1 : 2;
  check(
    `recruiter form responsive at ${width}px`,
    responsive.document <= responsive.viewport &&
      responsive.body <= responsive.viewport &&
      responsive.gridTracks === expectedTracks &&
      responsive.controlsFit,
    JSON.stringify(responsive),
  );
}

await page.setViewportSize({ width: 375, height: 900 });
await page.waitForTimeout(300);
await page.locator("#formulaire").scrollIntoViewIfNeeded();
await alignFormLabel(page);
await page.waitForTimeout(500);
await page.screenshot({ path: `${screenshots}/recruter-form_375.png` });
await page.locator('#formulaire input[type="submit"]').click();
const firstError = page.locator("#formulaire .hs-error-msgs").first();
await firstError.waitFor({ state: "visible", timeout: 10000 });
await firstError.scrollIntoViewIfNeeded();
await alignFormLabel(page);
await page.waitForTimeout(200);
const errorStyle = await firstError.evaluate((error) => ({
  text: error.innerText,
  color: getComputedStyle(error).color,
  fontSize: getComputedStyle(error).fontSize,
}));
check(
  "HubSpot validation errors use the PremiumForm error style",
  errorStyle.text.length > 0 &&
    errorStyle.color === "rgb(117, 25, 43)" &&
    errorStyle.fontSize === "14px",
  JSON.stringify(errorStyle),
);
await page.screenshot({ path: `${screenshots}/recruter-form-validation_375.png` });
await page.close();

const focusPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await blockTracking(focusPage);
await focusPage.goto(`${base}/recruter-nos-etudiants`, { waitUntil: "load", timeout: 60000 });
await focusPage.locator("#formulaire form").waitFor({ state: "visible", timeout: 30000 });
await focusPage.keyboard.press("Tab");
const focusInput = focusPage.locator('#formulaire input.hs-input:not([type="hidden"])').first();
await focusInput.focus();
const focusStyle = await focusInput.evaluate((input) => ({
  focusVisible: input.matches(":focus-visible"),
  outline: getComputedStyle(input).outlineStyle,
  outlineWidth: getComputedStyle(input).outlineWidth,
  outlineColor: getComputedStyle(input).outlineColor,
}));
check(
  "HubSpot fields show the PremiumForm focus ring",
  focusStyle.focusVisible &&
    focusStyle.outline === "solid" &&
    focusStyle.outlineWidth === "2px" &&
    focusStyle.outlineColor === "rgb(227, 48, 84)",
  JSON.stringify(focusStyle),
);
await focusPage.close();

const noJs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
await blockTracking(noJs);
await noJs.goto(`${base}/recruter-nos-etudiants`, { waitUntil: "load", timeout: 60000 });
check(
  "no-JavaScript HubSpot fallback remains available",
  (await noJs.locator("#formulaire").innerText()).includes("Merci d'activer JavaScript") &&
    (await noJs.locator('#formulaire a[href^="mailto:"]').count()) === 1,
);
await noJs.close();

const blocked = await browser.newPage({ viewport: { width: 375, height: 900 } });
await blockTracking(blocked);
await blocked.route("https://js-eu1.hsforms.net/**", (route) => route.abort());
await blocked.goto(`${base}/recruter-nos-etudiants`, { waitUntil: "load", timeout: 60000 });
await blocked.getByText("Le formulaire n'a pas pu se charger", { exact: false }).waitFor({ state: "visible", timeout: 15000 });
check(
  "blocked HubSpot embed fallback remains available",
  (await blocked.locator('#formulaire a[href^="mailto:"]').count()) === 1,
);
await blocked.close();

await browser.close();
process.exit(failures ? 1 : 0);
