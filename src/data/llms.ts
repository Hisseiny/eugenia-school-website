import { confirmedFaq, FAQ, STEPS } from "@/data/admissions";
import { BACHELOR_YEARS, COMPARE_ROWS, MSC_CHIPS } from "@/data/programmes";
import { ROUTES, SITE } from "@/data/site";
import { page as bachelor } from "@/data/pages/programme-bachelor-ia-business";
import { page as bachelor3 } from "@/data/pages/programme-bachelor-ia-business-3eme-annee-alternance";
import { page as msc } from "@/data/pages/programme-master-ia-business-alternance";
import { page as architecte } from "@/data/pages/certification-architecte-ia";
import { page as noCode } from "@/data/pages/certification-concepteur-solutions-no-code";
import { page as alternance } from "@/data/pages/alternance";
import { page as financement } from "@/data/pages/financement";
import { page as processus } from "@/data/pages/processus-admission";
import { page as faq } from "@/data/pages/faq";
import lot3 from "@/data/pages/lot3.json";

const absolute = (path: string) => new URL(path, `${SITE.url}/`).href;
const pages = [
  [bachelor, ROUTES.programmeBachelor],
  [bachelor3, ROUTES.programmeBachelor3],
  [msc, ROUTES.programmeMsc],
  [architecte, ROUTES.certificationArchitecteIA],
  [noCode, ROUTES.certificationNoCode],
] as const;
const programmeLines = pages.map(
  ([page, path]) => `- [${page.h1}](${absolute(path)}): ${page.lead ?? page.description}`,
);
const lot3Lines = Object.entries(lot3).map(([route, { page }]) =>
  `- [${page.h1}](${absolute(`/${route}`)}): ${page.lead ?? page.description}`,
);
const contactLinks = [
  ["Admissions", ROUTES.admissions],
  ["Alternance", ROUTES.alternance],
  ["Financement", ROUTES.financement],
  ["Processus d'admission", ROUTES.processusAdmission],
  ["FAQ", ROUTES.faq],
  ["Parents", ROUTES.parents],
  ["Brochure", ROUTES.brochure],
  ["Candidature", ROUTES.candidature],
  ["Événements", ROUTES.evenements],
  ["Contact", ROUTES.contact],
];
const overview = [
  "# Eugenia School",
  `> ${SITE.description}`,
  `${SITE.name} se trouve au ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}. Contact : ${SITE.contact.email} · ${SITE.contact.phone}.`,
  "## Programmes",
  ...programmeLines,
  "## Admissions et contact",
  ...contactLinks.map(([name, path]) => `- [${name}](${absolute(path)})`),
  "## École et entreprises",
  ...lot3Lines,
];
const pageFacts = [bachelor, bachelor3, msc, architecte, noCode].flatMap((page) => [
  `### ${page.h1}`,
  ...(page.lead ? [page.lead] : []),
  ...(page.facts ?? []).map((fact) => `- ${fact.label} : ${fact.value}`),
]);
const allFaq = faq.sections.flatMap((section) =>
  section.blocks.flatMap((block) => block.type === "faq" ? block.items : []),
);
const alternanceFaq = alternance.sections.flatMap((section) =>
  section.blocks.flatMap((block) => block.type === "faq" ? block.items : []),
);

export function buildLlmsText(full = false): string {
  if (!full) return `${overview.join("\n\n")}\n`;
  const programmeDetails = [
    "## Détails des programmes",
    "### Comparatif",
    ...COMPARE_ROWS.map((row) => `- ${row.label} : Bachelor — ${row.bachelor} ; MSc — ${row.msc}`),
    "### Années du Bachelor",
    ...BACHELOR_YEARS.map((year) => `- ${year.year} — ${year.title} : ${year.text}`),
    `### MSc : ${MSC_CHIPS.join(", ")}`,
    "## Pages programmes et certifications",
    ...pageFacts,
  ];
const admissionDetails = [
    "## Étapes d'admission",
    ...STEPS.map((step) => `- ${step.n} — ${step.title} : ${step.text} Ensuite : ${step.next}`),
    "## Questions fréquentes",
    ...confirmedFaq(FAQ).flatMap((item) => [`### ${item.q}`, item.a]),
    "## FAQ",
    ...allFaq.flatMap((item) => [`### ${item.q}`, item.a]),
    "## Alternance : questions fréquentes",
    ...alternanceFaq.flatMap((item) => [`### ${item.q}`, item.a]),
    "## Autres pages",
    ...[
      { page: alternance, path: ROUTES.alternance },
      { page: financement, path: ROUTES.financement },
      { page: processus, path: ROUTES.processusAdmission },
      { page: faq, path: ROUTES.faq },
    ].map(({ page, path }) => `- [${page.h1}](${absolute(path)}): ${page.description}`),
  ];
  return `${[...overview, ...programmeDetails, ...admissionDetails].join("\n\n")}\n`;
}
