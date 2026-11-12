import type { CurriculumProgram } from "@/data/curriculum";

export interface FaqItem {
  q: string;
  a: string;
}

export type PageBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 3 | 4; text: string; id?: string }
  | { type: "eyebrow"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "cards"; items: { number?: string; eyebrow?: string; title?: string; salary?: string; text?: string; responsibilities?: string[]; details?: string[]; tags?: string[]; image?: string; alt?: string; logo?: string; logoAlt?: string; action?: { label: string; href: string } }[] }
  | { type: "logos"; items: { name: string; alt: string }[] }
  | { type: "related-cards"; items: { eyebrow: string; title: string; text: string; label: string; href: string }[] }
  | { type: "cta" | "link"; label: string; href: string }
  | { type: "button"; label: string }
  | { type: "image"; name: string; alt: string; logo?: boolean }
  | { type: "quote"; text: string }
  | { type: "faq"; items: FaqItem[]; idPrefix?: string }
  | {
      type: "portfolio-grid";
      filters: { label: string; key: string; values: string[] }[];
      emptyText: string;
      items: { name: string; text: string; href: string; image: string; alt: string; filters: Record<string, string[]> }[];
    }
  | { type: "curriculum"; id: CurriculumProgram["id"] };

export interface LiveSection {
  id?: string;
  eyebrow?: string;
  heroCtas?: { label: string; href: string }[];
  title?: string;
  blocks: PageBlock[];
}

export interface ProgramFact {
  label: string;
  value: string;
  href?: string;
}

export interface AudienceCopy {
  student: string;
  parent: string;
  studentCta: string;
  parentCta: string;
  href: string;
  studentHref?: string;
  parentHref?: string;
}

export interface LivePage {
  title: string;
  description: string;
  h1: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  heroId?: string;
  anchorIds?: string[];
  heroCtas?: { type: "link"; label: string; href: string }[];
  lead?: string;
  postFacts?: string;
  audience?: AudienceCopy;
  badges?: string[];
  stats?: { value: string; label: string }[];
  facts?: ProgramFact[];
  jsonLd?: Record<string, unknown>[];
  sections: LiveSection[];
  internalLinks: { label: string; href: string }[];
  footer: {
    title: string;
    text?: string;
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  next: { href: string; title: string; text: string; image: string };
}
