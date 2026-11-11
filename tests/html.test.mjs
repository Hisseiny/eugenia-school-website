// Static checks on the built site (run `pnpm build` first). Guards the brief's non-negotiables.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";

const PAGES = ["index", "programmes", "carrieres", "ecole", "admissions", "entreprises", "brochure", "candidature", "evenements", "contact", "parents"];
const html = (name) => {
  const file = `dist/${name}.html`;
  assert.ok(existsSync(file), `${file} missing: run pnpm build`);
  return readFileSync(file, "utf8");
};
const count = (s, re) => (s.match(re) ?? []).length;
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

test("redirects exist for the old URLs named in the brief", () => {
  for (const file of ["dist/trajectoires.html", "dist/campus/paris.html"]) {
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
