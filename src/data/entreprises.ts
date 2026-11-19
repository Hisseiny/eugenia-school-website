import type { LogoSpec } from "@/data/logos";
import { ROUTES } from "@/data/site";

export const WAYS = [
  {
    icon: "recruit",
    title: "Einen dual Studierenden rekrutieren",
    text: "Bachelor 3. Jahr oder MSc, dual, für Ihre KI-, Data- und Automatisierungsprojekte.",
    link: { href: ROUTES.recruterNosEtudiants, label: "Ein Angebot einstellen" },
  },
  {
    icon: "hackathon",
    title: "Einen Hackathon organisieren",
    text: "Ein echtes Briefing, 48 Stunden, Teams, die vor Ihrer Jury eine Demo liefern.",
    link: { href: ROUTES.projetsEntreprises, label: "Ein Briefing vorschlagen" },
  },
  {
    icon: "partner",
    title: "Partner werden",
    text: "Im Unterricht auftreten, Ihre Tools öffnen, gemeinsam mit den Studierenden Projekte entwickeln.",
    link: { href: ROUTES.entreprisesPartenaires, label: "Uns kennenlernen" },
  },
] as const;

export const HACKATHONS = [
  { image: "p_dustteam", alt: "Ein Team von Studierenden in Dust-T-Shirts", position: "50% 35%", title: "Hackathon Dust", logo: { name: "lg_dust", alt: "Dust", height: 24 } },
  { image: "p_payfit", alt: "Die Teams des PayFit-Hackathons vor der Präsentationsleinwand", position: "50% 45%", title: "Hackathon PayFit", logo: { name: "lg_payfit", alt: "PayFit", height: 20 } },
  { image: "hq_mirakl", alt: "Lächelnde Studentinnen während der Präsentationen", position: "50% 40%", title: "Hackathon Mirakl", logo: { name: "lg_mirakl", alt: "Mirakl", height: 24 } },
] as const;

export const PARTNER_MARQUEE: LogoSpec[] = [
  { name: "lg_openai", alt: "OpenAI", height: 24 },
  { name: "lg_mistral", alt: "Mistral AI", height: 22 },
  { name: "lg_dust", alt: "Dust", height: 32 },
  { name: "lg_microsoft", alt: "Microsoft", height: 24 },
  { name: "lg_lvmh", alt: "LVMH", height: 20 },
  { name: "lg_snapchat", alt: "Snapchat", height: 32 },
  { name: "lg_make", alt: "Make", height: 22 },
  { name: "lg_payfit", alt: "PayFit", height: 28 },
  { name: "lg_slack", alt: "Slack", height: 24 },
];
