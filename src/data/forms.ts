export type FocusFormKind = "candidature" | "brochure" | "evenement" | "contact";
export type FormKind = FocusFormKind | "recruteur";

export type Option = { value: string; label: string; hint?: string };

export const WHO: Record<string, Option> = {
  "All.Student": { value: "All.Student", label: "Schüler·in oder Student·in", hint: "Ich bewerbe mich für mich" },
  "All.Parent": { value: "All.Parent", label: "Parent", hint: "Ich informiere mich für mein Kind" },
  "All.ProfessionalTrainee": { value: "All.ProfessionalTrainee", label: "Berufstätig oder in Umschulung", hint: "Ich möchte mich weiterbilden" },
};

export const YEARS: Option[] = [
  { value: "Y-3 (seconde)", label: "10. Klasse" },
  { value: "Y-2 (première)", label: "11. Klasse" },
  { value: "Y-1 (terminale)", label: "Abschlussklasse" },
  { value: "Y1", label: "Bac+1" },
  { value: "Y2", label: "Bac+2" },
  { value: "Y3", label: "Bac+3" },
  { value: "Y4", label: "Bac+4" },
  { value: "Y5", label: "Bac+5" },
  { value: "> Y5", label: "Über Bac+5" },
  { value: "Professional", label: "Berufstätig" },
];

export const TRAININGS: Option[] = [
  { value: "Bachelor Gamma", label: "Bachelor IA Applied to Business", hint: "3 Jahre nach dem Abitur, außerhalb von Parcoursup" },
  { value: "ES - Bachelor 3", label: "Bachelor, duales 3. Jahr", hint: "Nach einem Bac+2" },
  { value: "MSc Gamma", label: "MSc IA Applied to Business", hint: "2 Jahre dual, nach einem Bac+3" },
];

export const EVENTS_OPTIONS: Option[] = [
  { value: "12 Décembre 2026 - Journée Portes Ouvertes - 12 déc - 10h30", label: "Tag der offenen Tür", hint: "12. Dezember, 10:30 Uhr" },
  { value: "12 Décembre 2026 - Atelier : Entrepreneur - 13h30", label: "Workshop Unternehmertum", hint: "12. Dezember, 13:30 Uhr" },
];

/** `titleParent` / `labelParent`: the same question, addressed to the parent (« vous ») once Parent is chosen. */
export type Step =
  | { kind: "choice"; name: string; title: string; titleParent?: string; options: Option[]; cards?: boolean }
  | { kind: "select"; name: string; title: string; titleParent?: string; label: string; labelParent?: string; options: Option[] }
  | { kind: "contact"; title: string; titleParent?: string; message?: boolean; jobTitle?: boolean };

export interface FormConfig {
  submitLabel: string;
  pageName: string;
  who: string[];
  steps: Step[];
  /** Confirmation: title uses {firstname}; lines come from validated facts only. */
  done: { title: string; lines: string[] };
  /** Shown on the last step when Parent is chosen (candidature): never blocks. */
  parentNote?: string;
}

export const FORMS: Record<FormKind, FormConfig> = {
  candidature: {
    submitLabel: "Meine Anfrage senden",
    pageName: "Candidature",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Fangen wir mit dir an.", titleParent: "Fangen wir mit Ihnen an.", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Welches Programm reizt dich?", titleParent: "Welches Programm reizt Ihr Kind?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Wo stehst du heute?", titleParent: "Wo steht Ihr Kind heute?", label: "Dein aktuelles Jahr", labelParent: "Sein aktuelles Jahr", options: YEARS },
      { kind: "contact", title: "Deine Kontaktdaten, um deine Anfrage zu senden", titleParent: "Ihre Kontaktdaten, um die Anfrage zu senden" },
    ],
    done: {
      title: "Simulation beendet, {firstname}.",
      lines: ["Es wurde weder ein Bewerberbereich noch eine Bewerbung angelegt."],
    },
    parentNote: "Die Bewerbung erfolgt im Namen Ihres Kindes: Sie können sie gemeinsam ausfüllen oder uns zuerst Ihre Fragen stellen.",
  },
  brochure: {
    submitLabel: "Broschüre erhalten",
    pageName: "Brochure",
    who: ["All.Student", "All.Parent", "All.ProfessionalTrainee"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Für wen ist diese Broschüre?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Welches Programm interessiert dich?", titleParent: "Welches Programm interessiert Sie?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Wo stehst du heute?", titleParent: "Wo steht Ihr Kind heute?", label: "Aktuelles Jahr", labelParent: "Sein aktuelles Jahr", options: YEARS },
      { kind: "contact", title: "Wohin sollen wir die Broschüre schicken?" },
    ],
    done: { title: "Simulation beendet, {firstname}.", lines: ["Es wurde keine Broschüre per E-Mail verschickt."] },
  },
  evenement: {
    submitLabel: "Meinen Platz reservieren",
    pageName: "Événements",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "eugenia_event_name_registered__dropdown_", title: "Zu welcher Veranstaltung kommst du?", options: EVENTS_OPTIONS, cards: true },
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Wer bist du?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Welches Programm interessiert dich?", titleParent: "Welches Programm interessiert Sie?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Wo stehst du heute?", titleParent: "Wo steht Ihr Kind heute?", label: "Aktuelles Jahr", labelParent: "Sein aktuelles Jahr", options: YEARS },
      { kind: "contact", title: "Deine Kontaktdaten, um deinen Platz zu bestätigen", titleParent: "Ihre Kontaktdaten, um Ihren Platz zu bestätigen" },
    ],
    done: { title: "Simulation beendet, {firstname}.", lines: ["Es wurde kein Platz reserviert."] },
  },
  contact: {
    submitLabel: "Rückruf erhalten",
    pageName: "Contact",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Wer sind Sie?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Welches Programm betrifft Sie?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Wo stehen Sie heute?", label: "Aktuelles Jahr (oder das Ihres Kindes)", options: YEARS },
      { kind: "contact", title: "Ihre Kontaktdaten und Ihre Frage", message: true },
    ],
    done: { title: "Simulation beendet, {firstname}.", lines: ["Die Nachricht wurde nicht an das Team weitergeleitet."] },
  },
  recruteur: {
    submitLabel: "Anfrage senden",
    pageName: "Recrutement",
    who: [],
    steps: [
      { kind: "choice", name: "reason", title: "Was ist Ihr Bedarf?", options: [
        { value: "recruit", label: "Profile der Eugenia School rekrutieren" },
        { value: "deep-dive", label: "An einem Business Deep Dive teilnehmen" },
        { value: "training", label: "Meine Teams weiterbilden" },
        { value: "other", label: "Andere Anfrage" },
      ], cards: true },
      { kind: "contact", title: "Ihre beruflichen Kontaktdaten", message: true, jobTitle: true },
    ],
    done: { title: "Simulation beendet, {firstname}.", lines: ["Die Anfrage wurde nicht an das Team weitergeleitet."] },
  },
};
