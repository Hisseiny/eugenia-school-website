import { ALUMNI, APPRENTICES, EMPLOYERS } from "./carrieres";
import { PARTNERS, type LogoSpec } from "./logos";

export type RotatingItem =
  | { kind: "text"; text: string }
  | { kind: "logo"; logo: LogoSpec }
  | { kind: "text+logo"; text: string; logo: LogoSpec };

export const PARTNER_ITEMS: RotatingItem[] = PARTNERS.slice(0, 6).map((logo) => ({ kind: "logo", logo }));
export const EMPLOYER_ITEMS: RotatingItem[] = EMPLOYERS.slice(0, 6).map((logo) => ({ kind: "logo", logo }));
const seen = new Set<string>();
export const CAREER_ITEMS: RotatingItem[] = [
  ...ALUMNI.map((person) => ({ text: person.job.replace(/, en CDI$/, ""), logo: person.logo })),
  ...APPRENTICES.map((person) => ({ text: person.role, logo: person.logo })),
].filter(({ text }) => {
  if (text.length > 32 || seen.has(text)) return false;
  seen.add(text);
  return true;
}).slice(0, 6).map((item) => ({ kind: "text+logo", ...item }));

export const itemLabel = (item: RotatingItem): string =>
  item.kind === "logo" ? item.logo.alt : item.kind === "text" ? item.text : `${item.text} · ${item.logo.alt}`;
