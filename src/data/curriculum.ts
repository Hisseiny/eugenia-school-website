export interface Course { code:string; name:string; hours:number; ects:number }
export interface Module { name:string; description:string; hours:number; ects:number; courses:Course[] }
export interface Semester { code:"B1"|"B2"|"B3"|"M1"|"M2"; number:1|2; hours:number; ects:number; modules:Module[] }
export interface CurriculumProgram { id:"bachelor"|"bachelor3"|"msc"; years:{code:string;title?:string;intro?:string;semesters:Semester[]}[] }
export const CURRICULA:Record<CurriculumProgram["id"],CurriculumProgram>={
  "bachelor": {
    "id": "bachelor",
    "years": [
      {
        "code": "B1",
        "semesters": [
          {
            "code": "B1",
            "number": 1,
            "hours": 306,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 69,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0141",
                    "name": "Éloquence & Personal Branding",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0142",
                    "name": "Portfolio & Pitch",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0143",
                    "name": "Marketing digital fondamentaux",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 75,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0131",
                    "name": "Workshop Data — Structurer & Visualiser · Google Sheets · Looker Studio",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0132",
                    "name": "Workshop Data — SQL & Requêtes · SELECT · WHERE · GROUP BY",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0133",
                    "name": "Workshop Data — Statistiques appliquées",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 30,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "BRI0151",
                    "name": "Projet Bridge 1",
                    "hours": 30.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 84,
                "ects": 9.0,
                "courses": [
                  {
                    "code": "COD0111",
                    "name": "Bootcamp Python — Fondamentaux · Logique · Scripts",
                    "hours": 48.0,
                    "ects": 5.0
                  },
                  {
                    "code": "COD0112",
                    "name": "Bootcamp LLM & Outils IA — Cursor · Claude · ChatGPT · Prompting",
                    "hours": 36.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 48,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0121",
                    "name": "Bootcamp No-code — Premier workflow automatisé",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0122",
                    "name": "Bootcamp IA Ops — Premier agent no-code connecté",
                    "hours": 24.0,
                    "ects": 2.0
                  }
                ]
              }
            ]
          },
          {
            "code": "B1",
            "number": 2,
            "hours": 366,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0241",
                    "name": "Prise de parole avancée",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0242",
                    "name": "Gestion de projet & Outils",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0243",
                    "name": "Growth & SEO avancé",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0231",
                    "name": "Workshop Data — SQL avancé & Tableau",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0232",
                    "name": "Workshop Data — Data Storytelling · KPIs · Recommandations",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0233",
                    "name": "Workshop Data — Analyse financière · Bilan · P&L · Cash flow",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 120,
                "ects": 10.0,
                "courses": [
                  {
                    "code": "BRI0251",
                    "name": "Projet Bridge 2",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0252",
                    "name": "Projet Bridge 3",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0253",
                    "name": "Projet Bridge 4",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0254",
                    "name": "Hackathon interpromo",
                    "hours": 30.0,
                    "ects": 1.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "COD0211",
                    "name": "Workshop Code — Automatisation · Scripts métier · Scrapping Python",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "COD0212",
                    "name": "Workshop Code — API & Intégrations · Connexions LLM",
                    "hours": 30.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0221",
                    "name": "Workshop Build — App métier fonctionnelle · Scrapping no-code",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0222",
                    "name": "Workshop Build — Stack d'outils connectés",
                    "hours": 30.0,
                    "ects": 2.0
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "code": "B2",
        "title": "Construire la stack IA",
        "intro": "Entrepreneuriat, leadership, CRM, business plan, levée de fonds, go-to-market et négociation, avec agents IA, automatisation et données, en conditions réelles.",
        "semesters": [
          {
            "code": "B2",
            "number": 1,
            "hours": 306,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 69,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0341",
                    "name": "Entrepreneuriat & Idéation",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0342",
                    "name": "Leadership & Management",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0343",
                    "name": "CRM & Relation client · HubSpot · Salesforce",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 75,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0331",
                    "name": "Workshop Data — Power BI · Visualisation avancée · Dashboards pro",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0332",
                    "name": "Workshop Data — IA analytique & Insights · Outils IA analyse",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0333",
                    "name": "Workshop Data — Business Plan · Modèle économique · Projection financière",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 30,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "BRI0351",
                    "name": "Projet Bridge 1",
                    "hours": 30.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 84,
                "ects": 9.0,
                "courses": [
                  {
                    "code": "COD0311",
                    "name": "Bootcamp Python avancé — Architecture · Classes · Gestion erreurs",
                    "hours": 48.0,
                    "ects": 5.0
                  },
                  {
                    "code": "COD0312",
                    "name": "Bootcamp Agents IA — Orchestration · Mémoire · Outils connectés",
                    "hours": 36.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 48,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0321",
                    "name": "Bootcamp Build avancé — Outil interne complet",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0322",
                    "name": "Bootcamp Stack IA — Stack IA connectée & fiabilisée",
                    "hours": 24.0,
                    "ects": 2.0
                  }
                ]
              }
            ]
          },
          {
            "code": "B2",
            "number": 2,
            "hours": 366,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0441",
                    "name": "Posture consultant & Négociation",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0442",
                    "name": "Grand oral & Préparation pro",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0443",
                    "name": "Stratégie Go-to-market",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0431",
                    "name": "Workshop Data — Data stratégie · Audit · Roadmap · Notion · Miro",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0432",
                    "name": "Workshop Data — Data pour la décision · Python · SQL · Power BI",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0433",
                    "name": "Workshop Data — Finance entrepreneuriale · Cap table · Levée de fonds",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 120,
                "ects": 10.0,
                "courses": [
                  {
                    "code": "BRI0451",
                    "name": "Projet Bridge 2",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0452",
                    "name": "Projet Bridge 3",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0453",
                    "name": "Projet Bridge 4",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0454",
                    "name": "Hackathon interpromo",
                    "hours": 30.0,
                    "ects": 1.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "COD0411",
                    "name": "Workshop Code — Déploiement & Systèmes IA",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "COD0412",
                    "name": "Workshop Code — RAG & IA avancée",
                    "hours": 30.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0421",
                    "name": "Workshop Build — Stack documentée & transmissible",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0422",
                    "name": "Workshop Build — Audit & Recommandation de stack",
                    "hours": 30.0,
                    "ects": 2.0
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "code": "B3",
        "title": "Partir en entreprise",
        "intro": "Alternance ou stage, trois blocs no code (cadrer, développer, déployer) et le titre RNCP 41143.",
        "semesters": [
          {
            "code": "B3",
            "number": 1,
            "hours": 210,
            "ects": 36.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 21,
                "ects": 2.0,
                "courses": [
                  {
                    "code": "SPE0541",
                    "name": "Communication, entrepreneuriat & portfolio",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 28,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "DAT0531",
                    "name": "Structuration et restitution de la donnée",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 0,
                "ects": 14.0,
                "courses": [
                  {
                    "code": "BRI52-1",
                    "name": "Alternance / Stage",
                    "hours": 0.0,
                    "ects": 14.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 112,
                "ects": 12.0,
                "courses": [
                  {
                    "code": "COD0511",
                    "name": "Fondamentaux de l'IA générative",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0512",
                    "name": "Automatisation de processus métier",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0513",
                    "name": "Conception d'agents IA",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0514",
                    "name": "Intégration technique de l'IA",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 49,
                "ects": 5.0,
                "courses": [
                  {
                    "code": "BUI0521",
                    "name": "Conception et prototypage d'interfaces",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0522",
                    "name": "Développement multi-plateforme et personnalisation avancée",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              }
            ]
          },
          {
            "code": "B3",
            "number": 2,
            "hours": 210,
            "ects": 45.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0641",
                    "name": "Cadrer un projet no code (BC01 — certifiant)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0631",
                    "name": "Déployer et accompagner une solution no code (BC03 — certifiant)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 70,
                "ects": 27.0,
                "courses": [
                  {
                    "code": "BRI0651",
                    "name": "Hackathon interpromo",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI0652",
                    "name": "Hackathon 3 — Inter-écoles",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI065-1",
                    "name": "Alternance / Stage",
                    "hours": 0.0,
                    "ects": 15.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 56,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "BUI0621",
                    "name": "Développer une solution no code (BC02 — certifiant)",
                    "hours": 56.0,
                    "ects": 6.0
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "bachelor3": {
    "id": "bachelor3",
    "years": [
      {
        "code": "B3",
        "title": "Partir en entreprise",
        "intro": "Alternance ou stage, trois blocs no code (cadrer, développer, déployer) et le titre RNCP 41143.",
        "semesters": [
          {
            "code": "B3",
            "number": 1,
            "hours": 210,
            "ects": 36.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 21,
                "ects": 2.0,
                "courses": [
                  {
                    "code": "SPE0541",
                    "name": "Communication, entrepreneuriat & portfolio",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 28,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "DAT0531",
                    "name": "Structuration et restitution de la donnée",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 0,
                "ects": 14.0,
                "courses": [
                  {
                    "code": "BRI52-1",
                    "name": "Alternance / Stage",
                    "hours": 0.0,
                    "ects": 14.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 112,
                "ects": 12.0,
                "courses": [
                  {
                    "code": "COD0511",
                    "name": "Fondamentaux de l'IA générative",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0512",
                    "name": "Automatisation de processus métier",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0513",
                    "name": "Conception d'agents IA",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0514",
                    "name": "Intégration technique de l'IA",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 49,
                "ects": 5.0,
                "courses": [
                  {
                    "code": "BUI0521",
                    "name": "Conception et prototypage d'interfaces",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0522",
                    "name": "Développement multi-plateforme et personnalisation avancée",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              }
            ]
          },
          {
            "code": "B3",
            "number": 2,
            "hours": 210,
            "ects": 45.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0641",
                    "name": "Cadrer un projet no code (BC01 — certifiant)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0631",
                    "name": "Déployer et accompagner une solution no code (BC03 — certifiant)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 70,
                "ects": 27.0,
                "courses": [
                  {
                    "code": "BRI0651",
                    "name": "Hackathon interpromo",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI0652",
                    "name": "Hackathon 3 — Inter-écoles",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI065-1",
                    "name": "Alternance / Stage",
                    "hours": 0.0,
                    "ects": 15.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 56,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "BUI0621",
                    "name": "Développer une solution no code (BC02 — certifiant)",
                    "hours": 56.0,
                    "ects": 6.0
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "msc": {
    "id": "msc",
    "years": [
      {
        "code": "M1",
        "title": "Année 1 · M1",
        "semesters": [
          {
            "code": "M1",
            "number": 1,
            "hours": 226,
            "ects": 30.0,
            "modules": [
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 30,
                "ects": 4.5,
                "courses": [
                  {
                    "code": "BRI0751",
                    "name": "Hackathon 1 — Inter-masters",
                    "hours": 30.0,
                    "ects": 4.5
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 112,
                "ects": 15.0,
                "courses": [
                  {
                    "code": "COD0711",
                    "name": "Code Python",
                    "hours": 56.0,
                    "ects": 8.0
                  },
                  {
                    "code": "COD0712",
                    "name": "N8N RAG",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "COD0713",
                    "name": "Prompt engineering & agent IA",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 84,
                "ects": 10.5,
                "courses": [
                  {
                    "code": "BUI0721",
                    "name": "Google Sheet + Apps Script",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "BUI0722",
                    "name": "Workshop no code",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "BUI0723",
                    "name": "Vibe Coding",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              }
            ]
          },
          {
            "code": "M1",
            "number": 2,
            "hours": 228,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 77,
                "ects": 9.5,
                "courses": [
                  {
                    "code": "SPE0841",
                    "name": "Digital Marketing",
                    "hours": 21.0,
                    "ects": 2.5
                  },
                  {
                    "code": "SPE0842",
                    "name": "Revops",
                    "hours": 21.0,
                    "ects": 2.5
                  },
                  {
                    "code": "SPE0843",
                    "name": "Portfolio",
                    "hours": 14.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0844",
                    "name": "Design thinking · Gestion de projet · RGPD",
                    "hours": 21.0,
                    "ects": 2.5
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 63,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0831",
                    "name": "SQL — Data analyst",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "DAT0832",
                    "name": "Tableau",
                    "hours": 14.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0833",
                    "name": "Power BI",
                    "hours": 21.0,
                    "ects": 2.5
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 60,
                "ects": 9.0,
                "courses": [
                  {
                    "code": "BRI0851",
                    "name": "Hackathon 2 — Inter-promos",
                    "hours": 30.0,
                    "ects": 4.5
                  },
                  {
                    "code": "BRI0852",
                    "name": "Hackathon 3 — Inter-écoles",
                    "hours": 30.0,
                    "ects": 4.5
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 28,
                "ects": 3.5,
                "courses": [
                  {
                    "code": "COD0811",
                    "name": "Projet Python",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "code": "M2",
        "title": "Année 2 · M2",
        "semesters": [
          {
            "code": "M2",
            "number": 1,
            "hours": 205,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, management, prise de parole",
                "hours": 56,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "SPE0941",
                    "name": "Design thinking & Gestion de projet",
                    "hours": 28.0,
                    "ects": 4.0
                  },
                  {
                    "code": "SPE0942",
                    "name": "Personal Branding",
                    "hours": 28.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 56,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0931",
                    "name": "Data Analytics",
                    "hours": 28.0,
                    "ects": 4.0
                  },
                  {
                    "code": "DAT0932",
                    "name": "SQL avancé & DBT",
                    "hours": 28.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 30,
                "ects": 4.5,
                "courses": [
                  {
                    "code": "BRI0951",
                    "name": "Hackathon 1 — Inter-masters",
                    "hours": 30.0,
                    "ects": 4.5
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 63,
                "ects": 9.5,
                "courses": [
                  {
                    "code": "COD0911",
                    "name": "Prompt engineering & IA",
                    "hours": 28.0,
                    "ects": 4.0
                  },
                  {
                    "code": "COD0912",
                    "name": "N8N RAG",
                    "hours": 35.0,
                    "ects": 5.5
                  }
                ]
              }
            ]
          },
          {
            "code": "M2",
            "number": 2,
            "hours": 235,
            "ects": 30.0,
            "modules": [
              {
                "name": "Data",
                "description": "Données, finance, stratégie, aide à la décision",
                "hours": 84,
                "ects": 10.5,
                "courses": [
                  {
                    "code": "DAT1031",
                    "name": "Data architecture for AI",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "DAT1032",
                    "name": "Data pipelines for AI",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "DAT1033",
                    "name": "Data Governance & RGPD",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projets et hackathons avec des entreprises",
                "hours": 60,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "BRI1051",
                    "name": "Hackathon 2 — Inter-promos",
                    "hours": 30.0,
                    "ects": 4.0
                  },
                  {
                    "code": "BRI1052",
                    "name": "Hackathon 3 — Inter-écoles",
                    "hours": 30.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code et IA",
                "hours": 63,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "COD1011",
                    "name": "Machine Learning",
                    "hours": 35.0,
                    "ects": 4.5
                  },
                  {
                    "code": "COD1012",
                    "name": "LLM Fine tuning & RAG",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Outils et no-code",
                "hours": 28,
                "ects": 3.5,
                "courses": [
                  {
                    "code": "BUI1021",
                    "name": "AI deployment",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
