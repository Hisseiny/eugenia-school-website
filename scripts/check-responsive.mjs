import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://127.0.0.1:4322";
const routes = [
  "/admissions",
  "/programmes",
  "/entreprises",
  "/programme/bachelor-ia-business",
  "/programme/bachelor-ia-business-3eme-annee-alternance",
  "/programme/master-ia-business-alternance",
  "/certification-architecte-ia",
  "/certification-concepteur-solutions-no-code",
  "/alternance",
  "/financement",
  "/processus-admission",
  "/faq",
  "/notre-adn",
  "/campus/paris",
  "/vie-etudiante",
  "/entrepreneuriat",
  "/approche-pedagogique",
  "/methode-eugenia",
  "/entreprises-partenaires",
  "/recruter-nos-etudiants",
  "/projets-entreprises",
  "/projets-entreprises/dust-hackathon",
  "/projets-entreprises/mistral-ai-hackathon",
  "/projets-entreprises/openai-hackathon",
  "/portfolio",
];
const widths = [320, 375, 768, 1024, 1440];
const executablePath = process.env.CHROME_PATH ?? "/home/ubuntu/.local/bin/google-chrome";
const browser = await chromium.launch({ executablePath, headless: true });
let failures = 0;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.route("**/*googletagmanager.com/**", (route) => route.abort());
  await page.route("**/connect.facebook.net/**", (route) => route.abort());
  for (const route of routes) {
    await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 60000 });
    const overflow = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    const ok = overflow.document <= overflow.viewport && overflow.body <= overflow.viewport;
    console.log(`${ok ? "OK" : "OVERFLOW"} ${route} ${width}px${ok ? "" : ` (${JSON.stringify(overflow)})`}`);
    if (!ok) failures++;
    if (width >= 1024) {
      await page.evaluate(() => document.fonts.ready);
      const brokenWords = await page.locator(".pagetop .display").evaluateAll((titles) => titles.flatMap((title) => {
        const text = title.firstChild;
        if (!(text instanceof Text)) return [];
        const range = document.createRange();
        return [...text.data.matchAll(/\p{L}+/gu)].filter((word) => {
          range.setStart(text, word.index);
          range.setEnd(text, word.index + word[0].length);
          return range.getClientRects().length > 1;
        }).map(([word]) => word);
      }));
      if (brokenWords.length) {
        console.log(`SPLIT TITLE ${route} ${width}px (${brokenWords.join(", ")})`);
        failures++;
      }
    }
  }
  await page.close();
}

const short = await browser.newPage({ viewport: { width: 375, height: 360 }, reducedMotion: "reduce" });
await short.route((url) => url.origin !== new URL(base).origin, (route) => route.abort());
await short.goto(base);
await short.locator("[data-nav-toggle]").click();
await short.mouse.move(180, 250);
await short.mouse.wheel(0, 300);
const reachable = await short.waitForFunction(() => {
  const link = document.querySelector(".site-header__event");
  const toggle = document.querySelector("[data-nav-toggle]");
  return link && toggle && link.getBoundingClientRect().bottom <= innerHeight
    && toggle.getBoundingClientRect().top >= 0;
}, null, { timeout: 1500 }).then(() => true, () => false);
console.log(`${reachable ? "OK" : "UNREACHABLE"} Portes ouvertes at 375x360`);
if (!reachable) failures++;
await short.close();

await browser.close();
process.exit(failures ? 1 : 0);
