export const STEPS = [
  { n: "Schritt 1", title: "Online-Bewerbung", text: "Ihre Datei, online. Kostenlos für EU-Bürger.", next: "Sie können ohne die Noten Ihres aktuellen Jahrgangs beginnen und diese später senden." },
  { n: "Schritt 2", title: "Eignungsstudie", text: "Das Zulassungsteam prüft Ihre Akte.", next: "Antwort innerhalb von 10 Tagen." },
  { n: "Schritt 3", title: "Aufnahmegespräch", text: "Ein Austausch mit dem Zulassungsteam.", next: "Drei Schritte: Kennenlernen, ein logisches Rätsel, Ihre Motivationen." },
  { n: "Schritt 4", title: "Endgültige Entscheidung", text: "Und eine Rückkehr zur Schule im September.", next: "Antwort innerhalb von 10 Tagen. Der Beginn des Schuljahres erfolgt ausschließlich im September." },
] as const;

export const FIGURES = [
  { value: "0 €", label: "zu beantragen, wenn Sie Ihren Wohnsitz in der Europäischen Union haben" },
  { value: "4 Schritte", label: "von Ihrer Akte bis zur endgültigen Entscheidung" },
  { value: "September", label: "für das Schuljahr 2027" },
] as const;

export const PARENTS = [
  { title: "Ein zertifizierter Betrieb", text: "Qualiopi und ein im RNCP bei France Compétences registrierter Titel." },
  { title: "Lehrer im Amt", text: "Sie unterrichten den Beruf, den sie ausüben, in der Wirtschaft." },
  { title: "Begleitung im dualen Studium", text: "Die Schule unterstützt jeden Schüler von A bis Z in seinem berufsbegleitenden Studienprogramm." },
  { title: "Eine risikofreie Anwendung", text: "Kostenlos für Einwohner der Europäischen Union." },
] as const;

export const FAQ = [
  {
    q: "Muss man den Parcoursup durchlaufen?",
    a: "Nein. Du bewirbst dich direkt bei der Hochschule, ohne Parcoursup und ohne Mon Master.",
  },
  {
    q: "Wie viel kostet die Bewerbung?",
    a: "Für Bewerber mit Wohnsitz in der Europäischen Union ist die Bewerbung kostenlos. Für Kandidaten mit Wohnsitz außerhalb der Europäischen Union kostet es 30 €.",
  },
  {
    q: "Was sind die Voraussetzungen, um der Eugenia School beizutreten?",
    a: "Die Eugenia School steht allgemeinbildenden oder technischen Oberstufenschülern offen, die sich für neue Technologien interessieren. Unternehmerische DNA ist von Vorteil. Für den Masterstudiengang müssen Sie über einen Bachelor + 3 oder 180 ECTS-Credits verfügen und den Wunsch nach einer technischen Ausbildung haben. Das M1-Bootcamp behandelt die Grundlagen der Datenanalyse.",
  },
  {
    q: "Worum geht es im Motivationsgespräch?",
    a: "Das Vorstellungsgespräch besteht aus drei Teilen: Kennenlernen, einem Logikrätsel und einer Erläuterung Ihrer Beweggründe.",
  },
  {
    q: "Wann erhalte ich meine Zulassungsergebnisse?",
    a: "Die Ergebnisse werden innerhalb von 10 Tagen nach jeder Phase des Auswahlverfahrens bereitgestellt.",
  },
  {
    q: "Kann ich meine Bewerbung einreichen, wenn ich noch keine Noten für das laufende Jahr habe?",
    a: "Ja, Sie können den Zulassungsprozess starten und die fehlenden Noten später nachreichen.",
  },
  {
    q: "Wann beginnt das Schuljahr?",
    a: "Der Schuljahresbeginn erfolgt erst im September. Im Januar gibt es keine Rückkehr zur Schule.",
  },
  {
    q: "Wie finanziere ich meine Ausbildung?",
    a: "Die Eugenia School bietet mit Unterstützung von Unternehmenspartnern Stipendien an, die bis zu 50 % der jährlichen Studiengebühren abdecken. Die Vergabe des Stipendiums erfolgt nach sozialen und wissenschaftlichen Kriterien. Der Stipendienantrag muss vor der Anmeldung erfolgen. Sie können Studienkredite auch bei Partnerbanken beantragen. Da es sich beim Master of Science um einen berufsbegleitenden Studiengang handelt, übernimmt der Arbeitgeber 100 % der Studiengebühren. Für weitere Details: Admission@eugeniaschool.com.",
  },
] as const;
