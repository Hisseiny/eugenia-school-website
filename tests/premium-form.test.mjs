import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

test("primary action colors provide AA contrast with white normal-size text", () => {
  const css = readFileSync("src/styles/global.css", "utf8");
  const luminance = (hex) => {
    const rgb = hex.match(/../g).map((part) => parseInt(part, 16) / 255)
      .map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const token of ["red-action", "red-hover"]) {
    const hex = css.match(new RegExp(`--${token}: #([a-f0-9]{6})`))[1];
    assert.ok(1.05 / (luminance(hex) + 0.05) >= 4.5, token);
  }
  assert.match(css, /\.btn\s*\{[^}]*background: var\(--red-action\)/);
});

test("each form exposes named questions, progress, privacy and focusable confirmation", () => {
  for (const page of ["brochure", "candidature", "evenements", "contact"]) {
    const html = readFileSync(`dist/${page}.html`, "utf8");
    assert.match(html, /aria-live="polite" aria-atomic="true"/);
    assert.match(html, /data-pf-done-title tabindex="-1"/);
    assert.match(html, /Confidentialité et utilisation des données/);
    assert.doesNotMatch(html, /data-autonext/);
    const ids = [...html.matchAll(/<legend[^>]*id="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(ids.length >= 4);
    assert.equal(new Set(ids).size, ids.length);
    for (const id of ids) assert.ok(html.includes(`id="${id}" tabindex="-1"`));
  }
});

test("focused child-component inputs have independent full-width styling", () => {
  const css = readFileSync("src/styles/focus-form.css", "utf8");
  assert.match(css, /\.pf--focus \.pf__field\s*\{[^}]*display:\s*grid/);
  assert.match(css, /\.pf--focus \.pf__input\s*\{[^}]*width:\s*100%/);
  assert.match(css, /\.pf--focus \.pf__input\s*\{[^}]*min-height:\s*52px/);
});
