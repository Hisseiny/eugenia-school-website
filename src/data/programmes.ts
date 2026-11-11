export const COMPARE_ROWS = [
  { label: "Pour qui", bachelor: "Après le bac. Ou après un Bac+2, en entrée directe en 3e année.", msc: "Après un Bac+3 ou un Bac+4." },
  { label: "Durée", bachelor: "3 ans", msc: "2 ans" },
  { label: "Rythme", bachelor: "Cours et projets, puis 3e année en alternance", msc: "En alternance" },
  { label: "Admission", bachelor: "Hors Parcoursup", msc: "Hors Mon Master" },
  { label: "Bacs acceptés", bachelor: "Terminale générale, toutes spécialités, ou STMG", msc: "Licence, bachelor ou équivalent" },
  { label: "Titre", bachelor: "Titre RNCP 41143, Concepteur de solutions no code", msc: "Titre RNCP 41993, Architecte en intelligence artificielle" },
] as const;

export const BACHELOR_YEARS = [
  { year: "Année 1", title: "Le socle", text: "IA, data et no-code. Premier projet IA en entreprise au semestre 1." },
  { year: "Année 2", title: "Ta trajectoire", text: "Tu choisis ta voie, et tu construis en hackathon avec les entreprises partenaires." },
  { year: "Année 3", title: "L'alternance", text: "Une année en entreprise. Accessible aussi en entrée directe après un Bac+2." },
] as const;

export const MSC_CHIPS = ["SQL", "Tableau", "Power BI", "Automatisation", "IA en entreprise", "Pitch"] as const;
