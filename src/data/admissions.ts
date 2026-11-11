/** `next` tells what happens after the step; every sentence comes from the FAQ below. */
export const STEPS = [
  { n: "Étape 1", title: "Candidature en ligne", text: "Ton dossier, en ligne. Gratuit pour les résidents UE.", next: "Tu peux commencer sans tes notes de l'année en cours et les envoyer plus tard." },
  { n: "Étape 2", title: "Étude d'éligibilité", text: "L'équipe d'admission étudie ton dossier.", next: "Réponse sous 10 jours." },
  { n: "Étape 3", title: "Entretien d'admission", text: "Un échange avec l'équipe d'admission.", next: "Trois temps : faire connaissance, un casse-tête logique, tes motivations." },
  { n: "Étape 4", title: "Décision finale", text: "Et une rentrée en septembre.", next: "Réponse sous 10 jours. La rentrée a lieu en septembre, uniquement." },
] as const;

/** Indices of the FAQ entries parents ask first (cost, financing, Parcoursup, results, requirements). */
export const PARENT_QUESTIONS = [1, 7, 0, 4, 2] as const;

export const FIGURES = [
  { value: "0 €", label: "pour candidater, si tu es résident de l'Union européenne" },
  { value: "4 étapes", label: "de ton dossier à la décision finale" },
  { value: "Septembre", label: "pour la rentrée 2027" },
] as const;

export const PARENTS = [
  { title: "Un établissement certifié", text: "Qualiopi, et un titre enregistré au RNCP auprès de France Compétences." },
  { title: "Des professeurs en poste", text: "Ils enseignent le métier qu'ils exercent, en entreprise." },
  { title: "L'alternance, accompagnée", text: "L'école accompagne chaque étudiant de A à Z dans son alternance." },
  { title: "Une candidature sans risque", text: "Gratuite pour les résidents de l'Union européenne." },
] as const;

/**
 * The first question comes from the mockup. The following answers are copied verbatim from the
 * current eugeniaschool.com/faq page (admissions section), including the financing answer.
 */
export const FAQ = [
  {
    q: "Faut-il passer par Parcoursup ?",
    a: "Non. Les candidatures se font directement auprès de l'école, hors Parcoursup et hors Mon Master.",
  },
  {
    q: "Combien coûte la candidature ?",
    a: "La candidature est gratuite pour les candidats résidant dans l'Union européenne. Pour les candidats résidant hors de l'Union européenne, elle coûte 30 €.",
  },
  {
    q: "Quelles sont les conditions requises pour intégrer Eugenia School ?",
    a: "Eugenia School est ouvert aux lycéens de terminale générale ou technologique avec un intérêt pour les nouvelles technologies. L'ADN entrepreneurial est un plus. Pour les masters, il faut être titulaire d'un bac+3, soit 180 crédits ECTS, avec l'envie d'avoir une formation technique. Le bootcamp de M1 reprend les bases de l'analyse de données.",
  },
  {
    q: "Sur quoi porte l'entretien de motivation ?",
    a: "L'entretien se compose de trois parties : faire connaissance, un casse-tête logique et une explication de vos motivations.",
  },
  {
    q: "Quand recevrai-je mes résultats d'admission ?",
    a: "Les résultats sont fournis dans un délai de 10 jours après chaque étape du processus de sélection.",
  },
  {
    q: "Puis-je soumettre ma candidature si je n'ai pas encore mes notes de l'année en cours ?",
    a: "Oui, vous pouvez entamer la procédure d'admission et soumettre les notes manquantes plus tard.",
  },
  {
    q: "Quand a lieu la rentrée ?",
    a: "La rentrée a lieu uniquement en septembre. Il n'y a pas de rentrée en janvier.",
  },
  {
    q: "Comment financer ma formation ?",
    a: "Eugenia School, avec le soutien d'entreprises partenaires, offre des bourses couvrant jusqu'à 50 % des frais de scolarité annuels. L'attribution de la bourse est basée sur des critères sociaux et académiques. La demande de bourse doit être faite avant l'inscription. Vous pouvez également demander des prêts étudiants auprès des banques partenaires. Le Master of Science se faisant en alternance, l'employeur prend en charge 100 % des frais de scolarité. Pour toute précision : admission@eugeniaschool.com.",
  },
] as const;

export function confirmedFaq<T extends { a: string }>(faqs: readonly T[]): T[] {
  return faqs.filter((faq) => !faq.a.includes("[À confirmer"));
}

/** The same four steps, addressed to the parent; every fact is the one above. */
export const STEPS_PARENTS = [
  { n: "Étape 1", title: "Candidature en ligne", text: "Le dossier de votre enfant, en ligne. Gratuit pour les résidents de l'Union européenne ; les notes de l'année en cours peuvent être envoyées plus tard." },
  { n: "Étape 2", title: "Étude d'éligibilité", text: "L'équipe d'admission étudie le dossier. Réponse sous 10 jours." },
  { n: "Étape 3", title: "Entretien d'admission", text: "Trois temps : faire connaissance, un casse-tête logique, ses motivations." },
  { n: "Étape 4", title: "Décision finale", text: "Réponse sous 10 jours. La rentrée a lieu en septembre, uniquement." },
] as const;

/** FAQ entries shown on /parents: only validated answers (anything marked « [À confirmer » is skipped at build time). */
export const PARENTS_FAQ_IDS = [1, 7, 0, 4, 2, 6] as const;
