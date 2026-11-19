import type { LivePage } from "@/data/pages/types";
import { faqPageLd } from "@/data/faq";

const items = [
  {
    "q": "Was ist die Eugenia School?",
    "a": "Die Eugenia School gehört zur Gruppe der Albert School, deren Mission eine fundierte Ausbildung in Business und Data ist. Sie bietet einen Bachelor und einen dualen Master of Science an. Unterstützt und finanziert von zahlreichen namhaften Unternehmern, bildet die Eugenia School die Talente aus, die die Wirtschaft von morgen braucht: hybride Profile aus Business und Data."
  },
  {
    "q": "Was ist der Unterschied zwischen der Eugenia und der Albert School?",
    "a": "Beide Schulen wurden von denselben Gründern gegründet, Grégoire Genest und Mathieu Schimpl, Serienunternehmern. Die Albert School setzt auf angewandte Mathematik und einen quantitativen Ansatz: sehr technische KI und Data (Data Science, Engineering), angewandt auf das Business. Die Eugenia bildet operativere, unternehmerische und generalistische Profile aus, „Schweizer Taschenmesser“ der auf das Business angewandten KI, ohne höhere Mathematik."
  },
  {
    "q": "Warum die Eugenia School wählen?",
    "a": "Die heute erfolgreichen Unternehmen teilen einen datenzentrierten Ansatz, oft als „data driven“ bezeichnet. Dieser Ansatz ist nur mit Teams möglich, die die Sprache der Daten auf allen Ebenen und in allen Funktionen des Unternehmens beherrschen. Das Lernen mit Daten lässt die Studierenden verstehen, wie man in einer von Technologie veränderten Welt Wert schafft."
  },
  {
    "q": "Was ist an der Pädagogik der Eugenia School innovativ?",
    "a": "Die innovative, datenzentrierte Pädagogik der Eugenia School verbindet akademische Lehre mit Erfahrung aus der realen Welt, wie die BDD mit unserem Gründernetzwerk rund um die Station F oder mit Partnerunternehmen wie Mistral AI, Microsoft oder Snapchat zeigen. Entdecken Sie die Seite, die unsere Lehrmethode im Detail erklärt."
  },
  {
    "q": "Was sind die Business Deep Dives (BDD)?",
    "a": "Die „Business Deep Dives“ sind das pädagogische Markenzeichen der Gruppe Albert School und damit der Eugenia School. Es handelt sich um 3- bis 4-wöchige Praxisfälle in Zusammenarbeit mit einem führenden Unternehmen, bei denen die Studierenden das Gelernte mit echten Daten in echten Situationen anwenden. Am Ende jedes BDD präsentieren die Studierenden ihre Arbeit der Führung des Partnerunternehmens, und ein Siegerteam wird gekürt."
  },
  {
    "q": "Was ist der Unterschied zwischen BDD und Géniathon?",
    "a": "Die BDD sind die Business Deep Dives, Fälle, an denen unsere Bachelorstudierenden arbeiten. Die Géniathons sind die Hackathons der Eugenia und den Studierenden des Master of Science vorbehalten."
  },
  {
    "q": "Was haben die Studierenden der Eugenia School gemeinsam?",
    "a": "Die Studierenden der Eugenia School teilen Ehrgeiz, Unternehmergeist, ein ausgeprägtes Interesse an der Business-Welt und das Bewusstsein, dass Daten in ihrem künftigen Beruf eine entscheidende Rolle spielen werden."
  },
  {
    "q": "Sind die Abschlüsse der Eugenia School staatlich anerkannt?",
    "a": "Unsere Abschlüsse stützen sich auf RNCP-Titel (Registre National des Certifications Professionnelles), die von France Compétences anerkannt sind. Für den Bachelor AI Applied to Business ist es der RNCP-Titel der Niveaustufe 6 „Concepteur de solutions no code“, verliehen von LION (RNCP 41143). Für den Master of Science AI Applied to Business ist es der RNCP-Titel der Niveaustufe 7 „Architecte en intelligence artificielle“, verliehen von JEDHA (RNCP 41993)."
  },
  {
    "q": "Welche Karriereperspektiven haben die Absolventen der Eugenia School?",
    "a": "Die an der Eugenia School entwickelten hybriden Business- und Data-Profile entsprechen einer starken Nachfrage der Unternehmen. Das Programm ermöglicht einen schnellen Karriereaufstieg und bereitet die Absolventen auf vielfältige verantwortungsvolle Positionen vor, etwa Data Analyst, Project Manager, Product Owner, Growth Hacker und mehr."
  },
  {
    "q": "Wer sind unsere Lehrkräfte?",
    "a": "Die Lehrkräfte der Eugenia School sind Profis mit umfangreicher Erfahrung in ihren Fachgebieten. Die meisten von ihnen haben Entscheidungspositionen in der Berufswelt inne, was ihnen ermöglicht, eine Lehre eng an der Realität der Branche auszurichten."
  },
  {
    "q": "Gibt es Mentoren und eine individuelle Begleitung?",
    "a": "Ja, im Bachelor wie im MSc: Jeder Studierende wird von Mentoren begleitet und erhält während des gesamten Studiums eine individuelle Betreuung."
  },
  {
    "q": "Kann ich die Schule besichtigen oder eine individuelle Campusführung bekommen?",
    "a": "Das ganze Jahr über bieten wir zahlreiche Veranstaltungen auf unseren Campus an, etwa Tage der offenen Tür und Schnuppertage. Zulassungsfähige Bewerber können außerdem eine persönliche Campusführung vereinbaren, indem sie an admission@eugeniaschool.com schreiben."
  },
  {
    "q": "Welche Informationen werden über das französische Programm Inserjeunes geteilt?",
    "a": "Informationen über das französische Programm Inserjeunes erhalten Sie über folgenden Link: https://www.inserjeunes.education.gouv.fr/diffusion/accueil"
  },
  {
    "q": "Wie viele Studierende gibt es höchstens pro Klasse?",
    "a": "Die Höchstzahl der Studierenden pro Klasse liegt bei 40."
  },
  {
    "q": "Besteht Anwesenheitspflicht?",
    "a": "Ja, der Unterricht findet in Präsenz statt."
  },
  {
    "q": "Werden Computer zur Verfügung gestellt?",
    "a": "Die Studierenden müssen über einen funktionierenden Computer verfügen, insbesondere für die Data-Kurse."
  },
  {
    "q": "Welche Arten von Stellen werden in der dualen Ausbildung angeboten?",
    "a": "Wir laden Sie ein, die Seite des Master-of-Science-Programms mit Beispielen der Stellen zu besuchen, die unsere Studierenden besetzen."
  },
  {
    "q": "Wie rekrutiere ich einen Praktikanten, einen dual Studierenden oder einen Absolventen?",
    "a": "Beschreiben Sie Ihren Bedarf über das entsprechende Formular: Das Team meldet sich bei Ihnen. Praktikum, duale Ausbildung (Professionalisierungs- und Ausbildungsverträge akzeptiert) oder Festanstellung für einen Absolventen."
  },
  {
    "q": "Bietet die Eugenia School Unterstützung beim Lebenslauf und bei der Suche nach Vorstellungsgesprächen?",
    "a": "Ja, die Eugenia School bietet persönliche Unterstützung, darunter ein Coaching-Programm und Treffen mit Partnerunternehmen."
  },
  {
    "q": "Was ist der Rhythmus der dualen Ausbildung?",
    "a": "Der MSc wird dual absolviert: Nach einem 5-wöchigen Bootcamp gilt der Rhythmus von 4 Tagen im Unternehmen und 1 Tag an der Schule. Das 3. Bachelorjahr kann ebenfalls dual absolviert werden."
  },
  {
    "q": "Welche Verträge werden für die duale Ausbildung akzeptiert: Professionalisierung oder Ausbildung?",
    "a": "Professionalisierungs- und Ausbildungsverträge werden akzeptiert."
  },
  {
    "q": "Wann kann ich während meines Bachelors ein Praktikum machen?",
    "a": "Es gibt zwei Praktikumsphasen: die erste von mindestens 6 Wochen im Sommer zwischen dem 1. und 2. Jahr. Die zweite, sechsmonatige, zu Beginn des dritten Jahres."
  },
  {
    "q": "Bietet die Eugenia School Coaching für Kompetenzen wie Teamführung oder Verhandlung an?",
    "a": "Ja, die Eugenia School bietet ein ständiges Coaching über verschiedene Aktivitäten, insbesondere zwei Wochen vor Studienbeginn mit einer Pitch-Aktivität im Stil von QVEMA als rotem Faden, praktische Business-Kurse und Business Deep Dives."
  },
  {
    "q": "Gibt es Gruppenprojekte?",
    "a": "Ja, persönliche Projekte und Gruppenprojekte sind zentrale Elemente an der Eugenia School. Gruppenarbeit steht bei den Business Deep Dives und den Géniathons im Vordergrund, meist in Teams von 3 bis 6 Personen."
  },
  {
    "q": "Wie viel Zeit muss man für Hausaufgaben einplanen?",
    "a": "Die Arbeitsbelastung hängt von der Woche, dem Arbeitsrhythmus und der Organisation ab. Rechnen Sie mit etwa 10 bis 15 Stunden pro Woche für persönliche und Gruppenarbeit. Manche Inhalte oder Lektüren müssen vor dem Unterricht durchgearbeitet werden."
  },
  {
    "q": "In welcher Sprache sprechen die Lehrkräfte?",
    "a": "Die Vorgabe lautet, Französisch zu sprechen. Ein gewisses Englischniveau wird jedoch verlangt: Die Kursunterlagen sind auf Englisch, und die Data-Tools sind größtenteils ebenfalls auf Englisch."
  },
  {
    "q": "Kann ich nach einem Bachelor der Eugenia School an eine andere Business School wechseln?",
    "a": "Der Bachelorabschluss der Eugenia School ist anerkannt und ermöglicht Ihnen, sich für Master an der Eugenia School oder an jeder anderen Hochschule zu bewerben, die für die Zulassung einen Bachelor verlangt."
  },
  {
    "q": "Gibt es an der Eugenia School ein Vereinsleben?",
    "a": "Ja! Die Vereine sind gemeinsame Vereine der Eugenia und der Albert School. Ein BDE, eine Junior Entreprise, ein Laufverein und viele andere gibt es bereits, aber wir fördern jedes Jahr die Gründung neuer Vereine."
  },
  {
    "q": "Bis wann muss ich meine Zulassung annehmen?",
    "a": "Herzlichen Glückwunsch! Die Wahl Ihrer Schule ist eine der wichtigsten Entscheidungen Ihres Lebens. Für die Annahme des Angebots gibt es keine Frist. Ihr Platz ist nach der Zulassungsmitteilung 10 Tage lang reserviert. Danach wird Ihre Einschreibung je nach verfügbaren Plätzen angenommen."
  },
  {
    "q": "Wann erhalte ich meine Zulassungsergebnisse?",
    "a": "Die Ergebnisse werden innerhalb von 10 Tagen nach jeder Phase des Auswahlverfahrens mitgeteilt."
  },
  {
    "q": "Wie läuft das Auswahlverfahren ab?",
    "a": "Mehr dazu erfahren Sie auf der entsprechenden Seite."
  },
  {
    "q": "Welche Voraussetzungen gelten für die Aufnahme an der Eugenia School?",
    "a": "Die Eugenia School steht Schülerinnen und Schülern der allgemeinen oder technologischen Abschlussklasse mit Interesse an neuen Technologien offen. Unternehmerische DNA ist ein Plus. Für die Master braucht man einen Bac+3, also 180 ECTS-Punkte, und den Wunsch nach einer technischen Ausbildung. Das M1-Bootcamp wiederholt die Grundlagen der Datenanalyse."
  },
  {
    "q": "Kann ich nach einem anderen Studiengang zur Eugenia School kommen?",
    "a": "Ja. Für den MSc braucht man einen Bac+3 (180 ECTS-Punkte), unabhängig vom ursprünglichen Studiengang, und den Wunsch, eine technische Basis zu erwerben: Das Einstiegs-Bootcamp wiederholt die Grundlagen der Datenanalyse."
  },
  {
    "q": "Wann und wie kann ich mich bewerben?",
    "a": "Auf unserer Seite zum Bewerbungsverfahren finden Sie die nötigen Informationen, um sich für jedes unserer Programme zu bewerben."
  },
  {
    "q": "Was kostet die Bewerbung?",
    "a": "Die Bewerbung ist für Bewerber mit Wohnsitz in der Europäischen Union kostenlos. Für Bewerber mit Wohnsitz außerhalb der Europäischen Union kostet sie 30 €."
  },
  {
    "q": "Wann ist Studienbeginn?",
    "a": "Studienbeginn ist nur im September. Einen Studienbeginn im Januar gibt es nicht."
  },
  {
    "q": "Muss man sich bei Parcoursup oder Mon Master anmelden?",
    "a": "Nein, die Eugenia School ist nicht bei Parcoursup oder Mon Master gelistet. Die Bewerbung erfolgt direkt auf dieser Seite."
  },
  {
    "q": "Ist für die Bewerbung ein Motivationsschreiben nötig?",
    "a": "Es wird empfohlen, alle relevanten Dokumente der Bewerbung beizufügen, etwa Notenblätter, Sprachzertifikate, Abschlüsse und Empfehlungsschreiben."
  },
  {
    "q": "Worum geht es im Motivationsgespräch?",
    "a": "Das Gespräch besteht aus drei Teilen: Kennenlernen, ein Logikrätsel und die Erläuterung Ihrer Motivation."
  },
  {
    "q": "Was tun, wenn ich meine Bewerbung nicht abschließen kann, weil mir Notenblätter fehlen?",
    "a": "Laden Sie dasselbe Dokument zweimal hoch, wenn Ihre Notenblätter halbjährlich und nicht vierteljährlich sind. Die Jury wird es verstehen."
  },
  {
    "q": "Kann ich mich bewerben, wenn ich die Noten des laufenden Jahres noch nicht habe?",
    "a": "Ja, Sie können das Zulassungsverfahren beginnen und die fehlenden Noten später einreichen."
  },
  {
    "q": "Gibt es Unterkünfte auf dem Campus?",
    "a": "Nein, aber es gibt Lösungen, damit Sie das Passende finden. Kontaktieren Sie uns, um alle Optionen zu erfahren!"
  },
  {
    "q": "Muss ich eine Anzahlung leisten, um meinen Platz zu sichern?",
    "a": "Die Einschreibung ins erste Jahr wird durch eine Anzahlung von 3.000 Euro bestätigt. Der Rest der jährlichen Studiengebühren ist vor Beginn des akademischen Jahres fällig. Für die Folgejahre wird vor dem 1. Juli eine Anzahlung verlangt."
  },
  {
    "q": "Wie hoch sind die jährlichen Studiengebühren an der Eugenia School?",
    "a": "Die Studiengebühren hängen vom gewählten Programm ab. Auf der entsprechenden Seite finden Sie die Gebühren des Programms, das Sie interessiert."
  },
  {
    "q": "Wie kann ich mein Studium finanzieren?",
    "a": "Die Eugenia School bietet mit Unterstützung von Partnerunternehmen Stipendien, die bis zu 50 % der jährlichen Studiengebühren abdecken. Die Vergabe erfolgt nach sozialen und akademischen Kriterien. Der Stipendienantrag muss vor der Einschreibung gestellt werden. Sie können außerdem Studienkredite bei Partnerbanken beantragen. Da der Master of Science dual absolviert wird, übernimmt der Arbeitgeber 100 % der Studiengebühren. Für weitere Fragen: admission@eugeniaschool.com."
  }
];
export const page: LivePage = {
  "title": "FAQ: Zulassung, duale Ausbildung, Finanzierung | Eugenia School",
  "description": "Alle Antworten zur Eugenia School: Zulassung, Bachelor- und MSc-Programme, duale Ausbildung, Studiengebühren und Finanzierung. Stellen Sie uns Ihre Frage.",
  "h1": "Du hast Fragen.",
  "imageAlt": "",
  "lead": "KI-Schule außerhalb von Parcoursup: Zulassung, Bachelor, dualer Master, Gebühren, Finanzierung. Die Antworten, Rubrik für Rubrik. Fehlt etwas? Schreib uns.",
  "eyebrow": "// foire aux questions",
  "facts": [],
  "sections": [
    {
      "title": "Über die Eugenia School",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Was ist die Eugenia School?",
              "a": "Die Eugenia School gehört zur Gruppe der Albert School, deren Mission eine fundierte Ausbildung in Business und Data ist. Sie bietet einen Bachelor und einen dualen Master of Science an. Unterstützt und finanziert von zahlreichen namhaften Unternehmern, bildet die Eugenia School die Talente aus, die die Wirtschaft von morgen braucht: hybride Profile aus Business und Data."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Eugenia School gehört zur Gruppe der Albert School, deren Mission eine fundierte Ausbildung in Business und Data ist. Sie bietet einen Bachelor und einen dualen Master of Science an. Unterstützt und finanziert von zahlreichen namhaften Unternehmern, bildet die Eugenia School die Talente aus, die die Wirtschaft von morgen braucht: hybride Profile aus Business und Data."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was ist der Unterschied zwischen der Eugenia und der Albert School?",
              "a": "Beide Schulen wurden von denselben Gründern gegründet, Grégoire Genest und Mathieu Schimpl, Serienunternehmern. Die Albert School setzt auf angewandte Mathematik und einen quantitativen Ansatz: sehr technische KI und Data (Data Science, Engineering), angewandt auf das Business. Die Eugenia bildet operativere, unternehmerische und generalistische Profile aus, „Schweizer Taschenmesser“ der auf das Business angewandten KI, ohne höhere Mathematik."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Beide Schulen wurden von denselben Gründern gegründet, Grégoire Genest und Mathieu Schimpl, Serienunternehmern. Die Albert School setzt auf angewandte Mathematik und einen quantitativen Ansatz: sehr technische KI und Data (Data Science, Engineering), angewandt auf das Business. Die Eugenia bildet operativere, unternehmerische und generalistische Profile aus, „Schweizer Taschenmesser“ der auf das Business angewandten KI, ohne höhere Mathematik."
        },
        {
          "type": "link",
          "label": "Die DNA der Eugenia entdecken →",
          "href": "/notre-adn"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Warum die Eugenia School wählen?",
              "a": "Die heute erfolgreichen Unternehmen teilen einen datenzentrierten Ansatz, oft als „data driven“ bezeichnet. Dieser Ansatz ist nur mit Teams möglich, die die Sprache der Daten auf allen Ebenen und in allen Funktionen des Unternehmens beherrschen. Das Lernen mit Daten lässt die Studierenden verstehen, wie man in einer von Technologie veränderten Welt Wert schafft."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die heute erfolgreichen Unternehmen teilen einen datenzentrierten Ansatz, oft als „data driven“ bezeichnet. Dieser Ansatz ist nur mit Teams möglich, die die Sprache der Daten auf allen Ebenen und in allen Funktionen des Unternehmens beherrschen. Das Lernen mit Daten lässt die Studierenden verstehen, wie man in einer von Technologie veränderten Welt Wert schafft."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was ist an der Pädagogik der Eugenia School innovativ?",
              "a": "Die innovative, datenzentrierte Pädagogik der Eugenia School verbindet akademische Lehre mit Erfahrung aus der realen Welt, wie die BDD mit unserem Gründernetzwerk rund um die Station F oder mit Partnerunternehmen wie Mistral AI, Microsoft oder Snapchat zeigen. Entdecken Sie die Seite, die unsere Lehrmethode im Detail erklärt."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die innovative, datenzentrierte Pädagogik der Eugenia School verbindet akademische Lehre mit Erfahrung aus der realen Welt, wie die BDD mit unserem Gründernetzwerk rund um die Station F oder mit Partnerunternehmen wie Mistral AI, Microsoft oder Snapchat zeigen. Entdecken Sie die Seite, die unsere Lehrmethode im Detail erklärt."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was sind die Business Deep Dives (BDD)?",
              "a": "Die „Business Deep Dives“ sind das pädagogische Markenzeichen der Gruppe Albert School und damit der Eugenia School. Es handelt sich um 3- bis 4-wöchige Praxisfälle in Zusammenarbeit mit einem führenden Unternehmen, bei denen die Studierenden das Gelernte mit echten Daten in echten Situationen anwenden. Am Ende jedes BDD präsentieren die Studierenden ihre Arbeit der Führung des Partnerunternehmens, und ein Siegerteam wird gekürt."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die „Business Deep Dives“ sind das pädagogische Markenzeichen der Gruppe Albert School und damit der Eugenia School. Es handelt sich um 3- bis 4-wöchige Praxisfälle in Zusammenarbeit mit einem führenden Unternehmen, bei denen die Studierenden das Gelernte mit echten Daten in echten Situationen anwenden. Am Ende jedes BDD präsentieren die Studierenden ihre Arbeit der Führung des Partnerunternehmens, und ein Siegerteam wird gekürt."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was ist der Unterschied zwischen BDD und Géniathon?",
              "a": "Die BDD sind die Business Deep Dives, Fälle, an denen unsere Bachelorstudierenden arbeiten. Die Géniathons sind die Hackathons der Eugenia und den Studierenden des Master of Science vorbehalten."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die BDD sind die Business Deep Dives, Fälle, an denen unsere Bachelorstudierenden arbeiten. Die Géniathons sind die Hackathons der Eugenia und den Studierenden des Master of Science vorbehalten."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was haben die Studierenden der Eugenia School gemeinsam?",
              "a": "Die Studierenden der Eugenia School teilen Ehrgeiz, Unternehmergeist, ein ausgeprägtes Interesse an der Business-Welt und das Bewusstsein, dass Daten in ihrem künftigen Beruf eine entscheidende Rolle spielen werden."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Studierenden der Eugenia School teilen Ehrgeiz, Unternehmergeist, ein ausgeprägtes Interesse an der Business-Welt und das Bewusstsein, dass Daten in ihrem künftigen Beruf eine entscheidende Rolle spielen werden."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Sind die Abschlüsse der Eugenia School staatlich anerkannt?",
              "a": "Unsere Abschlüsse stützen sich auf RNCP-Titel (Registre National des Certifications Professionnelles), die von France Compétences anerkannt sind. Für den Bachelor AI Applied to Business ist es der RNCP-Titel der Niveaustufe 6 „Concepteur de solutions no code“, verliehen von LION (RNCP 41143). Für den Master of Science AI Applied to Business ist es der RNCP-Titel der Niveaustufe 7 „Architecte en intelligence artificielle“, verliehen von JEDHA (RNCP 41993)."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Unsere Abschlüsse stützen sich auf RNCP-Titel (Registre National des Certifications Professionnelles), die von France Compétences anerkannt sind. Für den Bachelor AI Applied to Business ist es der RNCP-Titel der Niveaustufe 6 „Concepteur de solutions no code“, verliehen von LION (RNCP 41143). Für den Master of Science AI Applied to Business ist es der RNCP-Titel der Niveaustufe 7 „Architecte en intelligence artificielle“, verliehen von JEDHA (RNCP 41993)."
        },
        {
          "type": "link",
          "label": "Zur Zertifizierung des Bachelors →",
          "href": "/certification-concepteur-solutions-no-code"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Welche Karriereperspektiven haben die Absolventen der Eugenia School?",
              "a": "Die an der Eugenia School entwickelten hybriden Business- und Data-Profile entsprechen einer starken Nachfrage der Unternehmen. Das Programm ermöglicht einen schnellen Karriereaufstieg und bereitet die Absolventen auf vielfältige verantwortungsvolle Positionen vor, etwa Data Analyst, Project Manager, Product Owner, Growth Hacker und mehr."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die an der Eugenia School entwickelten hybriden Business- und Data-Profile entsprechen einer starken Nachfrage der Unternehmen. Das Programm ermöglicht einen schnellen Karriereaufstieg und bereitet die Absolventen auf vielfältige verantwortungsvolle Positionen vor, etwa Data Analyst, Project Manager, Product Owner, Growth Hacker und mehr."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wer sind unsere Lehrkräfte?",
              "a": "Die Lehrkräfte der Eugenia School sind Profis mit umfangreicher Erfahrung in ihren Fachgebieten. Die meisten von ihnen haben Entscheidungspositionen in der Berufswelt inne, was ihnen ermöglicht, eine Lehre eng an der Realität der Branche auszurichten."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Lehrkräfte der Eugenia School sind Profis mit umfangreicher Erfahrung in ihren Fachgebieten. Die meisten von ihnen haben Entscheidungspositionen in der Berufswelt inne, was ihnen ermöglicht, eine Lehre eng an der Realität der Branche auszurichten."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Gibt es Mentoren und eine individuelle Begleitung?",
              "a": "Ja, im Bachelor wie im MSc: Jeder Studierende wird von Mentoren begleitet und erhält während des gesamten Studiums eine individuelle Betreuung."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja, im Bachelor wie im MSc: Jeder Studierende wird von Mentoren begleitet und erhält während des gesamten Studiums eine individuelle Betreuung."
        },
        {
          "type": "link",
          "label": "Lehrkräfte und Mentoren kennenlernen →",
          "href": "/approche-pedagogique"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Kann ich die Schule besichtigen oder eine individuelle Campusführung bekommen?",
              "a": "Das ganze Jahr über bieten wir zahlreiche Veranstaltungen auf unseren Campus an, etwa Tage der offenen Tür und Schnuppertage. Zulassungsfähige Bewerber können außerdem eine persönliche Campusführung vereinbaren, indem sie an admission@eugeniaschool.com schreiben."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Das ganze Jahr über bieten wir zahlreiche Veranstaltungen auf unseren Campus an, etwa Tage der offenen Tür und Schnuppertage. Zulassungsfähige Bewerber können außerdem eine persönliche Campusführung vereinbaren, indem sie an admission@eugeniaschool.com schreiben."
        }
      ],
      "eyebrow": "02"
    },
    {
      "title": "Studieren an der Eugenia School",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Welche Informationen werden über das französische Programm Inserjeunes geteilt?",
              "a": "Informationen über das französische Programm Inserjeunes erhalten Sie über folgenden Link: https://www.inserjeunes.education.gouv.fr/diffusion/accueil"
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Informationen über das französische Programm Inserjeunes erhalten Sie über folgenden Link: https://www.inserjeunes.education.gouv.fr/diffusion/accueil"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wie viele Studierende gibt es höchstens pro Klasse?",
              "a": "Die Höchstzahl der Studierenden pro Klasse liegt bei 40."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Höchstzahl der Studierenden pro Klasse liegt bei 40."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Besteht Anwesenheitspflicht?",
              "a": "Ja, der Unterricht findet in Präsenz statt."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja, der Unterricht findet in Präsenz statt."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Werden Computer zur Verfügung gestellt?",
              "a": "Die Studierenden müssen über einen funktionierenden Computer verfügen, insbesondere für die Data-Kurse."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Studierenden müssen über einen funktionierenden Computer verfügen, insbesondere für die Data-Kurse."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Welche Arten von Stellen werden in der dualen Ausbildung angeboten?",
              "a": "Wir laden Sie ein, die Seite des Master-of-Science-Programms mit Beispielen der Stellen zu besuchen, die unsere Studierenden besetzen."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Wir laden Sie ein, die Seite des Master-of-Science-Programms mit Beispielen der Stellen zu besuchen, die unsere Studierenden besetzen."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wie rekrutiere ich einen Praktikanten, einen dual Studierenden oder einen Absolventen?",
              "a": "Beschreiben Sie Ihren Bedarf über das entsprechende Formular: Das Team meldet sich bei Ihnen. Praktikum, duale Ausbildung (Professionalisierungs- und Ausbildungsverträge akzeptiert) oder Festanstellung für einen Absolventen."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Beschreiben Sie Ihren Bedarf über das entsprechende Formular: Das Team meldet sich bei Ihnen. Praktikum, duale Ausbildung (Professionalisierungs- und Ausbildungsverträge akzeptiert) oder Festanstellung für einen Absolventen."
        },
        {
          "type": "link",
          "label": "Unsere Studierenden rekrutieren →",
          "href": "/recruter-nos-etudiants"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Bietet die Eugenia School Unterstützung beim Lebenslauf und bei der Suche nach Vorstellungsgesprächen?",
              "a": "Ja, die Eugenia School bietet persönliche Unterstützung, darunter ein Coaching-Programm und Treffen mit Partnerunternehmen."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja, die Eugenia School bietet persönliche Unterstützung, darunter ein Coaching-Programm und Treffen mit Partnerunternehmen."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was ist der Rhythmus der dualen Ausbildung?",
              "a": "Der MSc wird dual absolviert: Nach einem 5-wöchigen Bootcamp gilt der Rhythmus von 4 Tagen im Unternehmen und 1 Tag an der Schule. Das 3. Bachelorjahr kann ebenfalls dual absolviert werden."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Der MSc wird dual absolviert: Nach einem 5-wöchigen Bootcamp gilt der Rhythmus von 4 Tagen im Unternehmen und 1 Tag an der Schule. Das 3. Bachelorjahr kann ebenfalls dual absolviert werden."
        },
        {
          "type": "link",
          "label": "Zum dualen 3. Jahr →",
          "href": "/programme/bachelor-ia-business-3eme-annee-alternance"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Welche Verträge werden für die duale Ausbildung akzeptiert: Professionalisierung oder Ausbildung?",
              "a": "Professionalisierungs- und Ausbildungsverträge werden akzeptiert."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Professionalisierungs- und Ausbildungsverträge werden akzeptiert."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wann kann ich während meines Bachelors ein Praktikum machen?",
              "a": "Es gibt zwei Praktikumsphasen: die erste von mindestens 6 Wochen im Sommer zwischen dem 1. und 2. Jahr. Die zweite, sechsmonatige, zu Beginn des dritten Jahres."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Es gibt zwei Praktikumsphasen: die erste von mindestens 6 Wochen im Sommer zwischen dem 1. und 2. Jahr. Die zweite, sechsmonatige, zu Beginn des dritten Jahres."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Bietet die Eugenia School Coaching für Kompetenzen wie Teamführung oder Verhandlung an?",
              "a": "Ja, die Eugenia School bietet ein ständiges Coaching über verschiedene Aktivitäten, insbesondere zwei Wochen vor Studienbeginn mit einer Pitch-Aktivität im Stil von QVEMA als rotem Faden, praktische Business-Kurse und Business Deep Dives."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja, die Eugenia School bietet ein ständiges Coaching über verschiedene Aktivitäten, insbesondere zwei Wochen vor Studienbeginn mit einer Pitch-Aktivität im Stil von QVEMA als rotem Faden, praktische Business-Kurse und Business Deep Dives."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Gibt es Gruppenprojekte?",
              "a": "Ja, persönliche Projekte und Gruppenprojekte sind zentrale Elemente an der Eugenia School. Gruppenarbeit steht bei den Business Deep Dives und den Géniathons im Vordergrund, meist in Teams von 3 bis 6 Personen."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja, persönliche Projekte und Gruppenprojekte sind zentrale Elemente an der Eugenia School. Gruppenarbeit steht bei den Business Deep Dives und den Géniathons im Vordergrund, meist in Teams von 3 bis 6 Personen."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wie viel Zeit muss man für Hausaufgaben einplanen?",
              "a": "Die Arbeitsbelastung hängt von der Woche, dem Arbeitsrhythmus und der Organisation ab. Rechnen Sie mit etwa 10 bis 15 Stunden pro Woche für persönliche und Gruppenarbeit. Manche Inhalte oder Lektüren müssen vor dem Unterricht durchgearbeitet werden."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Arbeitsbelastung hängt von der Woche, dem Arbeitsrhythmus und der Organisation ab. Rechnen Sie mit etwa 10 bis 15 Stunden pro Woche für persönliche und Gruppenarbeit. Manche Inhalte oder Lektüren müssen vor dem Unterricht durchgearbeitet werden."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "In welcher Sprache sprechen die Lehrkräfte?",
              "a": "Die Vorgabe lautet, Französisch zu sprechen. Ein gewisses Englischniveau wird jedoch verlangt: Die Kursunterlagen sind auf Englisch, und die Data-Tools sind größtenteils ebenfalls auf Englisch."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Vorgabe lautet, Französisch zu sprechen. Ein gewisses Englischniveau wird jedoch verlangt: Die Kursunterlagen sind auf Englisch, und die Data-Tools sind größtenteils ebenfalls auf Englisch."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Kann ich nach einem Bachelor der Eugenia School an eine andere Business School wechseln?",
              "a": "Der Bachelorabschluss der Eugenia School ist anerkannt und ermöglicht Ihnen, sich für Master an der Eugenia School oder an jeder anderen Hochschule zu bewerben, die für die Zulassung einen Bachelor verlangt."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Der Bachelorabschluss der Eugenia School ist anerkannt und ermöglicht Ihnen, sich für Master an der Eugenia School oder an jeder anderen Hochschule zu bewerben, die für die Zulassung einen Bachelor verlangt."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Gibt es an der Eugenia School ein Vereinsleben?",
              "a": "Ja! Die Vereine sind gemeinsame Vereine der Eugenia und der Albert School. Ein BDE, eine Junior Entreprise, ein Laufverein und viele andere gibt es bereits, aber wir fördern jedes Jahr die Gründung neuer Vereine."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja! Die Vereine sind gemeinsame Vereine der Eugenia und der Albert School. Ein BDE, eine Junior Entreprise, ein Laufverein und viele andere gibt es bereits, aber wir fördern jedes Jahr die Gründung neuer Vereine."
        }
      ],
      "eyebrow": "03"
    },
    {
      "title": "Bewerbungsverfahren",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Bis wann muss ich meine Zulassung annehmen?",
              "a": "Herzlichen Glückwunsch! Die Wahl Ihrer Schule ist eine der wichtigsten Entscheidungen Ihres Lebens. Für die Annahme des Angebots gibt es keine Frist. Ihr Platz ist nach der Zulassungsmitteilung 10 Tage lang reserviert. Danach wird Ihre Einschreibung je nach verfügbaren Plätzen angenommen."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Herzlichen Glückwunsch! Die Wahl Ihrer Schule ist eine der wichtigsten Entscheidungen Ihres Lebens. Für die Annahme des Angebots gibt es keine Frist. Ihr Platz ist nach der Zulassungsmitteilung 10 Tage lang reserviert. Danach wird Ihre Einschreibung je nach verfügbaren Plätzen angenommen."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wann erhalte ich meine Zulassungsergebnisse?",
              "a": "Die Ergebnisse werden innerhalb von 10 Tagen nach jeder Phase des Auswahlverfahrens mitgeteilt."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Ergebnisse werden innerhalb von 10 Tagen nach jeder Phase des Auswahlverfahrens mitgeteilt."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wie läuft das Auswahlverfahren ab?",
              "a": "Mehr dazu erfahren Sie auf der entsprechenden Seite."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Mehr dazu erfahren Sie auf der entsprechenden Seite."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Welche Voraussetzungen gelten für die Aufnahme an der Eugenia School?",
              "a": "Die Eugenia School steht Schülerinnen und Schülern der allgemeinen oder technologischen Abschlussklasse mit Interesse an neuen Technologien offen. Unternehmerische DNA ist ein Plus. Für die Master braucht man einen Bac+3, also 180 ECTS-Punkte, und den Wunsch nach einer technischen Ausbildung. Das M1-Bootcamp wiederholt die Grundlagen der Datenanalyse."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Eugenia School steht Schülerinnen und Schülern der allgemeinen oder technologischen Abschlussklasse mit Interesse an neuen Technologien offen. Unternehmerische DNA ist ein Plus. Für die Master braucht man einen Bac+3, also 180 ECTS-Punkte, und den Wunsch nach einer technischen Ausbildung. Das M1-Bootcamp wiederholt die Grundlagen der Datenanalyse."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Kann ich nach einem anderen Studiengang zur Eugenia School kommen?",
              "a": "Ja. Für den MSc braucht man einen Bac+3 (180 ECTS-Punkte), unabhängig vom ursprünglichen Studiengang, und den Wunsch, eine technische Basis zu erwerben: Das Einstiegs-Bootcamp wiederholt die Grundlagen der Datenanalyse."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja. Für den MSc braucht man einen Bac+3 (180 ECTS-Punkte), unabhängig vom ursprünglichen Studiengang, und den Wunsch, eine technische Basis zu erwerben: Das Einstiegs-Bootcamp wiederholt die Grundlagen der Datenanalyse."
        },
        {
          "type": "link",
          "label": "Den MSc entdecken →",
          "href": "/programme/master-ia-business-alternance"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wann und wie kann ich mich bewerben?",
              "a": "Auf unserer Seite zum Bewerbungsverfahren finden Sie die nötigen Informationen, um sich für jedes unserer Programme zu bewerben."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Auf unserer Seite zum Bewerbungsverfahren finden Sie die nötigen Informationen, um sich für jedes unserer Programme zu bewerben."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was kostet die Bewerbung?",
              "a": "Die Bewerbung ist für Bewerber mit Wohnsitz in der Europäischen Union kostenlos. Für Bewerber mit Wohnsitz außerhalb der Europäischen Union kostet sie 30 €."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Bewerbung ist für Bewerber mit Wohnsitz in der Europäischen Union kostenlos. Für Bewerber mit Wohnsitz außerhalb der Europäischen Union kostet sie 30 €."
        },
        {
          "type": "link",
          "label": "Bewerben →",
          "href": "/candidature"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wann ist Studienbeginn?",
              "a": "Studienbeginn ist nur im September. Einen Studienbeginn im Januar gibt es nicht."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Studienbeginn ist nur im September. Einen Studienbeginn im Januar gibt es nicht."
        },
        {
          "type": "link",
          "label": "Zum Zulassungsverfahren →",
          "href": "/processus-admission"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Muss man sich bei Parcoursup oder Mon Master anmelden?",
              "a": "Nein, die Eugenia School ist nicht bei Parcoursup oder Mon Master gelistet. Die Bewerbung erfolgt direkt auf dieser Seite."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Nein, die Eugenia School ist nicht bei Parcoursup oder Mon Master gelistet. Die Bewerbung erfolgt direkt auf dieser Seite."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Ist für die Bewerbung ein Motivationsschreiben nötig?",
              "a": "Es wird empfohlen, alle relevanten Dokumente der Bewerbung beizufügen, etwa Notenblätter, Sprachzertifikate, Abschlüsse und Empfehlungsschreiben."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Es wird empfohlen, alle relevanten Dokumente der Bewerbung beizufügen, etwa Notenblätter, Sprachzertifikate, Abschlüsse und Empfehlungsschreiben."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Worum geht es im Motivationsgespräch?",
              "a": "Das Gespräch besteht aus drei Teilen: Kennenlernen, ein Logikrätsel und die Erläuterung Ihrer Motivation."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Das Gespräch besteht aus drei Teilen: Kennenlernen, ein Logikrätsel und die Erläuterung Ihrer Motivation."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Was tun, wenn ich meine Bewerbung nicht abschließen kann, weil mir Notenblätter fehlen?",
              "a": "Laden Sie dasselbe Dokument zweimal hoch, wenn Ihre Notenblätter halbjährlich und nicht vierteljährlich sind. Die Jury wird es verstehen."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Laden Sie dasselbe Dokument zweimal hoch, wenn Ihre Notenblätter halbjährlich und nicht vierteljährlich sind. Die Jury wird es verstehen."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Kann ich mich bewerben, wenn ich die Noten des laufenden Jahres noch nicht habe?",
              "a": "Ja, Sie können das Zulassungsverfahren beginnen und die fehlenden Noten später einreichen."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Ja, Sie können das Zulassungsverfahren beginnen und die fehlenden Noten später einreichen."
        }
      ],
      "eyebrow": "04"
    },
    {
      "title": "Studiengebühren und Finanzierung",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Gibt es Unterkünfte auf dem Campus?",
              "a": "Nein, aber es gibt Lösungen, damit Sie das Passende finden. Kontaktieren Sie uns, um alle Optionen zu erfahren!"
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Nein, aber es gibt Lösungen, damit Sie das Passende finden. Kontaktieren Sie uns, um alle Optionen zu erfahren!"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Muss ich eine Anzahlung leisten, um meinen Platz zu sichern?",
              "a": "Die Einschreibung ins erste Jahr wird durch eine Anzahlung von 3.000 Euro bestätigt. Der Rest der jährlichen Studiengebühren ist vor Beginn des akademischen Jahres fällig. Für die Folgejahre wird vor dem 1. Juli eine Anzahlung verlangt."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Einschreibung ins erste Jahr wird durch eine Anzahlung von 3.000 Euro bestätigt. Der Rest der jährlichen Studiengebühren ist vor Beginn des akademischen Jahres fällig. Für die Folgejahre wird vor dem 1. Juli eine Anzahlung verlangt."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wie hoch sind die jährlichen Studiengebühren an der Eugenia School?",
              "a": "Die Studiengebühren hängen vom gewählten Programm ab. Auf der entsprechenden Seite finden Sie die Gebühren des Programms, das Sie interessiert."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Studiengebühren hängen vom gewählten Programm ab. Auf der entsprechenden Seite finden Sie die Gebühren des Programms, das Sie interessiert."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Wie kann ich mein Studium finanzieren?",
              "a": "Die Eugenia School bietet mit Unterstützung von Partnerunternehmen Stipendien, die bis zu 50 % der jährlichen Studiengebühren abdecken. Die Vergabe erfolgt nach sozialen und akademischen Kriterien. Der Stipendienantrag muss vor der Einschreibung gestellt werden. Sie können außerdem Studienkredite bei Partnerbanken beantragen. Da der Master of Science dual absolviert wird, übernimmt der Arbeitgeber 100 % der Studiengebühren. Für weitere Fragen: admission@eugeniaschool.com."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Die Eugenia School bietet mit Unterstützung von Partnerunternehmen Stipendien, die bis zu 50 % der jährlichen Studiengebühren abdecken. Die Vergabe erfolgt nach sozialen und akademischen Kriterien. Der Stipendienantrag muss vor der Einschreibung gestellt werden. Sie können außerdem Studienkredite bei Partnerbanken beantragen. Da der Master of Science dual absolviert wird, übernimmt der Arbeitgeber 100 % der Studiengebühren. Für weitere Fragen: admission@eugeniaschool.com."
        },
        {
          "type": "link",
          "label": "Zur Finanzierung →",
          "href": "/financement"
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
      "label": "Schreib uns",
      "href": "/contact"
    },
    {
      "label": "Über die Eugenia School",
      "href": "#a-propos-d-eugenia-school"
    },
    {
      "label": "Studieren an der Eugenia School",
      "href": "#etudier-a-eugenia-school"
    },
    {
      "label": "Bewerbungsverfahren",
      "href": "#processus-de-candidature"
    },
    {
      "label": "Studiengebühren und Finanzierung",
      "href": "#frais-de-scolarite-et-financement"
    },
    {
      "label": "Die DNA der Eugenia entdecken →",
      "href": "/notre-adn"
    },
    {
      "label": "Zur Zertifizierung des Bachelors →",
      "href": "/certification-concepteur-solutions-no-code"
    },
    {
      "label": "Lehrkräfte und Mentoren kennenlernen →",
      "href": "/approche-pedagogique"
    },
    {
      "label": "Unsere Studierenden rekrutieren →",
      "href": "/recruter-nos-etudiants"
    },
    {
      "label": "Zum dualen 3. Jahr →",
      "href": "/programme/bachelor-ia-business-3eme-annee-alternance"
    },
    {
      "label": "Den MSc entdecken →",
      "href": "/programme/master-ia-business-alternance"
    },
    {
      "label": "Bewerben →",
      "href": "/candidature"
    },
    {
      "label": "Zum Zulassungsverfahren →",
      "href": "/processus-admission"
    },
    {
      "label": "Zur Finanzierung →",
      "href": "/financement"
    },
    {
      "label": "Bewerben",
      "href": "/candidature"
    }
  ],
  "footer": {
    "title": "Bereit für die Bewerbung?",
    "text": "Kostenlose Bewerbung, außerhalb von Parcoursup und Mon Master.",
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
