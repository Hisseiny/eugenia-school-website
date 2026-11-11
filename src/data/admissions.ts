export const STEPS = [
  { n: "Étape 1", title: "Candidature en ligne", text: "Ton dossier, en ligne. Gratuit pour les résidents UE." },
  { n: "Étape 2", title: "Étude d'éligibilité", text: "L'équipe d'admission étudie ton dossier." },
  { n: "Étape 3", title: "Entretien d'admission", text: "Un échange avec l'équipe d'admission." },
  { n: "Étape 4", title: "Décision finale", text: "Et une rentrée en septembre." },
] as const;

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
 * current eugeniaschool.com/faq page (admissions section). The financing answer is for the school
 * to confirm, as the brief asks.
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
    a: "[À confirmer par l'école] Eugenia School, avec le soutien d'entreprises partenaires, offre des bourses couvrant jusqu'à 50 % des frais de scolarité annuels. Le Master of Science se faisant en alternance, l'employeur prend en charge 100 % des frais de scolarité.",
  },
] as const;
