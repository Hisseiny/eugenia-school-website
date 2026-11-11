import { EXTERNAL, ROUTES, SITE } from "@/data/site";

export const DOORS = [
  {
    href: `${ROUTES.programmes}#bachelor`,
    icon: "cap",
    who: "Après le bac",
    title: "Bachelor IA Applied to Business",
    text: "Trois ans, hors Parcoursup. Premier projet en entreprise dès le semestre 1.",
    cta: "Découvrir le Bachelor",
  },
  {
    href: `${ROUTES.programmes}#bachelor`,
    icon: "steps",
    who: "Après un Bac+2",
    title: "Bachelor, 3e année en alternance",
    text: "Une année pour te spécialiser en IA, en entreprise.",
    cta: "Découvrir la 3e année",
  },
  {
    href: `${ROUTES.programmes}#msc`,
    icon: "book",
    who: "Après un Bac+3 ou +4",
    title: "MSc IA Applied to Business",
    text: "Deux ans en alternance pour basculer vers l'IA et la data.",
    cta: "Découvrir le Master",
  },
  {
    href: ROUTES.entreprises,
    icon: "building",
    who: "Pour les entreprises",
    title: "Recruter, co-construire",
    text: "Alternants, projets et hackathons avec nos étudiants.",
    cta: "Travailler avec nous",
  },
] as const;

export const LEARN_ROWS = [
  {
    duration: "3 ans",
    title: "Bachelor IA Applied to Business",
    text: "Le socle commun, puis tu choisis ta trajectoire. La troisième année se fait en alternance.",
    chips: ["Python", "Scraping", "Automatisation no-code", "Marketing digital", "SEO", "Pitch"],
    link: { href: `${ROUTES.programmes}#bachelor`, label: "Le programme du Bachelor" },
    image: "n_laptops_43",
    alt: "Trois étudiants travaillent ensemble sur leurs ordinateurs",
  },
  {
    duration: "2 ans",
    title: "MSc IA Applied to Business",
    text: "Pour basculer vers l'IA et la data après un Bac+3 ou +4, en alternance.",
    chips: ["SQL", "Tableau", "Power BI", "Automatisation", "IA en entreprise"],
    link: { href: `${ROUTES.programmes}#msc`, label: "Le programme du Master" },
    image: "p_laptop",
    alt: "Un étudiant au travail, son ordinateur couvert de stickers n8n, Mistral AI, Dust et Eugenia",
  },
  {
    duration: "Certifiant",
    title: "Certifications professionnelles",
    text: "Deux certifications pour valider une compétence précise, en format court.",
    chips: ["Concepteur de solutions no code", "Architecte IA"],
    link: { href: `${ROUTES.programmes}#certifications`, label: "Les certifications" },
    image: "n_mic_43",
    alt: "Un étudiant pose une question au micro pendant une conférence",
  },
] as const;

export const STATS = [
  { value: "S1", label: "premier projet IA en entreprise" },
  { value: "48 h", label: "pour livrer un produit en hackathon" },
  { value: "15", label: "trajectoires d'étudiants à découvrir" },
] as const;

/**
 * Testimonial slides. Noah's slide is the one written in the mockup; the four others reuse,
 * word for word, the facts shown on the Carrières page for the same people (nothing invented).
 */
export const TESTIMONIALS = [
  {
    id: "noah",
    status: "Alumni, en CDI",
    quote: "Apprendre l’automatisation et l’agentic pour améliorer la vie en entreprise.",
    name: "Noah S.",
    bio: "Bachelor économie, puis MSc et 3 victoires en hackathon. Aujourd’hui HR Tech & Automation Lead chez Alan, en CDI. Il revient enseigner à Eugenia.",
    portrait: "tq_noah",
    logo: { name: "lg_alan", alt: "Alan", height: 34 },
  },
  {
    id: "nina",
    status: "Alumni, en CDI",
    quote: "Deux offres d’embauche grâce aux projets réalisés en classe.",
    name: "Nina L.",
    bio: "Licence éco-gestion, puis MSc. Aujourd’hui Data Analyst chez Effy, en CDI. Elle revient enseigner à Eugenia.",
    portrait: "tq_nina",
    logo: { name: "lg_effy", alt: "Effy", height: 28 },
  },
  {
    id: "victor",
    status: "Alumni, en CDI",
    quote: "Un projet marketing entier pour son entreprise, en alternance.",
    name: "Victor P.",
    bio: "Master en marketing, puis MSc. Aujourd’hui Head of AI chez Licter, en CDI.",
    portrait: "tq_victor",
    logo: { name: "lg_licter", alt: "Licter", height: 36 },
  },
  {
    id: "ian",
    status: "Bachelor, B3",
    quote: "Son premier agent IA, livré en hackathon, puis du fine-tuning en alternance.",
    name: "Ian L.",
    bio: "Bachelor informatique. En alternance chez Idoption IA, après un premier agent IA livré en hackathon.",
    portrait: "tq_ian",
    logo: null,
  },
  {
    id: "maxime",
    status: "MSc, M1, en alternance",
    quote: "Des automatisations dès sa première semaine d’alternance.",
    name: "Maxime B.",
    bio: "Licence économie, puis MSc. Chef de projet IA chez Mister IA, en alternance.",
    portrait: "tq_maxime",
    logo: { name: "lg_misteria", alt: "Mister IA", height: 18 },
  },
] as const;

export const GALLERY = [
  { image: "p_arch_hero", alt: "L'arche d'entrée et son globe lumineux, ouvrant sur l'atrium", caption: "L'entrée sous les voûtes", width: 340 },
  { image: "p_bancs", alt: "Les grandes tables en chêne sur les carreaux anciens", caption: "Les espaces de travail", width: 220 },
  { image: "p_atrium", alt: "L'atrium sous verrière et son escalier en pierre", caption: "L'atrium sous verrière", width: 300 },
  { image: "p_spiral", alt: "L'escalier en colimaçon vu d'en haut", caption: "L'escalier en colimaçon", width: 260 },
  { image: "p_fresque", alt: "La grande fresque en céramique du hall", caption: "La fresque du hall", width: 320 },
] as const;

export const NEXT_STEPS = [
  {
    n: 1,
    step: "Découvrir",
    title: "La brochure",
    accent: "À ton rythme, depuis chez toi",
    text: "Tout savoir sur nos programmes Bachelor et MSc.",
    cta: { href: ROUTES.brochure, label: "Télécharger la brochure", primary: false },
  },
  {
    n: 2,
    step: "Rencontrer",
    title: "Portes ouvertes, 12 décembre",
    accent: "Une matinée sur le campus",
    text: "À partir de 10 h 30, sur le campus. Gratuit : l'équipe te confirme ta place par e-mail.",
    cta: { href: ROUTES.evenements, label: "Réserver ma place", primary: false },
  },
  {
    n: 3,
    step: "Candidater",
    title: "Ta candidature",
    accent: "Gratuit pour les résidents UE",
    text: "Quatre étapes, hors Parcoursup, depuis ton espace candidat.",
    cta: { href: ROUTES.candidature, label: "Commencer ma candidature", primary: true },
  },
] as const;

export const PORTFOLIO_URL = EXTERNAL.portfolio;

/** Home: two doors only (Hick's law), one voice each — "tu" for the future student, "vous" for the parent. */
export const AUDIENCES = [
  {
    id: "etudiant",
    eyebrow: "Futur étudiant",
    title: "Tu veux voir ce que ça donne, concrètement.",
    points: [
      "Les programmes, et ce que tu construis chaque année",
      "La candidature en 4 étapes, hors Parcoursup, gratuite pour les résidents UE",
      "Les portes ouvertes du 12 décembre, sur le campus",
    ],
    cta: { href: ROUTES.admissions, label: "Voir comment candidater" },
    link: { href: ROUTES.evenements, label: "Réserver ma place aux portes ouvertes" },
  },
  {
    id: "parent",
    eyebrow: "Parent",
    title: "Vous voulez des garanties avant un choix qui engage.",
    points: [
      "Un établissement certifié Qualiopi, titre enregistré au RNCP",
      "Le coût de la candidature et le financement, expliqués",
      "L'alternance accompagnée de A à Z par l'école",
    ],
    cta: { href: ROUTES.parents, label: "Tout ce qu'un parent doit savoir" },
    link: { href: `mailto:${SITE.contact.email}`, label: "Écrire à l'équipe admission" },
  },
] as const;
