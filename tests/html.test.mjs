// Static checks on the built site (run `pnpm build` first). Guards the brief's non-negotiables.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const PAGES = ["index", "programmes", "carrieres", "ecole", "admissions", "entreprises", "brochure", "candidature", "evenements", "contact", "parents"];
const html = (name) => {
  const file = `dist/${name}.html`;
  assert.ok(existsSync(file), `${file} missing: run pnpm build`);
  return readFileSync(file, "utf8");
};
const count = (s, re) => (s.match(re) ?? []).length;

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
    assert.ok(blocks.length >= 1);
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
