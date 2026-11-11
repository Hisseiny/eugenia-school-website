import { APPRENTICES, BACHELORS } from "./carrieres";
import { TRAININGS } from "./forms";
import { STEPS } from "./admissions";

const bachelor = BACHELORS[0];
const apprentice = APPRENTICES[1];

// Editorial descriptions, not invented quotations. Portrait copy comes from the career records.
export const FOCUS_STORIES = [
  { id: "welcome", image: "n_hero_pair", text: "L'IA appliquée au business.", caption: "Eugenia School · Paris", position: "50% 40%" },
  { id: "parent", image: "p_atrium", text: "Candidature gratuite pour les résidents de l'Union européenne.", caption: "Hors Parcoursup et hors Mon Master", position: "50% 50%" },
  { id: "bachelor", image: bachelor.portrait, text: bachelor.built, caption: `${bachelor.name} · ${bachelor.level}`, position: "50% 30%" },
  { id: "msc", image: apprentice.portrait, text: apprentice.built, caption: `${apprentice.name} · ${apprentice.role}`, logo: apprentice.logo, position: "50% 30%" },
  { id: "brochure", image: "p_duo", text: "Bachelor et MSc. Trouvez votre parcours.", caption: "Les programmes d'Eugenia School", position: "50% 35%" },
  { id: "evenement", image: "p_atrium", text: "Rencontrons-nous sur le campus.", caption: "18 rue de Paradis · Paris 10e", position: "50% 50%" },
  { id: "contact", image: "p_team", text: "Une question ? Parlons-en.", caption: "L'équipe Eugenia School", position: "50% 40%" },
  { id: "done", image: "p_team", text: "La suite se construit ensemble.", caption: "Eugenia School", position: "50% 40%" },
] as const;

export const DEFAULT_STORY = { candidature: "welcome", brochure: "brochure", evenement: "evenement", contact: "contact" } as const;
export const PROGRAM_STORIES = Object.fromEntries(TRAININGS.map((training, i) => [training.value, i === 2 ? "msc" : "bachelor"]));
// Titles only: a submitted contact form does not prove that a complete admissions dossier exists.
export const ADMISSION_TIMELINE = STEPS.map((step) => step.title);
