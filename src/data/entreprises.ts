import type { LogoSpec } from "@/data/logos";
import { ROUTES } from "@/data/site";

export const WAYS = [
  {
    icon: "recruit",
    title: "Recruter un alternant",
    text: "Bachelor 3e année ou MSc, en alternance, pour vos projets IA, data et automatisation.",
    link: { href: ROUTES.contact, label: "Déposer une offre" },
  },
  {
    icon: "hackathon",
    title: "Organiser un hackathon",
    text: "Un brief réel, 48 heures, des équipes qui livrent une démo devant votre jury.",
    link: { href: "#hackathons", label: "Proposer un brief" },
  },
  {
    icon: "partner",
    title: "Devenir partenaire",
    text: "Intervenir en cours, ouvrir vos outils, co-construire des projets avec les étudiants.",
    link: { href: ROUTES.contact, label: "Nous rencontrer" },
  },
] as const;

export const HACKATHONS = [
  { image: "p_dustteam", alt: "Une équipe d'étudiants en t-shirts Dust", position: "50% 35%", title: "Hackathon Dust", logo: { name: "lg_dust", alt: "Dust", height: 24 } },
  { image: "p_payfit", alt: "Les équipes du hackathon PayFit devant l'écran de présentation", position: "50% 45%", title: "Hackathon PayFit", logo: { name: "lg_payfit", alt: "PayFit", height: 20 } },
  { image: "hq_mirakl", alt: "Des étudiantes souriantes pendant les présentations", position: "50% 40%", title: "Hackathon Mirakl", logo: { name: "lg_mirakl", alt: "Mirakl", height: 24 } },
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
