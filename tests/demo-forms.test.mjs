import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

test("default build contains no tracking identifiers, domains or HubSpot URLs, including bundled assets", () => {
  const artifacts = files("dist").filter(path => /\.(?:html|m?js|css|json|map|svg|xml|txt)$/i.test(path));
  assert.ok(artifacts.some(path => path.endsWith(".html")), "run pnpm build first");
  assert.ok(artifacts.some(path => path.endsWith(".js")), "check bundled JavaScript too");
  for (const path of artifacts) {
    assert.doesNotMatch(readFileSync(path, "utf8"),
      /(?:googletagmanager|GTM-|G-9GX0407BZB|google-analytics|hs-scripts|hs-analytics|hsforms|hscollectedforms|hsadspixel|hubapi\.com|track\.hubspot|facebook\.net|facebook\.com\/tr)/i, path);
  }
});

test("every default form stays visible and cannot submit natively without JavaScript", () => {
  let premium = 0;
  let recruiter = 0;
  for (const path of files("dist").filter(path => path.endsWith(".html"))) {
    const html = readFileSync(path, "utf8");
    for (const [form] of html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)) {
      if (!form.includes("data-premium-form")) continue;
      assert.match(form, /method="dialog"/, path);
      assert.doesNotMatch(form, /\baction=/, path);
      assert.match(form, /data-demo-notice[^>]*>Mode démo : aucune réponse ne sera envoyée\./, path);
      assert.match(form, /<input\b/, path);
      assert.match(form, /type="submit"/, path);
      if (form.includes('data-form-kind="recruteur"')) recruiter++;
      else premium++;
    }
    assert.doesNotMatch(html, /<iframe[^>]*(?:hubspot|hsforms)/i, path);
  }
  assert.ok(premium >= 4, "the multi-step forms are still rendered");
  assert.ok(recruiter >= 1, "the recruiter form is rendered locally");
});
