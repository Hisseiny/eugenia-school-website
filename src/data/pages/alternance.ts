import type { LivePage } from "@/data/pages/types";
import { faqPageLd } from "@/data/faq";

const items = [
  {
    "q": "Muss ich mein Unternehmen allein finden?",
    "a": "Die Schule begleitet dich bei der Suche nach einer dualen Ausbildung: Lebenslauf, Coachings für Vorstellungsgespräche, Job Datings auf dem Campus und eine eigene Plattform, zugänglich nach der Zulassung. Dein eigenes Engagement wird erwartet."
  },
  {
    "q": "Wer finanziert die duale Ausbildung?",
    "a": "Das Unternehmen übernimmt die Studiengebühren: Du musst nichts bezahlen. Die Schule kümmert sich um den Verwaltungsteil."
  },
  {
    "q": "Sind die Job Datings für Bewerber offen?",
    "a": "Sie sind den bereits zugelassenen Studierenden vorbehalten. Sie finden von Januar bis Juli auf dem Campus mit Partnerunternehmen statt."
  },
  {
    "q": "Welche Verträge werden akzeptiert?",
    "a": "Professionalisierungs- und Ausbildungsverträge werden akzeptiert."
  },
  {
    "q": "Wie ist der Rhythmus der dualen Ausbildung?",
    "a": "Im MSc verbringst du nach einem 5-wöchigen Bootcamp 4 Tage im Unternehmen und 1 Tag an der Schule. Das 3. Bachelorjahr kann ab Bac+2 ebenfalls dual absolviert werden."
  }
];
export const page: LivePage = {
  "title": "Duale Schule, Bachelor und MSc | Eugenia School",
  "description": "Duale Schule: Lebenslauf, Coaching für Vorstellungsgespräche, Job Datings auf dem Campus und eigene Plattform. Bachelor 3. Jahr und MSc, Gebühren vom Unternehmen bezahlt.",
  "h1": "Deine duale Ausbildung, von A bis Z.",
  "image": "pr3_hero-bachelor",
  "imageAlt": "Drei Studierende der Eugenia School arbeiten nebeneinander an ihren Computern",
  "lead": "Du bringst dich ein, die Schule begleitet dich: Lebenslauf, Coaching für Vorstellungsgespräche, Job Datings auf dem Campus und eine eigene Plattform. Das Unternehmen finanziert, die Schule kümmert sich um die Verwaltung.",
  "eyebrow": "// école en alternance · bachelor 3e année & msc",
  "facts": [],
  "sections": [
    {
      "title": "Vier Stützen, ein Vertrag.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Dein Engagement zählt: Die Schule hilft dir beim Vorbereiten, Treffen und Unterschreiben."
        },
        {
          "type": "cards",
          "items": [
            {
              "number": "01",
              "title": "Ein Lebenslauf, der zu dir passt",
              "text": "Das Team hilft dir, deinen Lebenslauf so zu gestalten, dass er die Recruiter deiner Branche anspricht."
            },
            {
              "number": "02",
              "title": "Coachings für die duale Ausbildung",
              "text": "Du trainierst Vorstellungsgespräche in eigenen Coachings, bevor du die Unternehmen triffst."
            },
            {
              "number": "03",
              "title": "Job Datings auf dem Campus",
              "text": "Von Januar bis Juli kommen Partnerunternehmen auf den Campus: Du führst direkt Gespräche mit den Recruitern. Die Job Datings sind den zugelassenen Studierenden vorbehalten."
            },
            {
              "number": "04",
              "title": "Eine Plattform nur für dich",
              "text": "Eine für die Studierenden geschaffene Plattform bündelt alle Tipps zur dualen Ausbildung: wie du trainierst, Stellen suchst, dein Netzwerk aktivierst. Sie ist nach der Zulassung zugänglich."
            }
          ]
        }
      ],
      "eyebrow": "wie es abläuft"
    },
    {
      "title": "Von der Zulassung bis zum ersten Tag.",
      "blocks": [
        {
          "type": "cards",
          "items": [
            { "number": "01", "title": "Du bist zugelassen", "text": "Die Zulassung öffnet den Zugang zu den Job Datings und zur Plattform." },
            { "number": "02", "title": "Du bereitest dich vor", "text": "Lebenslauf, Coachings, Plattform: Du baust deine Suche mit dem Team auf." },
            { "number": "03", "title": "Du triffst die Recruiter", "text": "Die Job Datings finden von Januar bis Juli auf dem Campus statt." },
            { "number": "04", "title": "Du unterschreibst deinen Vertrag", "text": "Professionalisierungs- oder Ausbildungsvertrag: Die Schule kümmert sich um den Verwaltungsteil." },
            { "number": "05", "title": "Du startest im September", "text": "Studienbeginn im September. Im MSc geht dem Rhythmus von 4 Tagen im Unternehmen und 1 Tag an der Schule ein 5-wöchiges Bootcamp voraus." }
          ]
        }
      ],
      "eyebrow": "was es kostet"
    },
    {
      "title": "0 € Studiengebühren für dich.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Das Unternehmen übernimmt die duale Ausbildung. Die Schule kümmert sich um den Verwaltungsteil: Du wirst von A bis Z begleitet."
        }
      ],
      "eyebrow": "Verträge und Rhythmus"
    },
    {
      "title": "Zwei Wege, dieselbe Begleitung.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "MSc · dual"
        },
        {
          "type": "heading",
          "level": 3,
          "text": "Ein Bac+5 im dualen Rhythmus"
        },
        {
          "type": "paragraph",
          "text": "Nach einem 5-wöchigen Bootcamp: 4 Tage im Unternehmen, 1 Tag an der Schule. Professionalisierungs- und Ausbildungsverträge werden akzeptiert."
        },
        {
          "type": "cta",
          "label": "Den MSc entdecken →",
          "href": "/programme/master-ia-business-alternance"
        },
        {
          "type": "paragraph",
          "text": "Bachelor · 3. Jahr"
        },
        {
          "type": "heading",
          "level": 3,
          "text": "Das 3. Jahr dual"
        },
        {
          "type": "paragraph",
          "text": "Das 3. Bachelorjahr kann ab Bac+2 dual absolviert werden. Dieselben Stützen: Lebenslauf, Coachings, Job Datings und Plattform."
        },
        {
          "type": "cta",
          "label": "Das 3. Jahr entdecken →",
          "href": "/programme/bachelor-ia-business-3eme-annee-alternance"
        }
      ],
      "eyebrow": "sie nehmen unsere dual Studierenden auf"
    },
    {
      "title": "Unternehmen, die rekrutieren.",
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
          "alt": "Französisches Verteidigungsministerium",
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
      "eyebrow": "sie sind in dualer Ausbildung"
    },
    {
      "title": "Ihre Stellen, ganz real.",
      "blocks": [
        {
          "type": "cards",
          "items": [
            { "number": "MSc · M2", "title": "Ali H.", "text": "Studieningenieur", "image": "pr3_portrait-ali", "alt": "Porträt von Ali, M2 an der Eugenia School", "logo": "lg_accenture", "logoAlt": "Accenture" },
            { "number": "MSc · M1 · Dual", "title": "Victoria I.", "text": "Business Developer, öffentlicher Sektor", "image": "pr3_portrait-victoria", "alt": "Porträt von Victoria, M1 an der Eugenia School", "logo": "lg_misteria", "logoAlt": "Mister IA" },
            { "number": "MSc · M1", "title": "Lenja S.", "text": "Conversion Rate Optimization Analyst", "image": "pr3_portrait-lenja", "alt": "Porträt von Lenja, M1 an der Eugenia School", "logo": "lg_lvmh", "logoAlt": "LVMH" }
          ]
        },
        {
          "type": "link",
          "label": "Alle Werdegänge ansehen →",
          "href": "/carrieres"
        }
      ],
      "eyebrow": "häufige Fragen"
    },
    {
      "title": "Die duale Ausbildung in fünf Antworten.",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Muss ich mein Unternehmen allein finden?",
              "a": "Die Schule begleitet dich bei der Suche nach einer dualen Ausbildung: Lebenslauf, Coachings für Vorstellungsgespräche, Job Datings auf dem Campus und eine eigene Plattform, zugänglich nach der Zulassung. Dein eigenes Engagement wird erwartet."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Die Schule begleitet dich bei der Suche nach einer dualen Ausbildung: Lebenslauf, Coachings für Vorstellungsgespräche, Job Datings auf dem Campus und eine eigene Plattform, zugänglich nach der Zulassung. Dein eigenes Engagement wird erwartet."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wer finanziert die duale Ausbildung?",
              "a": "Das Unternehmen übernimmt die Studiengebühren: Du musst nichts bezahlen. Die Schule kümmert sich um den Verwaltungsteil."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Das Unternehmen übernimmt die Studiengebühren: Du musst nichts bezahlen. Die Schule kümmert sich um den Verwaltungsteil."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Sind die Job Datings für Bewerber offen?",
              "a": "Sie sind den bereits zugelassenen Studierenden vorbehalten. Sie finden von Januar bis Juli auf dem Campus mit Partnerunternehmen statt."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Sie sind den bereits zugelassenen Studierenden vorbehalten. Sie finden von Januar bis Juli auf dem Campus mit Partnerunternehmen statt."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Welche Verträge werden akzeptiert?",
              "a": "Professionalisierungs- und Ausbildungsverträge werden akzeptiert."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Professionalisierungs- und Ausbildungsverträge werden akzeptiert."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wie ist der Rhythmus der dualen Ausbildung?",
              "a": "Im MSc verbringst du nach einem 5-wöchigen Bootcamp 4 Tage im Unternehmen und 1 Tag an der Schule. Das 3. Bachelorjahr kann ab Bac+2 ebenfalls dual absolviert werden."
            }
          ],
          "idPrefix": "alternance"
        },
        {
          "type": "paragraph",
          "text": "Im MSc verbringst du nach einem 5-wöchigen Bootcamp 4 Tage im Unternehmen und 1 Tag an der Schule. Das 3. Bachelorjahr kann ab Bac+2 ebenfalls dual absolviert werden."
        }
      ],
      "eyebrow": "Studienbeginn im September"
    },
    {
      "title": "Gestalte deine duale Ausbildung.",
      "blocks": [
        {
          "type": "cta",
          "label": "Bewerben →",
          "href": "/candidature"
        },
        {
          "type": "cta",
          "label": "Broschüre erhalten",
          "href": "/brochure"
        }
      ]
    }
  ],
  "internalLinks": [
    {
      "label": "Bewerben →",
      "href": "/candidature"
    },
    {
      "label": "Broschüre erhalten",
      "href": "/brochure"
    },
    {
      "label": "Den MSc entdecken →",
      "href": "/programme/master-ia-business-alternance"
    },
    {
      "label": "Das 3. Jahr entdecken →",
      "href": "/programme/bachelor-ia-business-3eme-annee-alternance"
    },
    {
      "label": "Alle Werdegänge ansehen →",
      "href": "/carrieres"
    },
    {
      "label": "Bewerben →",
      "href": "/candidature"
    },
    {
      "label": "Broschüre erhalten",
      "href": "/brochure"
    }
  ],
  "footer": {
    "title": "Gestalte deine duale Ausbildung.",
    "primary": {
      "label": "Bewerben →",
      "href": "/candidature"
    },
    "secondary": {
      "label": "Nächste Veranstaltung",
      "href": "/evenements"
    }
  },
  "next": {
    "href": "/admissions",
    "title": "Zulassung",
    "text": "Zur Zulassung",
    "image": "p_arches"
  }
};

page.jsonLd = [faqPageLd(items)];
