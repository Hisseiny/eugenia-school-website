import type { LivePage } from "@/data/pages/types";
import { faqPageLd } from "@/data/faq";

const items = [
  {
    "q": "Dois-je trouver mon entreprise seul ?",
    "a": "L’école t’accompagne dans ta recherche d’alternance : CV, coachings aux entretiens, job datings sur le campus et plateforme dédiée, accessible une fois admis. Une implication de ta part est attendue."
  },
  {
    "q": "Qui finance l’alternance ?",
    "a": "L’entreprise prend en charge les frais de scolarité : tu n’as rien à payer. L’école gère la partie administrative de son côté."
  },
  {
    "q": "Les job datings sont-ils ouverts aux candidats ?",
    "a": "Ils sont réservés aux étudiants déjà admis. Ils ont lieu sur le campus, de janvier à juillet, avec des entreprises partenaires."
  },
  {
    "q": "Quels contrats sont acceptés ?",
    "a": "Les contrats de professionnalisation et d’apprentissage sont acceptés."
  },
  {
    "q": "Quel est le rythme de l’alternance ?",
    "a": "Au MSc, après un bootcamp de 5 semaines, tu passes 4 jours en entreprise et 1 jour à l’école. La 3e année du Bachelor peut aussi se faire en alternance, dès le Bac+2."
  }
];
export const page: LivePage = {
  "title": "École en alternance, Bachelor et MSc | Eugenia School",
  "description": "École en alternance : CV, coaching aux entretiens, job datings sur le campus et plateforme dédiée. Bachelor 3e année et MSc, frais payés par l’entreprise.",
  "h1": "Ton alternance, de A à Z.",
  "image": "pr3_hero-bachelor",
  "imageAlt": "Trois étudiants d’Eugenia School travaillent côte à côte sur leurs ordinateurs",
  "lead": "Tu t’impliques, l’école t’accompagne : CV, coaching aux entretiens, job datings sur le campus et une plateforme dédiée. L’entreprise finance, l’école gère l’administratif.",
  "eyebrow": "// école en alternance · bachelor 3e année & msc",
  "facts": [],
  "sections": [
    {
      "title": "Quatre appuis, un contrat.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ton implication compte : l’école t’aide à préparer, à rencontrer et à signer."
        },
        {
          "type": "cards",
          "items": [
            {
              "number": "01",
              "title": "Un CV qui te ressemble",
              "text": "L’équipe t’aide à construire ton CV pour qu’il parle aux recruteurs de ton secteur."
            },
            {
              "number": "02",
              "title": "Des coachings alternance",
              "text": "Tu t’entraînes aux entretiens avec des coachings dédiés, avant de rencontrer les entreprises."
            },
            {
              "number": "03",
              "title": "Des job datings sur le campus",
              "text": "De janvier à juillet, des entreprises partenaires viennent sur le campus : tu passes directement des entretiens avec les recruteurs. Les job datings sont réservés aux étudiants admis."
            },
            {
              "number": "04",
              "title": "Une plateforme rien que pour toi",
              "text": "Une plateforme créée pour les étudiants rassemble tous les conseils pour l’alternance : comment t’entraîner, chercher des postes, activer ton réseau. Elle est accessible une fois admis."
            }
          ]
        }
      ],
      "eyebrow": "comment ça se passe"
    },
    {
      "title": "De l’admission au premier jour.",
      "blocks": [
        {
          "type": "cards",
          "items": [
            { "number": "01", "title": "Tu es admis", "text": "L’admission ouvre l’accès aux job datings et à la plateforme." },
            { "number": "02", "title": "Tu te prépares", "text": "CV, coachings alternance, plateforme : tu construis ta recherche avec l’équipe." },
            { "number": "03", "title": "Tu rencontres les recruteurs", "text": "Les job datings se tiennent sur le campus, de janvier à juillet." },
            { "number": "04", "title": "Tu signes ton contrat", "text": "Contrat de professionnalisation ou d’apprentissage : l’école gère la partie administrative." },
            { "number": "05", "title": "Tu démarres en septembre", "text": "Rentrée en septembre. Au MSc, un bootcamp de 5 semaines précède le rythme 4 jours en entreprise, 1 jour à l’école." }
          ]
        }
      ],
      "eyebrow": "ce que ça coûte"
    },
    {
      "title": "0 € de frais de scolarité pour toi.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "L’entreprise prend en charge l’alternance. L’école gère la partie administrative de son côté : tu es accompagné de A à Z."
        }
      ],
      "eyebrow": "contrats et rythme"
    },
    {
      "title": "Deux voies, un même accompagnement.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "MSc · alternance"
        },
        {
          "type": "heading",
          "level": 3,
          "text": "Un Bac+5 en rythme alterné"
        },
        {
          "type": "paragraph",
          "text": "Après un bootcamp de 5 semaines : 4 jours en entreprise, 1 jour à l’école. Les contrats de professionnalisation et d’apprentissage sont acceptés."
        },
        {
          "type": "cta",
          "label": "Découvrir le MSc →",
          "href": "/programme/master-ia-business-alternance"
        },
        {
          "type": "paragraph",
          "text": "Bachelor · 3e année"
        },
        {
          "type": "heading",
          "level": 3,
          "text": "La 3e année en alternance"
        },
        {
          "type": "paragraph",
          "text": "La 3e année du Bachelor peut se faire en alternance, dès le Bac+2. Mêmes appuis : CV, coachings, job datings et plateforme."
        },
        {
          "type": "cta",
          "label": "Découvrir la 3e année →",
          "href": "/programme/bachelor-ia-business-3eme-annee-alternance"
        }
      ],
      "eyebrow": "ils accueillent nos alternants"
    },
    {
      "title": "Des entreprises qui recrutent.",
      "blocks": [
        {
          "type": "image",
          "name": "lg_accenture",
          "alt": "Accenture",
          "logo": true
        },
        {
          "type": "image",
          "name": "lg_lvmh",
          "alt": "LVMH",
          "logo": true
        },
        {
          "type": "image",
          "name": "lg_carrefour",
          "alt": "Carrefour",
          "logo": true
        },
        {
          "type": "image",
          "name": "lg_misteria",
          "alt": "Mister IA",
          "logo": true
        },
        {
          "type": "image",
          "name": "lg_armees",
          "alt": "Ministère des Armées",
          "logo": true
        },
        {
          "type": "image",
          "name": "lg_effy",
          "alt": "EFFY",
          "logo": true
        },
        {
          "type": "image",
          "name": "lg_licter",
          "alt": "Licter",
          "logo": true
        },
        {
          "type": "image",
          "name": "pr3_logo-ocobo",
          "alt": "Ocobo",
          "logo": true
        }
      ],
      "eyebrow": "ils sont en alternance"
    },
    {
      "title": "Leurs postes, pour de vrai.",
      "blocks": [
        {
          "type": "cards",
          "items": [
            { "number": "MSc · M2", "title": "Ali H.", "text": "Ingénieur d’études", "image": "pr3_portrait-ali", "alt": "Portrait de Ali, M2 à Eugenia School", "logo": "lg_accenture", "logoAlt": "Accenture" },
            { "number": "MSc · M1 · Alternance", "title": "Victoria I.", "text": "Business Developer, secteur public", "image": "pr3_portrait-victoria", "alt": "Portrait de Victoria, M1 à Eugenia School", "logo": "lg_misteria", "logoAlt": "Mister IA" },
            { "number": "MSc · M1", "title": "Lenja S.", "text": "Conversion Rate Optimization Analyst", "image": "pr3_portrait-lenja", "alt": "Portrait de Lenja, M1 à Eugenia School", "logo": "lg_lvmh", "logoAlt": "LVMH" }
          ]
        },
        {
          "type": "link",
          "label": "Voir toutes les trajectoires →",
          "href": "/carrieres"
        }
      ],
      "eyebrow": "questions fréquentes"
    },
    {
      "title": "L’alternance, en cinq réponses.",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Dois-je trouver mon entreprise seul ?",
              "a": "L’école t’accompagne dans ta recherche d’alternance : CV, coachings aux entretiens, job datings sur le campus et plateforme dédiée, accessible une fois admis. Une implication de ta part est attendue."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "L’école t’accompagne dans ta recherche d’alternance : CV, coachings aux entretiens, job datings sur le campus et plateforme dédiée, accessible une fois admis. Une implication de ta part est attendue."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Qui finance l’alternance ?",
              "a": "L’entreprise prend en charge les frais de scolarité : tu n’as rien à payer. L’école gère la partie administrative de son côté."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "L’entreprise prend en charge les frais de scolarité : tu n’as rien à payer. L’école gère la partie administrative de son côté."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Les job datings sont-ils ouverts aux candidats ?",
              "a": "Ils sont réservés aux étudiants déjà admis. Ils ont lieu sur le campus, de janvier à juillet, avec des entreprises partenaires."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Ils sont réservés aux étudiants déjà admis. Ils ont lieu sur le campus, de janvier à juillet, avec des entreprises partenaires."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quels contrats sont acceptés ?",
              "a": "Les contrats de professionnalisation et d’apprentissage sont acceptés."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Les contrats de professionnalisation et d’apprentissage sont acceptés."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quel est le rythme de l’alternance ?",
              "a": "Au MSc, après un bootcamp de 5 semaines, tu passes 4 jours en entreprise et 1 jour à l’école. La 3e année du Bachelor peut aussi se faire en alternance, dès le Bac+2."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Au MSc, après un bootcamp de 5 semaines, tu passes 4 jours en entreprise et 1 jour à l’école. La 3e année du Bachelor peut aussi se faire en alternance, dès le Bac+2."
        }
      ],
      "eyebrow": "rentrée en septembre"
    },
    {
      "title": "Construis ton alternance.",
      "blocks": [
        {
          "type": "cta",
          "label": "Candidater →",
          "href": "/candidature"
        },
        {
          "type": "cta",
          "label": "Recevoir la brochure",
          "href": "/brochure"
        }
      ]
    }
  ],
  "internalLinks": [
    {
      "label": "Candidater →",
      "href": "/candidature"
    },
    {
      "label": "Recevoir la brochure",
      "href": "/brochure"
    },
    {
      "label": "Découvrir le MSc →",
      "href": "/programme/master-ia-business-alternance"
    },
    {
      "label": "Découvrir la 3e année →",
      "href": "/programme/bachelor-ia-business-3eme-annee-alternance"
    },
    {
      "label": "Voir toutes les trajectoires →",
      "href": "/carrieres"
    },
    {
      "label": "Candidater →",
      "href": "/candidature"
    },
    {
      "label": "Recevoir la brochure",
      "href": "/brochure"
    }
  ],
  "footer": {
    "title": "Construis ton alternance.",
    "primary": {
      "label": "Candidater →",
      "href": "/candidature"
    },
    "secondary": {
      "label": "Prochain événement",
      "href": "/evenements"
    }
  },
  "next": {
    "href": "/admissions",
    "title": "Admissions",
    "text": "Voir les admissions",
    "image": "p_arches"
  }
};

page.jsonLd = [faqPageLd(items)];
