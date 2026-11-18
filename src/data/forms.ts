export type FocusFormKind = "candidature" | "brochure" | "evenement" | "contact";
export type FormKind = FocusFormKind | "recruteur";

export type Option = { value: string; label: string; hint?: string };

export const WHO: Record<string, Option> = {
  "All.Student": { value: "All.Student", label: "Lycéen·ne ou étudiant·e", hint: "Je candidate pour moi" },
  "All.Parent": { value: "All.Parent", label: "Parent", hint: "Je me renseigne pour mon enfant" },
  "All.ProfessionalTrainee": { value: "All.ProfessionalTrainee", label: "En activité ou en reconversion", hint: "Je veux me former" },
};

export const YEARS: Option[] = [
  { value: "Y-3 (seconde)", label: "Seconde" },
  { value: "Y-2 (première)", label: "Première" },
  { value: "Y-1 (terminale)", label: "Terminale" },
  { value: "Y1", label: "Bac+1" },
  { value: "Y2", label: "Bac+2" },
  { value: "Y3", label: "Bac+3" },
  { value: "Y4", label: "Bac+4" },
  { value: "Y5", label: "Bac+5" },
  { value: "> Y5", label: "Au-delà de Bac+5" },
  { value: "Professional", label: "En activité professionnelle" },
];

export const TRAININGS: Option[] = [
  { value: "Bachelor Gamma", label: "Bachelor IA Applied to Business", hint: "3 ans après le bac, hors Parcoursup" },
  { value: "ES - Bachelor 3", label: "Bachelor, 3e année en alternance", hint: "Après un Bac+2" },
  { value: "MSc Gamma", label: "MSc IA Applied to Business", hint: "2 ans en alternance, après un Bac+3" },
];

export const EVENTS_OPTIONS: Option[] = [
  { value: "12 Décembre 2026 - Journée Portes Ouvertes - 12 déc - 10h30", label: "Journée portes ouvertes", hint: "12 décembre, 10 h 30" },
  { value: "12 Décembre 2026 - Atelier : Entrepreneur - 13h30", label: "Atelier entrepreneuriat", hint: "12 décembre, 13 h 30" },
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
    submitLabel: "Envoyer ma demande",
    pageName: "Candidature",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Commençons par toi.", titleParent: "Commençons par vous.", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme t'attire ?", titleParent: "Quel programme l'attire ?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en es-tu aujourd'hui ?", titleParent: "Où en est votre enfant aujourd'hui ?", label: "Ton année actuelle", labelParent: "Son année actuelle", options: YEARS },
      { kind: "contact", title: "Tes coordonnées pour envoyer ta demande", titleParent: "Vos coordonnées pour envoyer la demande" },
    ],
    done: {
      title: "Simulation terminée, {firstname}.",
      lines: ["Aucun espace candidat ni dossier n’a été créé."],
    },
    parentNote: "La candidature se fait au nom de votre enfant : vous pouvez la remplir avec lui, ou nous poser d'abord vos questions.",
  },
  brochure: {
    submitLabel: "Recevoir la brochure",
    pageName: "Brochure",
    who: ["All.Student", "All.Parent", "All.ProfessionalTrainee"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Pour qui est cette brochure ?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme t'intéresse ?", titleParent: "Quel programme vous intéresse ?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en es-tu aujourd'hui ?", titleParent: "Où en est votre enfant aujourd'hui ?", label: "Année actuelle", labelParent: "Son année actuelle", options: YEARS },
      { kind: "contact", title: "Où envoyer la brochure ?" },
    ],
    done: { title: "Simulation terminée, {firstname}.", lines: ["Aucune brochure n’a été envoyée par e-mail."] },
  },
  evenement: {
    submitLabel: "Réserver ma place",
    pageName: "Événements",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "eugenia_event_name_registered__dropdown_", title: "À quel événement viens-tu ?", options: EVENTS_OPTIONS, cards: true },
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Qui es-tu ?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme t'intéresse ?", titleParent: "Quel programme vous intéresse ?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en es-tu aujourd'hui ?", titleParent: "Où en est votre enfant aujourd'hui ?", label: "Année actuelle", labelParent: "Son année actuelle", options: YEARS },
      { kind: "contact", title: "Tes coordonnées, pour confirmer ta place", titleParent: "Vos coordonnées, pour confirmer votre place" },
    ],
    done: { title: "Simulation terminée, {firstname}.", lines: ["Aucune place n’a été réservée."] },
  },
  contact: {
    submitLabel: "Être recontacté·e",
    pageName: "Contact",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Qui êtes-vous ?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme vous concerne ?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en êtes-vous aujourd'hui ?", label: "Année actuelle (ou celle de votre enfant)", options: YEARS },
      { kind: "contact", title: "Vos coordonnées et votre question", message: true },
    ],
    done: { title: "Simulation terminée, {firstname}.", lines: ["Le message n’a pas été transmis à l’équipe."] },
  },
  recruteur: {
    submitLabel: "Envoyer la demande",
    pageName: "Recrutement",
    who: [],
    steps: [
      { kind: "choice", name: "reason", title: "Quel est votre besoin ?", options: [
        { value: "recruit", label: "Recruter des profils Eugenia School" },
        { value: "deep-dive", label: "Participer à un Business Deep Dive" },
        { value: "training", label: "Former mes équipes" },
        { value: "other", label: "Autre demande" },
      ], cards: true },
      { kind: "contact", title: "Vos coordonnées professionnelles", message: true, jobTitle: true },
    ],
    done: { title: "Simulation terminée, {firstname}.", lines: ["La demande n’a pas été transmise à l’équipe."] },
  },
};
