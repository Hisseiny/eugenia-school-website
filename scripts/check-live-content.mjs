import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const directory = process.argv[2];
if (!directory) {
  console.error("Usage: node scripts/check-live-content.mjs <extraction-directory>");
  process.exit(2);
}

const pages = [
  ["_programme_bachelor-ia-business.md", "programme/bachelor-ia-business"],
  ["_programme_bachelor-ia-business-3eme-annee-alternance.md", "programme/bachelor-ia-business-3eme-annee-alternance"],
  ["_programme_master-ia-business-alternance.md", "programme/master-ia-business-alternance"],
  ["_certification_architecte-ia.md", "certification-architecte-ia"],
  ["_certification_concepteur-solutions-no-code.md", "certification-concepteur-solutions-no-code"],
  ["_alternance.md", "alternance"],
  ["_financement.md", "financement"],
  ["_processus-admission.md", "processus-admission"],
  ["_faq.md", "faq"],
];

const entities = {
  amp: "&",
  apos: "'",
  nbsp: " ",
  eacute: "é",
  Eacute: "É",
  egrave: "è",
  Egrave: "È",
  agrave: "à",
  Agrave: "À",
  acirc: "â",
  ecirc: "ê",
  icirc: "î",
  ocirc: "ô",
  ucirc: "û",
  ccedil: "ç",
  Ccedil: "Ç",
  ugrave: "ù",
  ouml: "ö",
  oelig: "œ",
  OElig: "Œ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  laquo: "«",
  raquo: "»",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  quot: '"',
  lt: "<",
  gt: ">",
};
const decode = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z][a-z\d]+);/gi, (entity, name) => entities[name] ?? entity);
const normalize = (value) =>
  decode(value)
    .normalize("NFC")
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/«\s+/g, "«")
    .replace(/\s+»/g, "»")
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const cleanMarkdown = (value) =>
  normalize(
    value
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/`/g, "")
      .replace(/^#+\s*/, ""),
  );
const extractLines = (markdown) => {
  const pageContent = markdown.split("## Page content\n")[1]?.split("\n## CTA labels")[0];
  if (!pageContent) throw new Error("Missing ## Page content section");
  const lines = [];
  for (const line of pageContent.split(/\r?\n/)) {
    const value = line.trim();
    if (!value || value.startsWith("// ") || value.startsWith("[CTA:") || value.startsWith("[Image:") || value.startsWith("**Button:") || value.startsWith("**Expandable section:**")) continue;
    if (value.startsWith("|")) {
      if (/^\|[\s:|-]+\|$/.test(value)) continue;
      for (const cell of value.split("|").slice(1, -1)) {
        const text = cleanMarkdown(cell);
        if (text.length >= 4) lines.push(text);
      }
      continue;
    }
    const text = cleanMarkdown(value.replace(/^\*\*Question:\*\*\s*/, "").replace(/^\s*[-*]\s+/, ""));
    if (text.length >= 4) lines.push(text);
  }
  return lines;
};
const htmlText = (html) => {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return normalize(main.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " "));
};

let failed = false;
for (const [sourceName, route] of pages) {
  const markdownPath = join(directory, sourceName);
  const builtPath = join("dist", `${route}.html`);
  const fallbackPath = join("dist", route, "index.html");
  if (!existsSync(markdownPath)) throw new Error(`Missing extraction: ${markdownPath}`);
  const htmlPath = existsSync(builtPath) ? builtPath : fallbackPath;
  if (!existsSync(htmlPath)) throw new Error(`Missing built page: ${builtPath}`);
  const lines = extractLines(readFileSync(markdownPath, "utf8"));
  const content = htmlText(readFileSync(htmlPath, "utf8"));
  const missing = lines.filter((line) => !content.includes(line));
  const coverage = lines.length ? ((lines.length - missing.length) / lines.length) * 100 : 100;
  console.log(`${coverage >= 98 ? "OK" : "FAIL"} ${route}: ${lines.length - missing.length}/${lines.length} (${coverage.toFixed(1)}%)`);
  if (missing.length) {
    for (const line of missing) console.log(`  MISSING ${line}`);
  }
  if (coverage < 98) failed = true;
}
console.log("Intentional omissions: CTA/button/image inventory lines are excluded; closing CTA bands are represented by EndOfPage.");
process.exit(failed ? 1 : 0);
