export const COMPARE_ROWS = [
  { label: "Zielgruppe", bachelor: "Nach dem Abitur. Oder nach einem Bac+2, für den direkten Einstieg in das 3. Jahr.", msc: "Nach einem Bac+3 oder einem Bac+4." },
  { label: "Studiendauer", bachelor: "3 Jahre", msc: "2 Jahre" },
  { label: "Studienrhythmus", bachelor: "Kurse und Projekte, dann duales Studium im 3. Studienjahr", msc: "Im dualen Studium" },
  { label: "Zulassung", bachelor: "Ohne Parcoursup", msc: "Ohne Mon Master" },
  { label: "Zugelassene Schulabschlüsse", bachelor: "Allgemeines Terminal, alle Spezialitäten oder STMG", msc: "Lizenz, Bachelor oder gleichwertig" },
  { label: "Abschluss", bachelor: "Titel RNCP 41143, Lösungsdesigner ohne Code", msc: "Titel RNCP 41993, Architekt für künstliche Intelligenz" },
] as const;

export const BACHELOR_YEARS = [
  { year: "1. Studienjahr", title: "Die Grundlagen", text: "KI, Daten und No-Code. Erstes KI-Projekt in der Wirtschaft im 1. Semester." },
  { year: "2. Studienjahr", title: "Ihre Flugbahn", text: "Du wählst deinen Schwerpunkt und entwickelst bei Hackathons mit Partnerunternehmen eigene Projekte." },
  { year: "3. Studienjahr", title: "Das duale Studium", text: "Ein Jahr im Unternehmen. Auch als Direkteinstieg nach zwei Studienjahren möglich." },
] as const;

export const MSC_CHIPS = ["SQL", "Tableau", "Power BI", "Automatisierung", "KI im Unternehmen", "Pitch"] as const;
