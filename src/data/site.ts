export const SITE = {
  name: "Eugenia School",
  url: "https://www.eugeniaschool.com",
  address: { street: "18 rue de Paradis", postalCode: "75010", city: "Paris", country: "FR" },
  /** Public contact details, as published on eugeniaschool.com/contact. */
  contact: { email: "admission@eugeniaschool.com", phone: "01 31 67 73 88", phoneHref: "tel:+33131677388" },
  description:
    "Eugenia School, l'école de l'IA appliquée au business à Paris : Bachelor et Master en alternance, hors Parcoursup.",
  legalUrl:
    "https://albert-school.notion.site/Mentions-L-gales-Eugenia-School-9a44309e169a4d99ba8ffbdb443ed6bc",
  privacyUrl:
    "https://albert-school.notion.site/Data-Privacy-Politique-de-confidentialit-747674845ae54dafa6e41193471129b4?pvs=4",
} as const;

export const ORG_ID = `${SITE.url}/#organization`;

export const ORGANIZATION = {
  "@type": "CollegeOrUniversity",
  "@id": ORG_ID,
  name: "Eugenia School",
  alternateName: "Eugenia",
  url: `${SITE.url}/`,
  logo: `${SITE.url}/logo.png`,
  description: SITE.description,
  email: SITE.contact.email,
  telephone: "+33131677388",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 rue de Paradis",
    postalCode: "75010",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8748613,
    longitude: 2.3537106,
  },
  parentOrganization: { "@type": "Organization", name: "Albert School" },
  sameAs: [
    "https://www.linkedin.com/school/eugenia-school/",
    "https://www.instagram.com/eugenia.school/",
    "https://www.youtube.com/@EugeniaSchool",
    "https://www.facebook.com/EugeniaSchoolGroupeAGDS/",
  ],
} as const;

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: "Eugenia School",
  url: `${SITE.url}/`,
  inLanguage: "fr-FR",
  publisher: { "@id": ORG_ID },
} as const;

/** Public HubSpot embed identifiers, read from the live eugeniaschool.com pages (not secrets). */
export const HUBSPOT = {
  portalId: "25517078",
  region: "eu1",
  forms: {
    brochure: "6a2d0bc7-da08-4fc0-a33b-57c7901f0d8d",
    candidature: "636c087a-248a-470d-8e70-b50dd08a73b8",
    evenement: "2a34a111-a00d-45dc-8eb8-f2f3def58085",
    contact: "43012bf9-3f27-415c-a452-e5351d4c9299",
  },
} as const;

/** Routes rendered by this build. */
export const ROUTES = {
  home: "/",
  programmes: "/programmes",
  programmeBachelor: "/programme/bachelor-ia-business",
  programmeBachelor3: "/programme/bachelor-ia-business-3eme-annee-alternance",
  programmeMsc: "/programme/master-ia-business-alternance",
  certificationArchitecteIA: "/certification-architecte-ia",
  certificationNoCode: "/certification-concepteur-solutions-no-code",
  carrieres: "/carrieres",
  ecole: "/ecole",
  admissions: "/admissions",
  alternance: "/alternance",
  financement: "/financement",
  processusAdmission: "/processus-admission",
  faq: "/faq",
  entreprises: "/entreprises",
  brochure: "/brochure",
  candidature: "/candidature",
  evenements: "/evenements",
  contact: "/contact",
  parents: "/parents",
  notreAdn: "/notre-adn",
  campusParis: "/campus/paris",
  vieEtudiante: "/vie-etudiante",
  entrepreneuriat: "/entrepreneuriat",
  approchePedagogique: "/approche-pedagogique",
  methodeEugenia: "/methode-eugenia",
  entreprisesPartenaires: "/entreprises-partenaires",
  recruterNosEtudiants: "/recruter-nos-etudiants",
  projetsEntreprises: "/projets-entreprises",
  projetDust: "/projets-entreprises/dust-hackathon",
  projetMistral: "/projets-entreprises/mistral-ai-hackathon",
  projetOpenAI: "/projets-entreprises/openai-hackathon",
  portfolio: "/portfolio",
} as const;

/** Existing pages of the current site that are out of scope of the redesign. */
export const EXTERNAL = {
  portfolio: ROUTES.portfolio,
} as const;

export const NAV = [
  { href: ROUTES.programmes, label: "Programmes" },
  { href: ROUTES.carrieres, label: "Carrières" },
  { href: ROUTES.ecole, label: "L'école" },
  { href: ROUTES.admissions, label: "Admissions" },
  { href: ROUTES.entreprises, label: "Entreprises" },
] as const;
