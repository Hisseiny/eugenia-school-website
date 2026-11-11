import { confirmedFaq, FAQ, STEPS } from "@/data/admissions";
import { DOORS, LEARN_ROWS } from "@/data/home";
import { BACHELOR_YEARS, COMPARE_ROWS, MSC_CHIPS } from "@/data/programmes";
import { ROUTES, SITE } from "@/data/site";

const absolute = (path: string) => new URL(path, `${SITE.url}/`).href;
const programmeLines = [
  ...DOORS.slice(0, 3).map((programme) => `- [${programme.title}](${absolute(programme.href)}): ${programme.text}`),
  ...LEARN_ROWS[2].chips.map(
    (name) => `- [${name}](${absolute(`${ROUTES.programmes}#certifications`)}): Certification professionnelle en format court.`,
  ),
];

const contactLinks = [
  ["Admissions", ROUTES.admissions],
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
];

const confirmedAnswer = (answer: string) => (answer.includes("[À confirmer") ? "—" : answer);

export function buildLlmsText(full = false): string {
  if (!full) return `${overview.join("\n\n")}\n`;

  const programmeDetails = [
    "## Détails des programmes",
    "### Comparatif",
    ...COMPARE_ROWS.map(
      (row) => `- ${row.label} : Bachelor — ${confirmedAnswer(row.bachelor)} ; MSc — ${confirmedAnswer(row.msc)}`,
    ),
    "### Années du Bachelor",
    ...BACHELOR_YEARS.map((year) => `- ${year.year} — ${year.title} : ${year.text}`),
    `### MSc : ${MSC_CHIPS.join(", ")}`,
  ];
  const admissionDetails = [
    "## Étapes d'admission",
    ...STEPS.map((step) => `- ${step.n} — ${step.title} : ${step.text} Ensuite : ${step.next}`),
    "## Questions fréquentes",
    ...confirmedFaq(FAQ).flatMap((faq) => [`### ${faq.q}`, faq.a]),
  ];

  return `${[...overview, ...programmeDetails, ...admissionDetails].join("\n\n")}\n`;
}
