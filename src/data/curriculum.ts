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
                "description": "Marketing, Management, Präsentieren",
                "hours": 69,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0141",
                    "name": "Beredsamkeit und persönliches Branding",
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
                    "name": "Grundlagen des digitalen Marketings",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 75,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0131",
                    "name": "Workshop-Daten – Strukturieren und Visualisieren · Google Sheets · Looker Studio",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0132",
                    "name": "Workshop-Daten – SQL und Abfragen · SELECT · WHERE · GROUP BY",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0133",
                    "name": "Workshop-Daten – Angewandte Statistik",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 30,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "BRI0151",
                    "name": "Bridge 1-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 84,
                "ects": 9.0,
                "courses": [
                  {
                    "code": "COD0111",
                    "name": "Python Bootcamp – Grundlagen · Logik · Skripting",
                    "hours": 48.0,
                    "ects": 5.0
                  },
                  {
                    "code": "COD0112",
                    "name": "Bootcamp für LLM- und KI-Tools – Cursor · Claude · ChatGPT · Eingabeaufforderung",
                    "hours": 36.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 48,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0121",
                    "name": "No-Code-Bootcamp – Erster automatisierter Workflow",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0122",
                    "name": "AI Ops Bootcamp – Erster verbundener No-Code-Agent",
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
                "description": "Marketing, Management, Präsentieren",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0241",
                    "name": "Fortgeschrittenes Sprechen",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0242",
                    "name": "Projektmanagement und Tools",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0243",
                    "name": "Wachstum und fortschrittliches SEO",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0231",
                    "name": "Workshop-Daten – Fortgeschrittenes SQL und Tableau",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0232",
                    "name": "Workshop-Daten – Data Storytelling · KPIs · Empfehlungen",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0233",
                    "name": "Workshop-Daten – Finanzanalyse · Bilanz · Gewinn- und Verlustrechnung · Cashflow",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 120,
                "ects": 10.0,
                "courses": [
                  {
                    "code": "BRI0251",
                    "name": "Bridge 2-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0252",
                    "name": "Bridge 3-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0253",
                    "name": "Bridge 4-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0254",
                    "name": "Interpromo-Hackathon",
                    "hours": 30.0,
                    "ects": 1.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "COD0211",
                    "name": "Workshop-Code – Automatisierung · Geschäftsskripte · Verschrottung von Python",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "COD0212",
                    "name": "Workshop-Code – API & Integrationen · LLM-Verbindungen",
                    "hours": 30.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0221",
                    "name": "Workshop Build – Funktionale Geschäftsanwendung · Verschrottung von No-Code",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0222",
                    "name": "Workshop Build – Stapel vernetzter Werkzeuge",
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
        "title": "Aufbau des KI-Stacks",
        "intro": "Unternehmertum, Führung, CRM, Geschäftsplan, Fundraising, Markteinführung und Verhandlungen, mit KI-Agenten, Automatisierung und Daten, unter realen Bedingungen.",
        "semesters": [
          {
            "code": "B2",
            "number": 1,
            "hours": 306,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, Management, Präsentieren",
                "hours": 69,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0341",
                    "name": "Unternehmertum und Ideenfindung",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0342",
                    "name": "Führung & Management",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0343",
                    "name": "CRM und Kundenbeziehungen · HubSpot · Salesforce",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 75,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0331",
                    "name": "Workshop-Daten – Power BI · Erweiterte Visualisierung · Professionelle Dashboards",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0332",
                    "name": "Workshop-Daten – Analytische KI und Erkenntnisse · KI-Analysetools",
                    "hours": 27.0,
                    "ects": 3.0
                  },
                  {
                    "code": "DAT0333",
                    "name": "Workshop-Daten – Geschäftsplan · Wirtschaftsmodell · Finanzprognose",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 30,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "BRI0351",
                    "name": "Bridge 1-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 84,
                "ects": 9.0,
                "courses": [
                  {
                    "code": "COD0311",
                    "name": "Advanced Python Bootcamp – Architektur · Klassen · Fehlerbehandlung",
                    "hours": 48.0,
                    "ects": 5.0
                  },
                  {
                    "code": "COD0312",
                    "name": "AI Agents Bootcamp – Orchestrierung · Speicher · Verbundene Tools",
                    "hours": 36.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 48,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0321",
                    "name": "Advanced Bootcamp Build – Komplettes internes Tool",
                    "hours": 24.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0322",
                    "name": "Stack AI Bootcamp – Vernetzter und zuverlässiger KI-Stack",
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
                "description": "Marketing, Management, Präsentieren",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0441",
                    "name": "Beraterposition & Verhandlung",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0442",
                    "name": "Großartige mündliche und professionelle Vorbereitung",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "SPE0443",
                    "name": "Go-to-Market-Strategie",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 63,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0431",
                    "name": "Workshop Daten – Datenstrategie · Audit · Roadmap · Vorstellung · Miro",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0432",
                    "name": "Workshop-Daten – Daten zur Entscheidungsfindung · Python · SQL · Power BI",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "DAT0433",
                    "name": "Workshop-Daten – Unternehmensfinanzierung · Cap-Tabelle · Fundraising",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 120,
                "ects": 10.0,
                "courses": [
                  {
                    "code": "BRI0451",
                    "name": "Bridge 2-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0452",
                    "name": "Bridge 3-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0453",
                    "name": "Bridge 4-Projekt",
                    "hours": 30.0,
                    "ects": 3.0
                  },
                  {
                    "code": "BRI0454",
                    "name": "Interpromo-Hackathon",
                    "hours": 30.0,
                    "ects": 1.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "COD0411",
                    "name": "Workshop-Code – Bereitstellung und KI-Systeme",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "COD0412",
                    "name": "Workshop-Code – RAG und fortgeschrittene KI",
                    "hours": 30.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 60,
                "ects": 4.0,
                "courses": [
                  {
                    "code": "BUI0421",
                    "name": "Workshop Build – Dokumentierter und übertragbarer Stack",
                    "hours": 30.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0422",
                    "name": "Workshop Build – Stack-Audit und Empfehlung",
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
        "title": "Der Einstieg ins Unternehmen",
        "intro": "Duales Studium oder Praktikum, drei No-Code-Module (Planung, Entwicklung, Bereitstellung) und der Abschluss RNCP 41143.",
        "semesters": [
          {
            "code": "B3",
            "number": 1,
            "hours": 210,
            "ects": 36.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, Management, Präsentieren",
                "hours": 21,
                "ects": 2.0,
                "courses": [
                  {
                    "code": "SPE0541",
                    "name": "Kommunikation, Unternehmertum & Portfolio",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 28,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "DAT0531",
                    "name": "Strukturierung und Aufbereitung von Daten",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 0,
                "ects": 14.0,
                "courses": [
                  {
                    "code": "BRI52-1",
                    "name": "Duales Studium / Praktikum",
                    "hours": 0.0,
                    "ects": 14.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 112,
                "ects": 12.0,
                "courses": [
                  {
                    "code": "COD0511",
                    "name": "Grundlagen der generativen KI",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0512",
                    "name": "Automatisierung von Geschäftsprozessen",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0513",
                    "name": "Design von KI-Agenten",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0514",
                    "name": "Technische Integration von KI",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 49,
                "ects": 5.0,
                "courses": [
                  {
                    "code": "BUI0521",
                    "name": "Konzeption und Prototyping von Interfaces",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0522",
                    "name": "Plattformübergreifende Entwicklung und fortgeschrittene Anpassung",
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
                "description": "Marketing, Management, Präsentieren",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0641",
                    "name": "Ein No-Code-Projekt definieren (BC01 — zertifizierend)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0631",
                    "name": "Eine No-Code-Lösung bereitstellen und begleiten (BC03 — zertifizierend)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 70,
                "ects": 27.0,
                "courses": [
                  {
                    "code": "BRI0651",
                    "name": "Interpromo-Hackathon",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI0652",
                    "name": "Hackathon 3 — schulübergreifend",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI065-1",
                    "name": "Duales Studium / Praktikum",
                    "hours": 0.0,
                    "ects": 15.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 56,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "BUI0621",
                    "name": "Eine No-Code-Lösung entwickeln (BC02 — zertifizierend)",
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
        "title": "Ab ins Unternehmen",
        "intro": "Duale Ausbildung oder Praktikum, drei No-Code-Blöcke (definieren, entwickeln, bereitstellen) und der RNCP-Titel 41143.",
        "semesters": [
          {
            "code": "B3",
            "number": 1,
            "hours": 210,
            "ects": 36.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, Management, Präsentieren",
                "hours": 21,
                "ects": 2.0,
                "courses": [
                  {
                    "code": "SPE0541",
                    "name": "Kommunikation, Unternehmertum & Portfolio",
                    "hours": 21.0,
                    "ects": 2.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 28,
                "ects": 3.0,
                "courses": [
                  {
                    "code": "DAT0531",
                    "name": "Strukturierung und Aufbereitung von Daten",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 0,
                "ects": 14.0,
                "courses": [
                  {
                    "code": "BRI52-1",
                    "name": "Duales Studium / Praktikum",
                    "hours": 0.0,
                    "ects": 14.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 112,
                "ects": 12.0,
                "courses": [
                  {
                    "code": "COD0511",
                    "name": "Grundlagen der generativen KI",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0512",
                    "name": "Automatisierung von Geschäftsprozessen",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0513",
                    "name": "Design von KI-Agenten",
                    "hours": 28.0,
                    "ects": 3.0
                  },
                  {
                    "code": "COD0514",
                    "name": "Technische Integration von KI",
                    "hours": 28.0,
                    "ects": 3.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 49,
                "ects": 5.0,
                "courses": [
                  {
                    "code": "BUI0521",
                    "name": "Konzeption und Prototyping von Interfaces",
                    "hours": 21.0,
                    "ects": 2.0
                  },
                  {
                    "code": "BUI0522",
                    "name": "Plattformübergreifende Entwicklung und fortgeschrittene Anpassung",
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
                "description": "Marketing, Management, Präsentieren",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "SPE0641",
                    "name": "Ein No-Code-Projekt definieren (BC01 — zertifizierend)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 42,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "DAT0631",
                    "name": "Eine No-Code-Lösung bereitstellen und begleiten (BC03 — zertifizierend)",
                    "hours": 42.0,
                    "ects": 6.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 70,
                "ects": 27.0,
                "courses": [
                  {
                    "code": "BRI0651",
                    "name": "Interpromo-Hackathon",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI0652",
                    "name": "Hackathon 3 — schulübergreifend",
                    "hours": 35.0,
                    "ects": 6.0
                  },
                  {
                    "code": "BRI065-1",
                    "name": "Duales Studium / Praktikum",
                    "hours": 0.0,
                    "ects": 15.0
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 56,
                "ects": 6.0,
                "courses": [
                  {
                    "code": "BUI0621",
                    "name": "Eine No-Code-Lösung entwickeln (BC02 — zertifizierend)",
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
        "title": "Jahr 1 · M1",
        "semesters": [
          {
            "code": "M1",
            "number": 1,
            "hours": 226,
            "ects": 30.0,
            "modules": [
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 30,
                "ects": 4.5,
                "courses": [
                  {
                    "code": "BRI0751",
                    "name": "Hackathon 1 – Inter-Masters",
                    "hours": 30.0,
                    "ects": 4.5
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 112,
                "ects": 15.0,
                "courses": [
                  {
                    "code": "COD0711",
                    "name": "Python-Code",
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
                    "name": "Prompter Engineering- und KI-Agent",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 84,
                "ects": 10.5,
                "courses": [
                  {
                    "code": "BUI0721",
                    "name": "Google Sheet + Apps-Skript",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "BUI0722",
                    "name": "Workshop ohne Code",
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
                "description": "Marketing, Management, Präsentieren",
                "hours": 77,
                "ects": 9.5,
                "courses": [
                  {
                    "code": "SPE0841",
                    "name": "Digitales Marketing",
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
                    "name": "Design Thinking · Projektmanagement · DSGVO",
                    "hours": 21.0,
                    "ects": 2.5
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 63,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0831",
                    "name": "SQL – Datenanalyst",
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
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 60,
                "ects": 9.0,
                "courses": [
                  {
                    "code": "BRI0851",
                    "name": "Hackathon 2 – Inter-Promos",
                    "hours": 30.0,
                    "ects": 4.5
                  },
                  {
                    "code": "BRI0852",
                    "name": "Hackathon 3 — schulübergreifend",
                    "hours": 30.0,
                    "ects": 4.5
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 28,
                "ects": 3.5,
                "courses": [
                  {
                    "code": "COD0811",
                    "name": "Python-Projekt",
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
        "title": "Jahr 2 · M2",
        "semesters": [
          {
            "code": "M2",
            "number": 1,
            "hours": 205,
            "ects": 30.0,
            "modules": [
              {
                "name": "Business",
                "description": "Marketing, Management, Präsentieren",
                "hours": 56,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "SPE0941",
                    "name": "Design Thinking und Projektmanagement",
                    "hours": 28.0,
                    "ects": 4.0
                  },
                  {
                    "code": "SPE0942",
                    "name": "Persönliches Branding",
                    "hours": 28.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Data",
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 56,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "DAT0931",
                    "name": "Datenanalyse",
                    "hours": 28.0,
                    "ects": 4.0
                  },
                  {
                    "code": "DAT0932",
                    "name": "Erweitertes SQL und DBT",
                    "hours": 28.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 30,
                "ects": 4.5,
                "courses": [
                  {
                    "code": "BRI0951",
                    "name": "Hackathon 1 – Inter-Masters",
                    "hours": 30.0,
                    "ects": 4.5
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 63,
                "ects": 9.5,
                "courses": [
                  {
                    "code": "COD0911",
                    "name": "Prompt Engineering und KI",
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
                "description": "Daten, Finanzen, Strategie, Entscheidungsunterstützung",
                "hours": 84,
                "ects": 10.5,
                "courses": [
                  {
                    "code": "DAT1031",
                    "name": "Datenarchitektur für KI",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "DAT1032",
                    "name": "Datenpipelines für KI",
                    "hours": 28.0,
                    "ects": 3.5
                  },
                  {
                    "code": "DAT1033",
                    "name": "Datenverwaltung und DSGVO",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              },
              {
                "name": "Bridge",
                "description": "Projekte und Hackathons mit Unternehmen",
                "hours": 60,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "BRI1051",
                    "name": "Hackathon 2 – Inter-Promos",
                    "hours": 30.0,
                    "ects": 4.0
                  },
                  {
                    "code": "BRI1052",
                    "name": "Hackathon 3 — schulübergreifend",
                    "hours": 30.0,
                    "ects": 4.0
                  }
                ]
              },
              {
                "name": "Code",
                "description": "Code und KI",
                "hours": 63,
                "ects": 8.0,
                "courses": [
                  {
                    "code": "COD1011",
                    "name": "Maschinelles Lernen",
                    "hours": 35.0,
                    "ects": 4.5
                  },
                  {
                    "code": "COD1012",
                    "name": "LLM Feinabstimmung & RAG",
                    "hours": 28.0,
                    "ects": 3.5
                  }
                ]
              },
              {
                "name": "Build",
                "description": "Tools und No-Code",
                "hours": 28,
                "ects": 3.5,
                "courses": [
                  {
                    "code": "BUI1021",
                    "name": "KI-Bereitstellung",
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
