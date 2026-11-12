import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://127.0.0.1:4322";
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
  }
  await page.close();
}

await browser.close();
process.exit(failures ? 1 : 0);
