// Static checks on the built site (run `pnpm build` first). Guards the brief's non-negotiables.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";

const PAGES = ["index", "programmes", "carrieres", "ecole", "admissions", "entreprises", "brochure", "candidature", "evenements", "contact", "parents", "programme/bachelor-ia-business", "programme/bachelor-ia-business-3eme-annee-alternance", "programme/master-ia-business-alternance", "certification-architecte-ia", "certification-concepteur-solutions-no-code", "alternance", "financement", "processus-admission", "faq", "notre-adn", "campus/paris", "vie-etudiante", "entrepreneuriat", "approche-pedagogique", "methode-eugenia", "entreprises-partenaires", "recruter-nos-etudiants", "projets-entreprises", "projets-entreprises/dust-hackathon", "projets-entreprises/mistral-ai-hackathon", "projets-entreprises/openai-hackathon", "portfolio"];
const html = (name) => {
  const file = `dist/${name}.html`;
  const nestedFile = `dist/${name}/index.html`;
  const output = existsSync(file) ? file : nestedFile;
  assert.ok(existsSync(output), `${file} missing: run pnpm build`);
  return readFileSync(output, "utf8");
};
const count = (s, re) => (s.match(re) ?? []).length;
for (const page of ["index", "entreprises", "carrieres"]) {
  test(`${page}: rotating heading has static fallback, complete accessible labels and pause`, () => {
    const h = html(page);
    const headings = h.match(/<h2[^>]*class="rot h2"[\s\S]*?<\/h2>/g) ?? [];
    assert.equal(headings.length, 1);
    for (const heading of headings) {
    assert.equal(count(heading, /class="rot__item is-active"/g), 1, "one visible item without JS");
    assert.equal(count(heading, /class="rot__item(?: is-active)?"/g), 6);
    assert.match(heading, /aria-hidden="true"/);
    const accessible = decodeEntities(heading.match(/class="sr-only"[^>]*>([^<]+)</)?.[1] ?? "");
    for (const match of heading.matchAll(/alt="([^"]+)"/g)) assert.ok(accessible.includes(decodeEntities(match[1])));
    for (const match of heading.matchAll(/<span>([^<]+)<\/span>/g)) assert.ok(accessible.includes(decodeEntities(match[1])));
    assert.doesNotMatch(heading, /aria-live/);
    }
    assert.match(h, /<button[^>]*class="rot__pause"[^>]*aria-pressed="false"[^>]*>Mettre en pause<\/button>/);
  });
}
test("career logo wall has 12 fixed slots, the full colour list and a show-all link", () => {
  const h = html("carrieres");
  const employers = h.match(/<ul class="logo-flow__static"[\s\S]*?<\/ul>/)?.[0] ?? "";
  for (const company of ["Accenture", "Alan", "Carrefour", "Air France", "Microsoft", "Salesforce"]) {
    assert.ok(employers.includes(company));
  }
  assert.equal(count(employers, /<li[\s>]/g), 36);
  assert.equal(count(employers, /class="gray"/g), 0);
  assert.equal(count(h, /class="logo-flow__cell"/g), 12);
  assert.match(h, /class="logo-flow__motion" aria-hidden="true"/);
  assert.match(h, /class="logo-flow__pause"/);
  assert.match(h, /Voir toutes les entreprises/);
  assert.match(h, /data-remaining[^>]*>24</);
  assert.match(h, /id="alumni-title"/);
});
const filesUnder = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
const decodeEntities = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

for (const name of PAGES) {
  test(`${name}: exactly one <h1>, a <title> and a meta description`, () => {
    const h = html(name);
    assert.equal(count(h, /<h1[\s>]/g), 1);
    assert.equal(count(h, /<title>[^<]+<\/title>/g), 1);
    assert.equal(count(h, /<meta name="description" content="[^"]+"/g), 1);
    assert.equal(count(h, /<link rel="canonical"/g), 1);
  });

  test(`${name}: no trace of the old visual system`, () => {
    const h = html(name);
    for (const forbidden of ["Barlow", "DM Mono", "DM Sans", "#111", "#a81534", "text-transform: uppercase", "text-transform:uppercase"]) {
      assert.ok(!h.includes(forbidden), `found ${forbidden}`);
    }
    assert.ok(!/>\s*\/\/\s/.test(h), "found a '//' label");
  });

  test(`${name}: every image has an alt attribute and lazy loading except the hero`, () => {
    const h = html(name);
    const imgs = h.match(/<img\b[^>]*>/g) ?? [];
    assert.ok(imgs.length > 0);
    for (const tag of imgs) assert.ok(/\balt(=|\s|>)/.test(tag), `missing alt: ${tag.slice(0, 120)}`);
    const eager = imgs.filter((t) => /loading="eager"/.test(t));
    assert.ok(eager.length <= 3, `too many eager images: ${eager.length}`);
  });

  test(`${name}: structured data is valid JSON`, () => {
    const h = html(name);
    const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.equal(blocks.length, 1);
    for (const [, json] of blocks) JSON.parse(json);
  });
}

for (const name of ["index", "programmes", "carrieres", "ecole", "admissions", "entreprises"]) {
  test(`${name}: the visit continues and the header is there`, () => {
    const h = html(name);
    assert.ok(h.includes("Continuer la visite"));
    assert.ok(h.includes('aria-label="Navigation principale"'));
  });
}

test("home: carousel has 5 slides and accessible controls, no autoplay", () => {
  const h = html("index");
  assert.equal(count(h, /<article[^>]*\bdata-slide\b/g), 5);
  assert.ok(h.includes('aria-label="Témoignage précédent"'));
  assert.ok(h.includes('aria-label="Témoignage suivant"'));
  assert.equal(count(h, /role="tab"/g), 5);
  assert.ok(!/autoplay|setInterval/.test(h));
});

test("admissions: FAQ accordion exposes aria-expanded and one FAQPage schema", () => {
  const h = html("admissions");
  assert.ok(count(h, /aria-expanded="(true|false)"/g) >= 6);
  assert.ok(h.includes('"@type":"FAQPage"'));
});

test("form pages embed the school's existing HubSpot forms", () => {
  const expected = {
    brochure: "6a2d0bc7-da08-4fc0-a33b-57c7901f0d8d",
    candidature: "636c087a-248a-470d-8e70-b50dd08a73b8",
    evenements: "2a34a111-a00d-45dc-8eb8-f2f3def58085",
    contact: "43012bf9-3f27-415c-a452-e5351d4c9299",
  };
  for (const [page, id] of Object.entries(expected)) {
    const h = html(page);
    assert.ok(h.includes(`data-hs-form-id="${id}"`), `${page} does not embed form ${id}`);
    assert.ok(h.includes('data-hs-portal="25517078"'));
  }
});

test("remaining legacy redirect exists and is configured for static hosting", () => {
  for (const file of ["dist/trajectoires.html"]) {
    assert.ok(existsSync(file), `${file} missing`);
  }
  const r = readFileSync("public/_redirects", "utf8");
  assert.ok(r.includes("/trajectoires  /carrieres  301"));
});

test("parents: entirely « vous », no unvalidated fact, linked from footer and Parent card", () => {
  const h = html("parents");
  assert.ok(!h.includes("[À confirmer"), "placeholder leaked on /parents");
  const body = h.split("<main")[1]?.split("</main>")[0] ?? h;
  const text = body.replace(/<[^>]+>/g, " ");
  assert.ok(!/\b(ton|ta|tes|tu)\b/i.test(text.replace(/Eugenia|Continuer la visite/g, "")), "tutoiement found on /parents");
  assert.ok(html("index").includes('href="/parents"'));
});

const builtPages = filesUnder("dist")
  .filter((file) => file.endsWith(".html"))
  .map((file) => ({ file, source: readFileSync(file, "utf8") }))
  .filter(({ source }) => !/http-equiv="refresh"/i.test(source));

test("every built page has unique SEO metadata and one organization graph", () => {
  const titles = [];
  const descriptions = [];

  for (const { file, source } of builtPages) {
    const title = decodeEntities(source.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
    const description = decodeEntities(source.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    const canonical = source.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const robots = source.match(/<meta name="robots" content="([^"]+)"/)?.[1];
    const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

    assert.ok(title, `${file}: missing title`);
    assert.ok(title.length >= 50 && title.length <= 60, `${file}: title length ${title.length}: ${title}`);
    assert.ok(description.length >= 140 && description.length <= 155, `${file}: description length ${description.length}: ${description}`);
    assert.ok(canonical, `${file}: missing canonical`);
    assert.ok(robots, `${file}: missing robots meta`);
    assert.equal(count(source, /<link rel="canonical"/g), 1, `${file}: canonical count`);
    assert.equal(blocks.length, 1, `${file}: JSON-LD count`);

    const schema = JSON.parse(blocks[0][1]);
    assert.ok(Array.isArray(schema["@graph"]), `${file}: missing @graph`);
    assert.ok(
      schema["@graph"].some((entity) => entity["@type"] === "CollegeOrUniversity" && entity["@id"] === "https://www.eugeniaschool.com/#organization"),
      `${file}: missing organization entity`,
    );
    assert.ok(!source.includes("EducationalOrganization"), `${file}: legacy organization type`);
    assert.ok(!source.includes('"Course"'), `${file}: legacy Course type`);

    const isHome = file === "dist/index.html";
    const isNotFound = file === "dist/404.html";
    const breadcrumb = schema["@graph"].find((entity) => entity["@type"] === "BreadcrumbList");
    if (isHome || isNotFound) {
      assert.equal(breadcrumb, undefined, `${file}: unexpected breadcrumb`);
    } else {
      assert.ok(breadcrumb, `${file}: missing breadcrumb`);
      assert.equal(breadcrumb.itemListElement.at(-1)?.item, canonical, `${file}: breadcrumb does not end at canonical`);
    }

    assert.ok(source.includes("GTM-KH6RQW8"), `${file}: missing GTM container`);
    assert.ok(source.includes("G-9GX0407BZB"), `${file}: missing GA4 id`);
    assert.ok(source.includes('src="https://www.googletagmanager.com/ns.html?id=GTM-KH6RQW8"'), `${file}: missing GTM noscript iframe`);
    assert.ok(!source.includes("À confirmer"), `${file}: unconfirmed text leaked`);
    titles.push(title);
    descriptions.push(description);
  }

  assert.ok(builtPages.length > 0, "no built HTML pages found");
  assert.equal(new Set(titles).size, titles.length, "duplicate page title");
  assert.equal(new Set(descriptions).size, descriptions.length, "duplicate meta description");
});

test("404 is noindex and robots.txt names the required crawlers", () => {
  const notFound = html("404");
  assert.ok(notFound.includes('<meta name="robots" content="noindex, follow"'));
  const robots = readFileSync("dist/robots.txt", "utf8");
  for (const bot of ["*", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"]) {
    assert.ok(robots.includes(`User-agent: ${bot}`), `robots.txt missing ${bot}`);
  }
  assert.ok(robots.includes("Disallow: /studio"));
  assert.ok(robots.includes("Sitemap: https://www.eugeniaschool.com/sitemap-index.xml"));
});

test("sitemap excludes 404 and every configured redirect source", () => {
  const config = readFileSync("astro.config.ts", "utf8");
  const block = config.match(/const redirects = \{([\s\S]*?)\} as const/);
  assert.ok(block, "redirect map not found in astro.config.ts");
  const redirectSources = [...block[1].matchAll(/^\s*"([^"]+)"\s*:\s*"([^"]+)",?\s*$/gm)].map(([, source]) => source);
  const sitemapFiles = filesUnder("dist").filter((file) => /sitemap.*\.xml$/.test(file));
  const sitemap = sitemapFiles.map((file) => readFileSync(file, "utf8")).join("\n");

  assert.ok(sitemapFiles.length > 0, "sitemap not generated");
  assert.ok(!sitemap.includes("https://www.eugeniaschool.com/404"), "sitemap contains /404");
  for (const source of redirectSources) {
    assert.ok(!sitemap.includes(`https://www.eugeniaschool.com${source}`), `sitemap contains redirect source ${source}`);
  }
});

test("llms files do not contain unconfirmed copy", () => {
  for (const file of ["dist/llms.txt", "dist/llms-full.txt"]) {
    assert.ok(existsSync(file), `${file} missing`);
    assert.ok(!readFileSync(file, "utf8").includes("À confirmer"), `${file} contains unconfirmed copy`);
  }
});

const NEW_PAGES = [
  ["programme/bachelor-ia-business", "Bachelor AI Applied to Business"],
  ["programme/bachelor-ia-business-3eme-annee-alternance", "Quatre jours sur cinq, en entreprise."],
  ["programme/master-ia-business-alternance", "MSc IA Appliquée au Business"],
  ["certification-architecte-ia", "Certification Architecte IA"],
  ["certification-concepteur-solutions-no-code", "Certification No code"],
  ["alternance", "Ton alternance, de A à Z."],
  ["financement", "Financer Eugenia School."],
  ["processus-admission", "Candidater. Bachelor ou MSc."],
  ["faq", "Tu as des questions."],
];
const lot3 = JSON.parse(readFileSync("src/data/pages/lot3.json", "utf8"));
const LOT3_PAGES = Object.entries(lot3).map(([route, entry]) => [route, entry.page.h1]);

test("lot 3 pages do not repeat content image sources", () => {
  for (const [route] of Object.entries(lot3)) {
    const images = html(route).match(/<img\b[^>]*>/g) ?? [];
    const sources = images
      .map((image) => image.match(/\bsrc="([^"]*l3_[^"]+)"/)?.[1])
      .filter((source) => source && !source.includes("l3_logo_"));
    assert.equal(new Set(sources).size, sources.length, `${route}: duplicate content image source`);
  }
});

const plainText = (htmlText) =>
  decodeEntities(htmlText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

test("new routes are real pages with their live H1 and visible breadcrumbs", () => {
  for (const [route, expectedH1] of [...NEW_PAGES, ...LOT3_PAGES]) {
    const source = html(route);
    assert.ok(!/http-equiv="refresh"/i.test(source), `${route} is a redirect stub`);
    const h1 = source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
    assert.equal(plainText(h1), expectedH1, `${route}: H1 differs from the live extraction`);
    assert.match(source, /<nav\b[^>]*aria-label="Fil d'Ariane"/, `${route}: missing visible breadcrumb`);
    assert.ok(source.includes('aria-current="page"'), `${route}: current breadcrumb is not marked`);
  }
});

test("lot 3 metadata matches the extraction and stays within the live length targets", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [route, { page }] of Object.entries(lot3)) {
    const source = html(route);
    const title = decodeEntities(source.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
    const description = decodeEntities(source.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    assert.equal(title, page.title, `${route}: title differs from extraction`);
    assert.equal(description, page.description, `${route}: description differs from extraction`);
    assert.ok(title.length >= 50 && title.length <= 60, `${route}: title length ${title.length}`);
    assert.ok(description.length >= 140 && description.length <= 155, `${route}: description length ${description.length}`);
    assert.ok(!titles.has(title), `${route}: duplicate title`);
    assert.ok(!descriptions.has(description), `${route}: duplicate description`);
    titles.add(title);
    descriptions.add(description);
  }
});

test("lot 3 project breadcrumbs match the live hierarchy", () => {
  const expected = {
    "projets-entreprises": ["Accueil", "Entreprises", "Projets avec les entreprises"],
    "projets-entreprises/mistral-ai-hackathon": ["Accueil", "Entreprises", "Projets avec les entreprises", "Hackathon Mistral AI, Make et Malt"],
    "projets-entreprises/openai-hackathon": ["Accueil", "Entreprises", "Projets avec les entreprises", "Hackathon Mirakl et OpenAI"],
    "projets-entreprises/dust-hackathon": ["Accueil", "Entreprises", "Projets avec les entreprises", "Hackathon Dust"],
  };
  const expectedHrefs = {
    "projets-entreprises": ["/", "/entreprises"],
    "projets-entreprises/mistral-ai-hackathon": ["/", "/entreprises", "/projets-entreprises"],
    "projets-entreprises/openai-hackathon": ["/", "/entreprises", "/projets-entreprises"],
    "projets-entreprises/dust-hackathon": ["/", "/entreprises", "/projets-entreprises"],
  };
  for (const [route, labels] of Object.entries(expected)) {
    const source = html(route);
    const nav = source.match(/<nav\b(?=[^>]*aria-label="Fil d'Ariane")[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
    const crumbs = [...nav.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>|<span\b[^>]*aria-current="page"[^>]*>([\s\S]*?)<\/span>/g)]
      .map((match) => plainText(match[1] ?? match[2] ?? ""));
    assert.deepEqual(crumbs, labels, `${route}: breadcrumb labels differ`);
    const hrefs = [...nav.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(hrefs, expectedHrefs[route], `${route}: breadcrumb links differ`);
  }
});

test("lot 3 route anchors are stored in page data", () => {
  for (const [route, id] of [
    ["approche-pedagogique", "equipe"],
    ["methode-eugenia", "cas"],
    ["entreprises-partenaires", "devenir-partenaire"],
    ["projets-entreprises", "projets"],
    ["portfolio", "portfolios"],
    ["recruter-nos-etudiants", "formulaire"],
    ["recruter-nos-etudiants", "besoin"],
  ]) {
    assert.ok(html(route).includes(`id="${id}"`), `${route}: missing ${id} anchor`);
  }
});

test("recruiter page renders the live HubSpot form at the formulaire anchor", () => {
  const source = html("recruter-nos-etudiants");
  const formSection = source.match(/<section\b(?=[^>]*id="formulaire")[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
  assert.ok(formSection, "recruiter page: #formulaire must resolve to a section");
  assert.match(formSection, /class="hs-form"[^>]*data-hs-portal="25517078"[^>]*data-hs-region="eu1"[^>]*data-hs-form-id="b98543e3-c9ae-49d6-99bc-7c0418dd95ba"/);
  assert.ok(formSection.includes('id="besoin"'), "recruiter page: #besoin must also resolve inside the form section");
  assert.doesNotMatch(source, /<h1\b[^>]*id="formulaire"/, "the formulaire anchor belongs to the form section, not the hero");
  const ctas = [...source.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .map(([, attributes, label]) => ({ href: attributes.match(/\bhref="([^"]+)"/)?.[1], label: plainText(label) }))
    .filter(({ label }) => ["Décrire mon besoin ↑", "Déposer une offre"].includes(label));
  assert.ok(ctas.some(({ label }) => label === "Décrire mon besoin ↑"), "recruiter page: missing upward need CTA");
  for (const cta of ctas) assert.equal(cta.href, "#formulaire", `${cta.label} must point to #formulaire`);
});

test("portfolio card-group content is visible inside main", () => {
  const source = html("portfolio");
  const main = source.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const visible = plainText(main);
  for (const title of [
    "RAG sur la documentation Claude Code",
    "Synapse",
    "IKORY",
    "Shine Santé, plateforme B2B",
  ]) {
    assert.ok(visible.includes(title), `portfolio: missing visible card title ${title}`);
  }
  for (const copy of [
    "Un workflow n8n qui ingère la documentation de Claude Code et répond aux questions en temps réel.",
    "Un chatbot RAG pour explorer les thèses de theses.fr.",
    "Des workflows n8n et des agents IA qui ramènent l’analyse de plus de 150 biens immobiliers de plusieurs heures à moins de 5 minutes.",
    "Une plateforme e-commerce B2B sur Shopify pour un importateur de parapharmacie : prix par palier, vérification SIRET, précommandes et stock synchronisé en temps réel avec Axonaut.",
  ]) {
    assert.ok(visible.includes(copy), `portfolio: missing card text ${copy}`);
  }
});

test("project and related hackathon récit cards link to their case studies", () => {
  const targets = {
    "projets-entreprises": [
      "/projets-entreprises/mistral-ai-hackathon",
      "/projets-entreprises/openai-hackathon",
      "/projets-entreprises/dust-hackathon",
    ],
    "projets-entreprises/mistral-ai-hackathon": [
      "/projets-entreprises/openai-hackathon",
      "/projets-entreprises/dust-hackathon",
    ],
    "projets-entreprises/openai-hackathon": [
      "/projets-entreprises/mistral-ai-hackathon",
      "/projets-entreprises/dust-hackathon",
    ],
    "projets-entreprises/dust-hackathon": [
      "/projets-entreprises/mistral-ai-hackathon",
      "/projets-entreprises/openai-hackathon",
    ],
  };
  for (const [route, hrefs] of Object.entries(targets)) {
    const main = html(route).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const links = [...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
      .map(([, attributes, label]) => ({
        href: attributes.match(/\bhref="([^"]+)"/)?.[1],
        label: plainText(label),
      }));
    for (const href of hrefs) {
      assert.ok(links.some((link) => link.href === href && link.label === "Lire le récit"), `${route}: missing Lire le récit link to ${href}`);
    }
  }
});

test("portfolio filter chips match items in the live first-seen order", () => {
  const source = html("portfolio");
  const main = source.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const items = lot3.portfolio.page.sections.flatMap((section) =>
    section.blocks.filter((block) => block.type === "card-group").flatMap((block) => block.cards),
  );
  const cards = [...main.matchAll(/<(?:a|article)\b([^>]*class="[^"]*portfolio-gallery__card[^"]*"[^>]*)>/g)]
    .map(([, attributes]) => Object.fromEntries(["stack", "program", "type"].map((key) => [
      key,
      decodeEntities(attributes.match(new RegExp(`\\bdata-${key}="([^"]*)"`))?.[1] ?? "").split("|").filter(Boolean),
    ])));
  const groups = [...main.matchAll(/<fieldset\b[^>]*data-filter-group="([^"]+)"[^>]*>([\s\S]*?)<\/fieldset>/g)];
  for (const [, key, contents] of groups) {
    const expected = [...new Set(items.flatMap((item) => item.filters[key] ?? []))];
    const actual = [...contents.matchAll(/data-filter-value="([^"]+)"/g)].map(([, value]) => decodeEntities(value));
    assert.deepEqual(actual, expected, `${key}: chips must follow first-seen item values`);
    for (const value of actual) {
      assert.ok(cards.some((card) => card[key].includes(value)), `${key}=${value} must match at least one portfolio`);
    }
  }
  assert.equal(groups.length, 3, "portfolio must render all filter groups");
});

test("lot 3 ContinueVisit cards follow non-self built routes and destination metadata", () => {
  for (const entry of Object.values(lot3)) {
    const ownPath = `/${entry.route.replace(/^\/+/, "")}`;
    const { href, title, text } = entry.page.next;
    assert.notEqual(href, ownPath, `${ownPath}: ContinueVisit must not link to itself`);
    const destination = html(href.replace(/^\/+/, ""));
    const h1 = destination.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
    const description = destination.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "";
    assert.equal(plainText(h1), title, `${ownPath}: ContinueVisit title must match ${href}`);
    assert.equal(decodeEntities(description), text, `${ownPath}: ContinueVisit text must match ${href}`);
  }
});

test("lot 3 image assets derive from each live source basename", () => {
  const images = [];
  const collect = (value) => {
    if (Array.isArray(value)) return value.forEach(collect);
    if (!value || typeof value !== "object") return;
    if (value.type === "image") images.push({ ...value, assetName: value.name });
    if (value.type === "portfolio-grid") images.push(...value.items.map((item) => ({ ...item, assetName: item.image })));
    Object.values(value).forEach(collect);
  };
  Object.values(lot3).forEach((entry) => collect(entry.page.sections));
  for (const image of images) {
    assert.ok(image.liveSrc, `missing liveSrc for ${image.name}`);
    const sourceBase = new URL(image.liveSrc).pathname.split("/").pop().replace(/\.[^.]+$/, "");
    const expected = image.logo
      ? `l3_logo_${sourceBase.replace(/\.[a-z0-9_-]{8}$/i, "").replace(/^(?:partner-|dd-|logo-)/i, "").replace(/-logo$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`
      : `l3_${sourceBase}`;
    assert.equal(image.assetName, expected, `${image.liveSrc} must determine the local asset name`);
    assert.ok(existsSync(`src/assets/images/${image.assetName}.webp`), `missing asset ${image.assetName}.webp`);
  }
  assert.ok(images.length > 100, "all lot-3 page images should be covered");
});

test("school and company hubs use the requested link cards", () => {
  const schoolNav = html("ecole").match(/<nav\b(?=[^>]*aria-labelledby="school-explore-label")[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
  const schoolLinks = [
    ["Notre ADN", lot3["notre-adn"].page.description],
    ["Le campus de Paris", lot3["campus/paris"].page.description],
    ["Vie étudiante", lot3["vie-etudiante"].page.description],
    ["Approche pédagogique et professeurs", lot3["approche-pedagogique"].page.description],
    ["La méthode QCOR", lot3["methode-eugenia"].page.description],
    ["Entrepreneuriat", lot3.entrepreneuriat.page.description],
    ["Portfolios étudiants", lot3.portfolio.page.description],
  ];
  assert.ok(schoolNav.includes("Explorer l'école"));
  assert.doesNotMatch(html("ecole"), /class="lnk-row"/);
  for (const [label, description] of schoolLinks) {
    assert.ok(plainText(schoolNav).includes(label), `/ecole: missing ${label}`);
    assert.ok(plainText(schoolNav).includes(description), `/ecole: missing live description for ${label}`);
  }

  const companySource = html("entreprises");
  const companyNav = companySource.match(/<nav\b(?=[^>]*aria-labelledby="hack-title")[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
  const projectLinks = [
    ["Tous les projets avec les entreprises", lot3["projets-entreprises"].page.description],
    ["Hackathon Mistral AI, Make et Malt", lot3["projets-entreprises/mistral-ai-hackathon"].page.description],
    ["Hackathon Mirakl × OpenAI", lot3["projets-entreprises/openai-hackathon"].page.description],
    ["Dust Customers Hackathon", lot3["projets-entreprises/dust-hackathon"].page.description],
  ];
  assert.doesNotMatch(companySource, /class="lnk-row"/);
  for (const [label, description] of projectLinks) {
    assert.ok(plainText(companyNav).includes(label), `/entreprises: missing ${label}`);
    assert.ok(plainText(companyNav).includes(description), `/entreprises: missing live description for ${label}`);
  }
});

test("case studies mirror live Article fields without inferred dates", () => {
  for (const route of ["projets-entreprises/dust-hackathon", "projets-entreprises/mistral-ai-hackathon", "projets-entreprises/openai-hackathon"]) {
    const source = html(route);
    const canonical = source.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const schema = JSON.parse(source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "{}");
    const article = schema["@graph"].find((entity) => entity["@type"] === "Article");
    assert.ok(article, `${route}: Article schema missing`);
    assert.equal(article.author["@id"], "https://www.eugeniaschool.com/#organization");
    assert.equal(article.publisher["@id"], "https://www.eugeniaschool.com/#organization");
    assert.equal(article.mainEntityOfPage, canonical);
    assert.ok(article.image.startsWith("https://www.eugeniaschool.com/"), `${route}: Article image must be an absolute site URL`);
    assert.match(article.image, /^https:\/\/www\.eugeniaschool\.com\/_astro\/.+\.(?:webp|avif|png|jpg)$/);
    assert.ok(!("datePublished" in article));
    assert.ok(!("dateModified" in article));
  }
});

test("projects collection lists all three case-study URLs", () => {
  const source = html("projets-entreprises");
  const schema = JSON.parse(source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "{}");
  const collection = schema["@graph"].find((entity) => entity["@type"] === "CollectionPage");
  const items = collection?.mainEntity?.itemListElement?.map((item) => item.url) ?? [];
  assert.deepEqual(items.sort(), [
    "https://www.eugeniaschool.com/projets-entreprises/dust-hackathon",
    "https://www.eugeniaschool.com/projets-entreprises/mistral-ai-hackathon",
    "https://www.eugeniaschool.com/projets-entreprises/openai-hackathon",
  ].sort());
});

test("financing fee tables follow their programme headings", () => {
  const source = html("financement");
  const bachelorHeading = source.match(/<h3\b[^>]*>\s*Bachelor Programme\s*<\/h3>/i);
  const bachelorHeadingIndex = bachelorHeading?.index ?? -1;
  const mscEyebrow = source.indexOf("MSc · Alternance", bachelorHeadingIndex);
  const bachelorTable = [...source.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/g)]
    .find(([table]) => plainText(table).includes("14 900€") && plainText(table).includes("16 900€"));
  assert.ok(bachelorHeading, "missing Bachelor Programme heading");
  assert.ok(bachelorTable, "missing Bachelor fee table");
  assert.ok(mscEyebrow > bachelorHeadingIndex, "MSc · Alternance eyebrow must follow the Bachelor heading");
  assert.ok(bachelorTable.index > bachelorHeadingIndex && bachelorTable.index < mscEyebrow, "Bachelor fee table must follow its heading and precede the MSc eyebrow");
});

test("programme pages render direct answers, static facts and required program schemas", () => {
  const expectations = [
    [
      "programme/bachelor-ia-business",
      "P3Y",
      "41143",
      "Le Bachelor AI Applied to Business est un Bac+3 en trois ans (180 ECTS), à Paris, hors Parcoursup, ouvert après une terminale générale ou technologique. Business, data, code et no-code : un projet en entreprise dès le semestre 1, un stage de 6 semaines en 1re année, une 3e année possible en alternance. Titre RNCP 41143 (niveau 6).",
    ],
    [
      "programme/bachelor-ia-business-3eme-annee-alternance",
      "P1Y",
      "41143",
      "La 3e année du Bachelor AI Applied to Business se suit en alternance pendant un an, à Paris, dès un Bac+2 (BTS, BUT, L2, école de commerce ou d'informatique). Après un bootcamp de 5 semaines : 4 jours en entreprise, 1 jour à l'école. Rentrée en septembre. Titre RNCP 41143 (niveau 6), délivré par LION.",
    ],
    [
      "programme/master-ia-business-alternance",
      "P2Y",
      "41993",
      "Le MSc IA Appliquée au Business est un Bac+5 en deux ans (120 ECTS), 100 % en alternance, à Paris, accessible après un Bac+3 en M1 ou un Bac+4 en M2. Après un bootcamp de 5 semaines : 4 jours en entreprise, 1 jour à l'école. Titre RNCP 41993 (niveau 7), Architecte en intelligence artificielle, délivré par JEDHA.",
    ],
  ];
  for (const [route, duration, rncp, expectedAnswer] of expectations) {
    const source = html(route);
    const answer = source.match(/<p\b[^>]*data-answer(?:="")?[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "";
    const words = plainText(answer).split(/\s+/).filter(Boolean);
    assert.ok(words.length >= 40 && words.length <= 60, `${route}: direct answer has ${words.length} words`);
    assert.equal(plainText(answer), expectedAnswer, `${route}: direct answer differs from the authoritative copy`);
    assert.match(source, /<dl\b[^>]*class="facts__grid"/, `${route}: facts are not rendered as a definition list`);
    const schema = JSON.parse(source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "{}");
    const program = schema["@graph"].find((entity) => entity["@type"] === "EducationalOccupationalProgram");
    assert.ok(program, `${route}: missing EducationalOccupationalProgram`);
    assert.ok(program.name);
    assert.ok(program.description);
    assert.ok(program.url);
    assert.equal(program.timeToComplete, duration);
    assert.equal(program.inLanguage, "fr");
    assert.ok(String(program.educationalCredentialAwarded).includes(rncp));
    assert.ok(program.programPrerequisites);
    assert.deepEqual(program.provider, { "@id": "https://www.eugeniaschool.com/#organization" });
  }
  const bachelorSchema = JSON.parse(html("programme/bachelor-ia-business").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "{}");
  const bachelor = bachelorSchema["@graph"].find((entity) => entity["@type"] === "EducationalOccupationalProgram");
  assert.deepEqual(bachelor.offers.map((offer) => offer.price), ["14900", "16900"]);
  assert.equal(bachelor.startDate, "2027-08-30");
});

test("FAQ and alternance FAQPage data exactly match visible questions and answers", () => {
  const normalize = (value) => plainText(value).replace(/\s+/g, " ").trim();
  for (const route of ["faq", "alternance"]) {
    const source = html(route);
    const schema = JSON.parse(source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "{}");
    const faq = schema["@graph"].find((entity) => entity["@type"] === "FAQPage");
    assert.ok(faq, `${route}: missing FAQPage`);
    const visibleItems = [...source.matchAll(/<div class="faq-item"[^>]*>([\s\S]*?)<\/div>/g)].map(([, item]) => item);
    const questions = visibleItems.map((item) => normalize(item.match(/<button\b[^>]*class="faq-item__btn[^"]*"[^>]*>([\s\S]*?)<\/button>/)?.[1] ?? ""));
    const answers = visibleItems.map((item) => normalize(item.match(/<p\b[^>]*class="faq-item__a"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? ""));
    assert.deepEqual(faq.mainEntity.map((item) => normalize(item.name)), questions);
    assert.deepEqual(faq.mainEntity.map((item) => normalize(item.acceptedAnswer.text)), answers);
    if (route === "alternance") assert.equal(faq.mainEntity.length, 5);
    if (route === "faq") {
      const inserjeunes = visibleItems.find((item) => item.includes("Inserjeunes"));
      const url = "https://www.inserjeunes.education.gouv.fr/diffusion/accueil";
      assert.match(inserjeunes ?? "", new RegExp(`<a\\b(?=[^>]*href="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}")(?=[^>]*target="_blank")(?=[^>]*rel="noopener")[^>]*>${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/a>`));
      const answer = faq.mainEntity.find((item) => item.name.includes("Inserjeunes"))?.acceptedAnswer.text ?? "";
      assert.ok(answer.includes(url));
      assert.ok(!answer.includes("<a"));
    }
  }
});

test("Bachelor B3 curriculum matches the dedicated third-year page", () => {
  const bachelor = html("programme/bachelor-ia-business");
  const bachelor3 = html("programme/bachelor-ia-business-3eme-annee-alternance");
  const semesterHeadings = (source) => [...source.matchAll(/<h4 id="semester-B3-[12]"[^>]*>([\s\S]*?)<\/h4>/g)].map(([, value]) => plainText(value));
  const courseCodes = (source) => [...source.matchAll(/class="curriculum__course-code"[^>]*>([^<]*)<\/span>/g)].map(([, value]) => plainText(value));
  const modules = (source) => [...source.matchAll(/<details class="curriculum__module"[^>]*>([\s\S]*?)<\/details>/g)].map(([, value]) => plainText(value));
  assert.deepEqual(semesterHeadings(bachelor), semesterHeadings(bachelor3));
  const b3Codes = courseCodes(bachelor3);
  assert.ok(b3Codes.length > 0);
  assert.deepEqual(courseCodes(bachelor).slice(-b3Codes.length), b3Codes);
  const b3Modules = modules(bachelor3);
  assert.ok(b3Modules.length > 0);
  assert.deepEqual(modules(bachelor).slice(-b3Modules.length), b3Modules);
});

test("new programme routes are no longer redirect sources", () => {
  const redirects = readFileSync("public/_redirects", "utf8");
  const config = readFileSync("astro.config.ts", "utf8");
  for (const [route] of NEW_PAGES.slice(0, 3)) {
    const path = `/${route}`;
    assert.ok(!redirects.includes(`${path}  `), `${path} remains in public redirects`);
    assert.ok(!config.includes(`"${path}"`), `${path} remains in Astro redirects`);
  }
});
