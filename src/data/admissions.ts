/** `next` tells what happens after the step; every sentence comes from the FAQ below. */
export const STEPS = [
  { n: "Schritt 1", title: "Online-Bewerbung", text: "Deine Unterlagen, online. Kostenlos für Einwohner der EU.", next: "Du kannst ohne die Noten des laufenden Jahres beginnen und sie später nachreichen." },
  { n: "Schritt 2", title: "Eignungsprüfung", text: "Das Zulassungsteam prüft deine Unterlagen.", next: "Antwort innerhalb von 10 Tagen." },
  { n: "Schritt 3", title: "Zulassungsgespräch", text: "Ein Gespräch mit dem Zulassungsteam.", next: "Drei Teile: Kennenlernen, ein Logikrätsel, deine Motivation." },
  { n: "Schritt 4", title: "Endgültige Entscheidung", text: "Und Studienbeginn im September.", next: "Antwort innerhalb von 10 Tagen. Studienbeginn ist nur im September." },
] as const;

/** Indices of the FAQ entries parents ask first (cost, financing, Parcoursup, results, requirements). */
export const PARENT_QUESTIONS = [1, 7, 0, 4, 2] as const;

export const FIGURES = [
  { value: "0 €", label: "für die Bewerbung, wenn du in der Europäischen Union wohnst" },
  { value: "4 Schritte", label: "von deinen Unterlagen bis zur endgültigen Entscheidung" },
  { value: "September", label: "für den Studienbeginn 2027" },
] as const;

export const PARENTS = [
  { title: "Eine zertifizierte Einrichtung", text: "Qualiopi und ein bei France Compétences im RNCP eingetragener Titel." },
  { title: "Lehrkräfte aus der Praxis", text: "Sie unterrichten den Beruf, den sie im Unternehmen ausüben." },
  { title: "Die duale Ausbildung, begleitet", text: "Die Schule begleitet jeden Studierenden von A bis Z in seiner dualen Ausbildung." },
  { title: "Eine Bewerbung ohne Risiko", text: "Kostenlos für Einwohner der Europäischen Union." },
] as const;

/**
 * The first question comes from the mockup. The following answers are copied verbatim from the
 * current eugeniaschool.com/faq page (admissions section), including the financing answer.
 */
export const FAQ = [
  {
    q: "Muss man über Parcoursup gehen?",
    a: "Nein. Die Bewerbung erfolgt direkt bei der Schule, außerhalb von Parcoursup und Mon Master.",
  },
  {
    q: "Was kostet die Bewerbung?",
    a: "Die Bewerbung ist für Bewerber mit Wohnsitz in der Europäischen Union kostenlos. Für Bewerber mit Wohnsitz außerhalb der Europäischen Union kostet sie 30 €.",
  },
  {
    q: "Welche Voraussetzungen gelten für die Aufnahme an der Eugenia School?",
    a: "Die Eugenia School steht Schülerinnen und Schülern der allgemeinen oder technologischen Abschlussklasse mit Interesse an neuen Technologien offen. Unternehmerische DNA ist ein Plus. Für die Master braucht man einen Bac+3, also 180 ECTS-Punkte, und den Wunsch nach einer technischen Ausbildung. Das M1-Bootcamp wiederholt die Grundlagen der Datenanalyse.",
  },
  {
    q: "Worum geht es im Motivationsgespräch?",
    a: "Das Gespräch besteht aus drei Teilen: Kennenlernen, ein Logikrätsel und die Erläuterung Ihrer Motivation.",
  },
  {
    q: "Wann erhalte ich meine Zulassungsergebnisse?",
    a: "Die Ergebnisse werden innerhalb von 10 Tagen nach jeder Phase des Auswahlverfahrens mitgeteilt.",
  },
  {
    q: "Kann ich mich bewerben, wenn ich die Noten des laufenden Jahres noch nicht habe?",
    a: "Ja, Sie können das Zulassungsverfahren beginnen und die fehlenden Noten später einreichen.",
  },
  {
    q: "Wann ist Studienbeginn?",
    a: "Studienbeginn ist nur im September. Einen Studienbeginn im Januar gibt es nicht.",
  },
  {
    q: "Wie finanziere ich meine Ausbildung?",
    a: "Die Eugenia School bietet mit Unterstützung von Partnerunternehmen Stipendien, die bis zu 50 % der jährlichen Studiengebühren abdecken. Die Vergabe erfolgt nach sozialen und akademischen Kriterien. Der Stipendienantrag muss vor der Einschreibung gestellt werden. Sie können außerdem Studienkredite bei Partnerbanken beantragen. Da der Master of Science dual absolviert wird, übernimmt der Arbeitgeber 100 % der Studiengebühren. Für weitere Fragen: admission@eugeniaschool.com.",
  },
] as const;

export function confirmedFaq<T extends { a: string }>(faqs: readonly T[]): T[] {
  return faqs.filter((faq) => !faq.a.includes("[À confirmer"));
}

/** The same four steps, addressed to the parent; every fact is the one above. */
export const STEPS_PARENTS = [
  { n: "Schritt 1", title: "Online-Bewerbung", text: "Die Unterlagen Ihres Kindes, online. Kostenlos für Einwohner der Europäischen Union; die Noten des laufenden Jahres können später nachgereicht werden." },
  { n: "Schritt 2", title: "Eignungsprüfung", text: "Das Zulassungsteam prüft die Unterlagen. Antwort innerhalb von 10 Tagen." },
  { n: "Schritt 3", title: "Zulassungsgespräch", text: "Drei Teile: Kennenlernen, ein Logikrätsel, die Motivation." },
  { n: "Schritt 4", title: "Endgültige Entscheidung", text: "Antwort innerhalb von 10 Tagen. Studienbeginn ist nur im September." },
] as const;

/** FAQ entries shown on /parents: only validated answers (anything marked « [À confirmer » is skipped at build time). */
export const PARENTS_FAQ_IDS = [1, 7, 0, 4, 2, 6] as const;
