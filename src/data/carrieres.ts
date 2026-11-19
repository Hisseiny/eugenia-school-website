import { RECRUITERS, type LogoSpec } from "@/data/logos";

/** Same employers as the home marquee, capped for the grid cells. */
export const EMPLOYERS: LogoSpec[] = RECRUITERS.map((l) => ({ ...l, height: Math.min(l.height, 34) }));

export const ALUMNI = [
  {
    name: "Victor P.",
    portrait: "tq_victor",
    logo: { name: "lg_licter", alt: "Licter", height: 24 },
    before: "Master in Marketing",
    built: "Ein komplettes Marketingprojekt für sein Unternehmen, in dualer Ausbildung.",
    job: "Head of AI, Festanstellung",
    teaches: null,
  },
  {
    name: "Nina L.",
    portrait: "tq_nina",
    logo: { name: "lg_effy", alt: "EFFY", height: 20 },
    before: "Bachelor Wirtschaft und Management",
    built: "Zwei Jobangebote dank der Projekte aus dem Unterricht.",
    job: "Data Analyst, Festanstellung",
    teaches: "Sie kommt zum Unterrichten an die Eugenia zurück.",
  },
  {
    name: "Noah S.",
    portrait: "tq_noah",
    logo: { name: "lg_alan", alt: "Alan", height: 24 },
    before: "Bachelor Wirtschaft",
    built: "Drei Hackathon-Siege.",
    job: "HR Tech & Automation Lead, Festanstellung",
    teaches: "Er kommt zurück, um Portfolio und Personal Branding zu unterrichten.",
  },
  {
    name: "Antoine G.",
    portrait: "tq_antoine",
    logo: { name: "lg_wesype", alt: "WeSype", height: 14 },
    before: "Bachelor Informatik",
    built: "Zwei gewonnene Hackathons und eine Einstellungszusage.",
    job: "Entwickler, Festanstellung",
    teaches: "Er kommt zurück, um Dust zu unterrichten.",
  },
] as const;

export const APPRENTICES = [
  { name: "Ali H.", portrait: "tq_ali", level: "MSc, M2, dual", before: "Bachelor Informatik", built: "Automatisierungen für die Kundenbetreuung.", role: "Studieningenieur", logo: { name: "lg_accenture", alt: "Accenture", height: 22 } },
  { name: "Nathan S.", portrait: "tq_nathan", level: "MSc, M2, dual", before: "Ein Business-Werdegang, ohne Umweg über die Tech", built: "Data- und Automatisierungsprojekte im Dienst des Business.", role: "Data Specialist & internationales Business", logo: { name: "lg_carrefour", alt: "Carrefour", height: 28 } },
  { name: "Victoria I.", portrait: "tq_victoria", level: "MSc, M1, dual", before: "Schule für Kommunikation und digitales Marketing", built: "KI-Implementierungen in Unternehmen.", role: "Business Developer, öffentlicher Sektor", logo: { name: "lg_misteria", alt: "Mister IA", height: 14 } },
  { name: "Bastian B.", portrait: "tq_bastian", level: "MSc, dual", before: "Bachelor Informatik", built: "Automatisierungen von Geschäftsprozessen.", role: "Innovationsprojektleiter", logo: { name: "lg_armees", alt: "Französisches Verteidigungsministerium", height: 36 } },
  { name: "Maxime B.", portrait: "tq_maxime", level: "MSc, M1, dual", before: "Bachelor Wirtschaft", built: "Automatisierungen schon in seiner ersten Woche der dualen Ausbildung.", role: "KI-Projektleiter", logo: { name: "lg_misteria", alt: "Mister IA", height: 14 } },
  { name: "Lenja S.", portrait: "tq_lenja", level: "MSc, M1, dual", before: "Bachelor Marketing", built: "Drei konkrete Projekte in zwei Wochen Unterricht.", role: "CRO Analyst bei Moët Hennessy", logo: { name: "lg_lvmh", alt: "LVMH", height: 16 } },
] as const;

export const BACHELORS = [
  { name: "Ian L.", portrait: "tq_ian", level: "Bachelor, B3", before: "Bachelor Informatik", built: "Sein erster KI-Agent, geliefert im Hackathon, dann Fine-Tuning in der dualen Ausbildung bei Idoption IA." },
  { name: "Abir E.", portrait: "tq_abir", level: "Bachelor, B2", before: "Internationales Gymnasium in Dubai", built: "Ihre ersten Data-Dashboards und ein Prototyp, im Hackathon vor einer Jury gepitcht." },
  { name: "Robin M.", portrait: "tq_robin", level: "Bachelor, B1", before: "Abitur STMG", built: "Eine Idee, verwandelt in einen ersten No-Code-Prototyp, getestet schon im ersten Semester." },
  { name: "Pénélope B.", portrait: "tq_penelope", level: "Bachelor, B1", before: "Abitur Mathe und Wirtschafts- und Sozialwissenschaften", built: "Ihre ersten Datenanalysen in SQL und eine KI-Lösung, im Hackathon gepitcht." },
  { name: "Marc H.", portrait: "tq_marc", level: "Bachelor, B1", before: "Abitur Wirtschafts- und Sozialwissenschaften und Englisch", built: "KI- und No-Code-Tools, um sein eigenes Geschäft wachsen zu lassen." },
] as const;
