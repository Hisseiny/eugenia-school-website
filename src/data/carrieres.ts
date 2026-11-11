import type { LogoSpec } from "@/data/logos";

export const EMPLOYERS: LogoSpec[] = [
  { name: "lg_accenture", alt: "Accenture", height: 26 },
  { name: "lg_lvmh", alt: "LVMH", height: 20 },
  { name: "lg_effy", alt: "EFFY", height: 26 },
  { name: "lg_alan", alt: "Alan", height: 32 },
  { name: "lg_microsoft", alt: "Microsoft", height: 22 },
  { name: "lg_airfrance", alt: "Air France", height: 14 },
  { name: "lg_misteria", alt: "Mister IA", height: 16 },
  { name: "lg_licter", alt: "Licter", height: 34 },
  { name: "lg_carrefour", alt: "Carrefour", height: 32 },
  { name: "lg_armees", alt: "Ministère des Armées", height: 44 },
  { name: "lg_wesype", alt: "WeSype", height: 16 },
  { name: "lg_salesforce", alt: "Salesforce", height: 36 },
];

export const ALUMNI = [
  {
    name: "Victor P.",
    portrait: "tq_victor",
    logo: { name: "lg_licter", alt: "Licter", height: 24 },
    before: "Master en marketing",
    built: "Un projet marketing entier pour son entreprise, en alternance.",
    job: "Head of AI, en CDI",
    teaches: null,
  },
  {
    name: "Nina L.",
    portrait: "tq_nina",
    logo: { name: "lg_effy", alt: "EFFY", height: 20 },
    before: "Licence éco-gestion",
    built: "Deux offres d'embauche grâce aux projets réalisés en classe.",
    job: "Data Analyst, en CDI",
    teaches: "Elle revient enseigner à Eugenia.",
  },
  {
    name: "Noah S.",
    portrait: "tq_noah",
    logo: { name: "lg_alan", alt: "Alan", height: 24 },
    before: "Bachelor économie",
    built: "Trois victoires en hackathon.",
    job: "HR Tech & Automation Lead, en CDI",
    teaches: "Il revient enseigner le portfolio et le personal branding.",
  },
  {
    name: "Antoine G.",
    portrait: "tq_antoine",
    logo: { name: "lg_wesype", alt: "WeSype", height: 14 },
    before: "Licence informatique",
    built: "Deux hackathons remportés, et une promesse d'embauche.",
    job: "Développeur, en CDI",
    teaches: "Il revient enseigner Dust.",
  },
] as const;

export const APPRENTICES = [
  { name: "Ali H.", portrait: "tq_ali", level: "MSc, M2, en alternance", before: "Licence science de l'informatique", built: "Des automatisations sur le suivi des clients.", role: "Ingénieur d'études", logo: { name: "lg_accenture", alt: "Accenture", height: 22 } },
  { name: "Nathan S.", portrait: "tq_nathan", level: "MSc, M2, en alternance", before: "Un parcours business, sans passer par la tech", built: "Des projets data et d'automatisation au service du business.", role: "Data Specialist & business international", logo: { name: "lg_carrefour", alt: "Carrefour", height: 28 } },
  { name: "Victoria I.", portrait: "tq_victoria", level: "MSc, M1, en alternance", before: "École de communication et marketing digital", built: "Des implémentations IA chez les entreprises.", role: "Business Developer, secteur public", logo: { name: "lg_misteria", alt: "Mister IA", height: 14 } },
  { name: "Bastian B.", portrait: "tq_bastian", level: "MSc, en alternance", before: "Licence informatique", built: "Des automatisations de processus métier.", role: "Chef de projet innovation", logo: { name: "lg_armees", alt: "Ministère des Armées", height: 36 } },
  { name: "Maxime B.", portrait: "tq_maxime", level: "MSc, M1, en alternance", before: "Licence économie", built: "Des automatisations dès sa première semaine d'alternance.", role: "Chef de projet IA", logo: { name: "lg_misteria", alt: "Mister IA", height: 14 } },
  { name: "Lenja S.", portrait: "tq_lenja", level: "MSc, M1, en alternance", before: "Bachelor marketing", built: "Trois projets concrets en deux semaines de cours.", role: "CRO Analyst chez Moët Hennessy", logo: { name: "lg_lvmh", alt: "LVMH", height: 16 } },
] as const;

export const BACHELORS = [
  { name: "Ian L.", portrait: "tq_ian", level: "Bachelor, B3", before: "Bachelor informatique", built: "Son premier agent IA, livré en hackathon, puis du fine-tuning en alternance chez Idoption IA." },
  { name: "Abir E.", portrait: "tq_abir", level: "Bachelor, B2", before: "Lycée international, à Dubaï", built: "Ses premiers tableaux de bord data, et un prototype pitché devant un jury en hackathon." },
  { name: "Robin M.", portrait: "tq_robin", level: "Bachelor, B1", before: "Bac STMG", built: "Une idée transformée en premier prototype no-code, testé dès le premier semestre." },
  { name: "Pénélope B.", portrait: "tq_penelope", level: "Bachelor, B1", before: "Bac maths et SES", built: "Ses premières analyses de données en SQL, et une solution IA pitchée en hackathon." },
  { name: "Marc H.", portrait: "tq_marc", level: "Bachelor, B1", before: "Bac SES et anglais", built: "Des outils IA et no-code pour faire grandir sa propre activité." },
] as const;
