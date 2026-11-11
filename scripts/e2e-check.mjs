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
const blockTracking = async (page) => {
  await page.route("**/*googletagmanager.com/**", (route) => route.abort());
  await page.route("**/connect.facebook.net/**", (route) => route.abort());
};

// Carousel (desktop)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await blockTracking(page);
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
  await blockTracking(page);
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
  await blockTracking(page);
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

// Parents / future-student journey
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await blockTracking(page);
  await page.goto(base + "/", { waitUntil: "load" });
  check("home has the two audience cards", (await page.locator(".audience__card").count()) === 2);
  await page.goto(base + "/admissions#faq-q-4", { waitUntil: "load" });
  await page.waitForTimeout(400);
  check("deep link opens the FAQ answer", await page.locator("#faq-a-4").isVisible());
  check("deep link focuses the question", await page.evaluate(() => document.activeElement?.id === "faq-q-4"));
  await page.goto(base + "/admissions#parents", { waitUntil: "load" });
  check("parents block links to its confirmed questions", (await page.locator(".parents__questions a[href^='#faq-q-']").count()) === 5);
  await page.goto(base + "/candidature", { waitUntil: "load" });
  check("form page shows what happens next", (await page.locator(".formpage__next li").count()) === 3);
  await page.close();
}

// Premium application form (HubSpot API mocked: no real submission)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await blockTracking(page);
  let posted = null;
  await page.route(/api\.hsforms\.com/, async (route) => { posted = JSON.parse(route.request().postData()); await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ inlineMessage: "ok" }) }); });
  await page.goto(base + "/candidature", { waitUntil: "load" });
  check("form starts at step 1/4", (await page.locator("[data-pf-step]").textContent()) === "1" && (await page.locator("[data-pf-panel='0']").isVisible()));
  await page.click("[data-pf-next]");
  check("empty step is blocked with a message", await page.locator("[data-pf-panel='0'] [data-pf-error]").isVisible());
  await page.click(".pf__choice:has(input[value='All.Student']) .pf__choice-box");
  await page.waitForTimeout(400);
  check("choosing a card moves to step 2", (await page.locator("[data-pf-step]").textContent()) === "2");
  await page.selectOption("select[name='all_current_academic_year']", "Y-1 (terminale)");
  await page.click("[data-pf-next]");
  await page.click(".pf__choice:has(input[value='Bachelor Gamma']) .pf__choice-box");
  await page.waitForTimeout(400);
  check("step 4 shows the submit button", await page.locator("[data-pf-submit]").isVisible());
  await page.fill("input[name='firstname']", "Test");
  await page.fill("input[name='lastname']", "Devin");
  await page.fill("input[name='email']", "not-an-email");
  await page.fill("input[name='phone']", "0612345678");
  await page.click("[data-pf-submit]");
  check("invalid e-mail is caught before sending", posted === null && (await page.locator("input[name='email'][aria-invalid='true']").count()) === 1);
  await page.fill("input[name='email']", "test@example.com");
  await page.click("[data-pf-submit]");
  await page.waitForTimeout(600);
  const names = posted ? posted.fields.map((f) => f.name).sort().join(",") : "";
  check("payload has the HubSpot field names", names === "all_current_academic_year,all_type_multiple_checkboxes,email,firstname,lastname,one_targetted_training,phone", names);
  check("confirmation uses the first name", (await page.locator("[data-pf-done-title]").textContent()).includes("Test"));
  const successEvent = await page.evaluate(() => window.dataLayer?.find((entry) => entry.event === "hubspot-form-success"));
  check("successful form pushes its GUID to analytics", successEvent?.["event-data"]?.id === "636c087a-248a-470d-8e70-b50dd08a73b8");
  check(
    "form analytics event contains no personal data",
    Object.keys(successEvent ?? {}).sort().join(",") === "event,event-data" &&
      Object.keys(successEvent?.["event-data"] ?? {}).sort().join(",") === "eventName,id,type",
  );
  await page.close();
}

// Parent tone in forms (?pour=parent preselects Parent, later steps say « vous »)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await blockTracking(page);
  await page.goto(base + "/candidature?pour=parent", { waitUntil: "load" });
  check("?pour=parent preselects Parent", await page.locator("input[value='All.Parent']").isChecked());
  await page.click("[data-pf-next]");
  check("step 2 says « vous » for a parent", (await page.locator("[data-pf-panel='1'] legend").textContent()).includes("votre enfant"));
  await page.selectOption("select[name='all_current_academic_year']", "Y-1 (terminale)");
  await page.click("[data-pf-next]");
  await page.click(".pf__choice:has(input[value='MSc Gamma']) .pf__choice-box");
  await page.waitForTimeout(400);
  check("parent note shown on the last step", await page.locator("[data-pf-parent-note]").isVisible());
  await page.goto(base + "/carrieres?pour=parent", { waitUntil: "load" });
  check("Carrières continues to /parents for a parent", (await page.locator("a.continue").getAttribute("href")) === "/parents");
  await page.goto(base + "/parents", { waitUntil: "load" });
  check("share button keeps a mailto without share API", (await page.locator("[data-share-btn]").first().getAttribute("href")).startsWith("mailto:"));
  await page.close();
}

// Audience variants, native curriculum disclosures and the dedicated FAQ page.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await blockTracking(page);
  await page.goto(base + "/programme/bachelor-ia-business", { waitUntil: "load" });
  check("Bachelor defaults to student copy", await page.locator('[data-audience="student"]').first().isVisible());
  check("parent copy is initially hidden", await page.locator('[data-audience="parent"]').first().isHidden());
  await page.locator('[data-audience-select="parent"]').click();
  check("audience switch reveals parent copy", await page.locator('[data-audience="parent"]').first().isVisible());
  check("audience switch updates aria-pressed", (await page.locator('[data-audience-select="parent"]').getAttribute("aria-pressed")) === "true");
  const audienceCta = page.locator(".audience__cta");
  check("parent CTA carries form context", (await audienceCta.getAttribute("href")) === "/candidature?pour=parent");
  const audienceEvent = await page.evaluate(() => window.dataLayer?.find((entry) => entry.event === "audience_toggle"));
  check("audience switch tracks the selected profile", audienceEvent?.audience === "parent");
  for (const [baseHref, expectedHref] of [
    ["/candidature?pour=parent#form", "/candidature?pour=parent#form"],
    ["/brochure?source=cta#download", "/brochure?source=cta&pour=parent#download"],
    ["/evenements#portes-ouvertes", "/evenements?pour=parent#portes-ouvertes"],
    ["/contact?source=cta", "/contact?source=cta&pour=parent"],
  ]) {
    await audienceCta.evaluate((anchor, href) => {
      anchor.dataset.audienceStudentHref = href;
      anchor.dataset.audienceParentHref = href;
      anchor.setAttribute("href", href);
    }, baseHref);
    await page.locator('[data-audience-select="parent"]').click();
    check(`parent CTA keeps context and hash for ${baseHref.split(/[?#]/)[0]}`, (await audienceCta.getAttribute("href")) === expectedHref);
    await page.locator('[data-audience-select="student"]').click();
    check(`student CTA remains unchanged for ${baseHref.split(/[?#]/)[0]}`, (await audienceCta.getAttribute("href")) === baseHref);
  }
  await page.goto(base + "/programme/bachelor-ia-business?pour=parent", { waitUntil: "load" });
  check("?pour=parent selects the parent variant", await page.locator('[data-audience-select="parent"]').getAttribute("aria-pressed") === "true");
  check("parent query is not appended twice", (await page.locator(".audience__cta").getAttribute("href")) === "/candidature?pour=parent");
  await page.goto(base + "/programme/bachelor-ia-business-3eme-annee-alternance", { waitUntil: "load" });
  await page.locator('[data-audience-select="parent"]').click();
  check("third-year parent CTA links to the rhythm section", (await page.locator(".audience__cta").getAttribute("href")) === "#rythme");
  check("third-year rhythm section has its live anchor", (await page.locator("#rythme").count()) === 1);
  await page.locator('[data-audience-select="student"]').click();
  check("third-year student CTA still links to the application", (await page.locator(".audience__cta").getAttribute("href")) === "/candidature");
  const module = page.locator(".curriculum__module").first();
  await module.locator("summary").click();
  check("native curriculum details open and expose courses", await module.evaluate((el) => el.open) && await module.locator(".curriculum__course-name").first().isVisible());
  await page.goto(base + "/faq", { waitUntil: "load" });
  const faqButtons = page.locator("[data-accordion] button");
  check("FAQ page has live question items", (await faqButtons.count()) > 0);
  await faqButtons.nth(1).click();
  check("FAQ page accordion opens the selected answer", (await faqButtons.nth(1).getAttribute("aria-expanded")) === "true");
  await page.close();
}

// No-JS: content readable, answers visible
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await blockTracking(page);
  await page.goto(base + "/admissions", { waitUntil: "load" });
  check("without JS all answers are visible", await page.locator("#faq-a-3").isVisible());
  await page.goto(base + "/", { waitUntil: "load" });
  check("without JS the hero h1 is visible", await page.locator("h1").isVisible());
  check("without JS all 5 testimonials are readable", (await page.locator("[data-slide]:visible").count()) === 5);
  await page.goto(base + "/programme/bachelor-ia-business", { waitUntil: "load" });
  check("without JS student variant remains visible", await page.locator('[data-audience="student"]').first().isVisible());
  check("without JS audience controls stay hidden", await page.locator(".audience__switch").isHidden());
  check("without JS parent variant stays hidden", await page.locator('[data-audience="parent"]').first().isHidden());
  check("without JS the form fallback does not link to itself", !(await page.goto(base + "/contact", { waitUntil: "load" })) || (await page.locator(".hs-form noscript a[href='/contact'], .hs-form a[href='/contact']").count()) === 0);
  await ctx.close();
}

// Scroll reveals never leave visible content transparent, including unusually tall elements.
{
  const routes = [
    "/programme/bachelor-ia-business",
    "/programme/bachelor-ia-business-3eme-annee-alternance",
    "/programme/master-ia-business-alternance",
    "/certification-architecte-ia",
    "/certification-concepteur-solutions-no-code",
    "/alternance",
    "/financement",
    "/processus-admission",
    "/faq",
  ];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await blockTracking(page);
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "load" });
    await page.evaluate(() => window.scrollTo(0, 0));
    check(`${route}: extraction link inventory is not rendered`, (await page.locator(".live-links").count()) === 0);
    let step = 0;
    while (true) {
      await page.waitForTimeout(1000);
      const { invisible, redButtons } = await page.evaluate(() => {
        const inViewport = (element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
        };
        const invisible = [...document.querySelectorAll("body *")]
          .filter((element) => !element.closest("[hidden], [aria-hidden='true'], .sr-only, .visually-hidden"))
          .filter((element) => getComputedStyle(element).opacity === "0" && inViewport(element))
          .map((element) => `${element.tagName.toLowerCase()}${element.className ? `.${String(element.className).trim().replace(/\s+/g, ".")}` : ""}`);
        const redButtons = [...document.querySelectorAll("main .btn")].filter(inViewport).length;
        return { invisible, redButtons };
      });
      check(`${route}: no transparent content after wheel step ${step}`, invisible.length === 0, invisible.slice(0, 3).join(", "));
      check(`${route}: at most one red content button after wheel step ${step}`, redButtons <= 1, String(redButtons));
      const { y, max } = await page.evaluate(() => ({ y: window.scrollY, max: document.documentElement.scrollHeight - window.innerHeight }));
      if (y >= max) break;
      await page.mouse.wheel(0, 900);
      await page.waitForTimeout(50);
      step++;
    }
  }
  await page.close();
}

await browser.close();
console.log(failures ? `${failures} failure(s)` : "all interaction checks passed");
process.exit(failures ? 1 : 0);
