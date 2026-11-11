/**
 * The four HubSpot forms, rebuilt as Eugenia-styled multi-step forms. Field names and option
 * values are exactly those of the school's HubSpot forms (read from the live embeds and checked
 * against the Forms API validation); only the labels shown to the visitor are ours.
 */
import { HUBSPOT } from "@/data/site";

export type Option = { value: string; label: string; hint?: string };

export const WHO: Record<string, Option> = {
  "All.Student": { value: "All.Student", label: "Lycéen·ne ou étudiant·e", hint: "Je candidate pour moi" },
  "All.Parent": { value: "All.Parent", label: "Parent", hint: "Je me renseigne pour mon enfant" },
  "All.ProfessionalTrainee": { value: "All.ProfessionalTrainee", label: "En activité ou en reconversion", hint: "Je veux me former" },
  "All.Corporate": { value: "All.Corporate", label: "Entreprise", hint: "Recruter, co-construire" },
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

/** Upcoming events only (the HubSpot dropdown also lists past dates: June and July 2026). */
export const EVENTS_OPTIONS: Option[] = [
  { value: "12 Décembre 2026 - Journée Portes Ouvertes - 12 déc - 10h30", label: "Journée portes ouvertes", hint: "12 décembre, 10 h 30" },
  { value: "12 Décembre 2026 - Atelier : Entrepreneur - 13h30", label: "Atelier entrepreneuriat", hint: "12 décembre, 13 h 30" },
];

export type Step =
  | { kind: "choice"; name: string; title: string; options: Option[]; cards?: boolean }
  | { kind: "select"; name: string; title: string; label: string; options: Option[] }
  | { kind: "contact"; title: string; message?: boolean };

export interface FormConfig {
  formId: string;
  submitLabel: string;
  pageName: string;
  who: string[];
  steps: Step[];
  /** Confirmation: title uses {firstname}; lines come from validated facts only. */
  done: { title: string; lines: string[] };
}

const contactStep = (title: string, message = false): Step => ({ kind: "contact", title, message });

export const FORMS: Record<keyof typeof HUBSPOT.forms, FormConfig> = {
  candidature: {
    formId: HUBSPOT.forms.candidature,
    submitLabel: "Créer mon espace candidat",
    pageName: "Candidature",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Qui es-tu ?", options: [], cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en es-tu aujourd'hui ?", label: "Ton année actuelle (ou celle de ton enfant)", options: YEARS },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme t'attire ?", options: TRAININGS, cards: true },
      contactStep("Tes coordonnées, pour créer ton espace candidat"),
    ],
    done: {
      title: "C'est envoyé, {firstname}.",
      lines: ["L'équipe d'admission étudie ton dossier : réponse sous 10 jours.", "Tu peux envoyer tes notes manquantes plus tard.", "Une question ? admission@eugeniaschool.com · 01 31 67 73 88"],
    },
  },
  brochure: {
    formId: HUBSPOT.forms.brochure,
    submitLabel: "Recevoir la brochure",
    pageName: "Brochure",
    who: ["All.Student", "All.Parent", "All.ProfessionalTrainee"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Pour qui est cette brochure ?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme t'intéresse ?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en es-tu aujourd'hui ?", label: "Année actuelle", options: YEARS },
      contactStep("Où envoyer la brochure ?"),
    ],
    done: { title: "Merci, {firstname}.", lines: ["La brochure arrive dans ta boîte mail.", "Aucun engagement : c'est juste la brochure.", "Une question ? admission@eugeniaschool.com · 01 31 67 73 88"] },
  },
  evenement: {
    formId: HUBSPOT.forms.evenement,
    submitLabel: "Réserver ma place",
    pageName: "Événements",
    who: ["All.Student", "All.Parent"],
    steps: [
      { kind: "choice", name: "eugenia_event_name_registered__dropdown_", title: "À quel événement viens-tu ?", options: EVENTS_OPTIONS, cards: true },
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Qui es-tu ?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme t'intéresse ?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en es-tu aujourd'hui ?", label: "Année actuelle", options: YEARS },
      contactStep("Tes coordonnées, pour confirmer ta place"),
    ],
    done: { title: "Ta place est réservée, {firstname}.", lines: ["L'équipe te confirme ta place par e-mail.", "Sur le campus, 18 rue de Paradis, Paris 10e. Gratuit.", "Une question ? admission@eugeniaschool.com · 01 31 67 73 88"] },
  },
  contact: {
    formId: HUBSPOT.forms.contact,
    submitLabel: "Être recontacté·e",
    pageName: "Contact",
    who: ["All.Student", "All.Parent", "All.Corporate"],
    steps: [
      { kind: "choice", name: "all_type_multiple_checkboxes", title: "Qui êtes-vous ?", options: [], cards: true },
      { kind: "choice", name: "one_targetted_training", title: "Quel programme vous concerne ?", options: TRAININGS, cards: true },
      { kind: "select", name: "all_current_academic_year", title: "Où en êtes-vous aujourd'hui ?", label: "Année actuelle (ou celle de votre enfant)", options: YEARS },
      contactStep("Vos coordonnées et votre question", true),
    ],
    done: { title: "Message reçu, {firstname}.", lines: ["L'équipe admission vous répond.", "Aussi par téléphone : 01 31 67 73 88", "Ou par e-mail : admission@eugeniaschool.com"] },
  },
};
