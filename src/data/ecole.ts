export const PRINCIPLES = [
  { title: "Apprendre vite, exécuter vite", text: "On apprend en livrant, dès le premier semestre." },
  { title: "Curiosité sans peur", text: "On arrive curieux. Les bases, on les construit ici." },
  { title: "S'actualiser en continu", text: "L'IA change chaque mois. Le programme aussi." },
  { title: "Adaptabilité radicale", text: "Changer d'outil, de rôle ou de projet sans perdre le cap." },
] as const;

export const CAMPUS = [
  { image: "p_arch_lamp", alt: "L'arche d'entrée et son globe lumineux, ouvrant sur l'atrium", caption: "L'entrée, sous les voûtes" },
  { image: "p_spiral", alt: "L'escalier en colimaçon vu d'en haut", caption: "L'escalier en colimaçon" },
  { image: "p_fresque", alt: "La grande fresque en céramique du hall", caption: "La fresque du hall" },
  { image: "p_bancs", alt: "Les grandes tables en chêne posées sur les carreaux anciens", caption: "Les espaces de travail" },
] as const;

export const TEACHERS = [
  { image: "f_georgina", name: "Georgina Abi Sejaan", subject: "Python et scraping" },
  { image: "f_marie", name: "Marie Bernard", subject: "Automatisation no-code" },
  { image: "f_thomas", name: "Thomas Escot", subject: "Marketing digital et SEO" },
  { image: "f_sebastien", name: "Sébastien Albou", subject: "SQL et Tableau" },
  { image: "f_justine", name: "Justine Lambert", subject: "Pitch et personal branding" },
  { image: "f_jules", name: "Jules Guillot", subject: "Power BI pour la finance" },
] as const;

export const STUDENT_LIFE = [
  { title: "Le BDE", text: "Le Bureau des Étudiants" },
  { title: "La Junior Entreprise", text: "Des missions pour de vrais clients" },
  { title: "Le running club", text: "Courir ensemble, chaque semaine" },
  { title: "Le week-end d'intégration", text: "Pour commencer l'année ensemble" },
] as const;

export const EVENTS = [
  { day: "12", month: "décembre", title: "Journée portes ouvertes", text: "À partir de 10 h 30, sur le campus. Gratuit.", start: "2026-12-12T10:30:00+01:00" },
  { day: "12", month: "décembre", title: "Atelier entrepreneuriat", text: "À partir de 13 h 30, sur le campus. Gratuit.", start: "2026-12-12T13:30:00+01:00" },
] as const;
