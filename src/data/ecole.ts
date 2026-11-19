export const PRINCIPLES = [
  { title: "Schnell lernen, schnell umsetzen", text: "Man lernt durch Liefern, ab dem ersten Semester." },
  { title: "Neugier ohne Angst", text: "Man kommt neugierig. Die Grundlagen baut man hier auf." },
  { title: "Sich ständig weiterentwickeln", text: "KI ändert sich jeden Monat. Das Programm auch." },
  { title: "Radikale Anpassungsfähigkeit", text: "Tool, Rolle oder Projekt wechseln, ohne den Kurs zu verlieren." },
] as const;

export const CAMPUS = [
  { image: "p_arch_lamp", alt: "Der Eingangsbogen mit seiner Leuchtkugel, der sich zum Atrium öffnet", caption: "Der Eingang, unter den Gewölben" },
  { image: "p_spiral", alt: "Die Wendeltreppe von oben gesehen", caption: "Die Wendeltreppe" },
  { image: "p_fresque", alt: "Das große Keramikfresko der Halle", caption: "Das Fresko der Halle" },
  { image: "p_bancs", alt: "Die großen Eichentische auf den alten Fliesen", caption: "Die Arbeitsbereiche" },
] as const;

export const TEACHERS = [
  { image: "f_georgina", name: "Georgina Abi Sejaan", subject: "Python und Scraping" },
  { image: "f_marie", name: "Marie Bernard", subject: "No-Code-Automatisierung" },
  { image: "f_thomas", name: "Thomas Escot", subject: "Digitales Marketing und SEO" },
  { image: "f_sebastien", name: "Sébastien Albou", subject: "SQL und Tableau" },
  { image: "f_justine", name: "Justine Lambert", subject: "Pitch und Personal Branding" },
  { image: "f_jules", name: "Jules Guillot", subject: "Power BI für Finanzen" },
] as const;

export const STUDENT_LIFE = [
  { title: "Das BDE", text: "Das Studentenbüro" },
  { title: "Die Junior Entreprise", text: "Aufträge für echte Kunden" },
  { title: "Der Running Club", text: "Gemeinsam laufen, jede Woche" },
  { title: "Das Integrationswochenende", text: "Um das Jahr gemeinsam zu beginnen" },
] as const;

export const EVENTS = [
  { day: "12", month: "Dezember", title: "Tag der offenen Tür", text: "Ab 10:30 Uhr auf dem Campus. Kostenlos.", start: "2026-12-12T10:30:00+01:00" },
  { day: "12", month: "Dezember", title: "Workshop Unternehmertum", text: "Ab 13:30 Uhr auf dem Campus. Kostenlos.", start: "2026-12-12T13:30:00+01:00" },
] as const;
