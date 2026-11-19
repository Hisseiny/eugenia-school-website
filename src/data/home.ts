import { EXTERNAL, ROUTES, SITE } from "@/data/site";

export const DOORS = [
  {
    href: ROUTES.programmeBachelor,
    icon: "cap",
    who: "Nach dem Abitur",
    title: "Bachelor Angewandte KI für Unternehmen",
    text: "Drei Jahre, ohne Parcoursup. Erstes Business-Projekt ab Semester 1.",
    cta: "Entdecken Sie den Bachelor",
  },
  {
    href: ROUTES.programmeBachelor3,
    icon: "steps",
    who: "Nach zwei Studienjahren",
    title: "Bachelor, 3. Jahr im dualen Studium",
    text: "Ein Jahr Spezialisierung auf KI, in der Wirtschaft.",
    cta: "Entdecken Sie das 3. Jahr",
  },
  {
    href: ROUTES.programmeMsc,
    icon: "book",
    who: "Nach drei oder vier Studienjahren",
    title: "MSc Angewandte KI für Unternehmen",
    text: "Zwei Jahre duales Studium für deinen Einstieg in KI und Daten.",
    cta: "Entdecken Sie den Meister",
  },
  {
    href: ROUTES.entreprises,
    icon: "building",
    who: "Für Unternehmen",
    title: "Talente gewinnen und Projekte mitgestalten",
    text: "Werkstudententätigkeiten, Projekte und Hackathons mit unseren Studierenden.",
    cta: "Arbeiten Sie mit uns",
  },
] as const;

export const LEARN_ROWS = [
  {
    duration: "3 Jahre",
    title: "Bachelor Angewandte KI für Unternehmen",
    text: "Nach den gemeinsamen Grundlagen wählst du deinen Schwerpunkt. Das dritte Jahr findet im dualen Studium statt.",
    chips: ["Python", "Scraping", "No-Code-Automatisierung", "Digitales Marketing", "SEO", "Pitch"],
    link: { href: ROUTES.programmeBachelor, label: "Das Bachelorstudium" },
    image: "n_laptops_43",
    alt: "Drei Studierende arbeiten gemeinsam an ihren Computern",
  },
  {
    duration: "2 Jahre",
    title: "MSc Angewandte KI für Unternehmen",
    text: "Für deinen Einstieg in KI und Daten im dualen Studium nach drei oder vier Studienjahren.",
    chips: ["SQL", "Tableau", "Power BI", "Automatisierung", "KI im Unternehmen"],
    link: { href: ROUTES.programmeMsc, label: "Das Masterstudium" },
    image: "p_laptop",
    alt: "Ein Student bei der Arbeit, sein Computer ist mit n8n-, Mistral AI-, Dust- und Eugenia-Aufklebern bedeckt",
  },
  {
    duration: "Zertifikatskurs",
    title: "Berufliche Zertifizierungen",
    text: "Zwei Zertifizierungen zur Validierung einer bestimmten Fähigkeit im Kurzformat.",
    chips: ["Entwickler für No-Code-Lösungen", "KI-Architekt"],
    link: { href: `${ROUTES.programmes}#certifications`, label: "Zertifizierungen" },
    image: "n_mic_43",
    alt: "Ein Student stellt während einer Vorlesung eine Frage ins Mikrofon",
  },
] as const;

export const STATS = [
  { value: "S1", label: "erstes KI-Projekt in der Wirtschaft" },
  { value: "48 h", label: "ein Produkt in einem Hackathon zu liefern" },
  { value: "15", label: "Schülerverläufe zu entdecken" },
] as const;

/**
 * Testimonial slides. Noah's slide is the one written in the mockup; the four others reuse,
 * word for word, the facts shown on the Carrières page for the same people (nothing invented).
 */
export const TESTIMONIALS = [
  {
    id: "noah",
    status: "Absolventen mit unbefristetem Arbeitsvertrag",
    quote: "Lernen Sie Automatisierung und Agenten, um das Leben im Unternehmen zu verbessern.",
    name: "Noah S.",
    bio: "Bachelor in Wirtschaftswissenschaften, dann MSc und 3 Hackathon-Siege. Heute HR Tech & Automation Lead bei Alan, mit unbefristetem Vertrag. Er kehrt zurück, um Eugenia zu unterrichten.",
    portrait: "tq_noah",
    logo: { name: "lg_alan", alt: "Alan", height: 34 },
  },
  {
    id: "nina",
    status: "Absolventen mit unbefristetem Arbeitsvertrag",
    quote: "Zwei Stellenangebote dank der im Unterricht abgeschlossenen Projekte.",
    name: "Nina L.",
    bio: "Lizenz für Umweltmanagement, dann MSc. Heute Datenanalyst bei Effy, mit unbefristetem Vertrag. Sie kehrt zurück, um Eugenia zu unterrichten.",
    portrait: "tq_nina",
    logo: { name: "lg_effy", alt: "Effy", height: 28 },
  },
  {
    id: "victor",
    status: "Absolventen mit unbefristetem Arbeitsvertrag",
    quote: "Ein komplettes Marketingprojekt für Ihr Unternehmen, berufsbegleitend.",
    name: "Victor P.",
    bio: "Master in Marketing, dann MSc. Heute Head of AI bei Licter, mit unbefristetem Vertrag.",
    portrait: "tq_victor",
    logo: { name: "lg_licter", alt: "Licter", height: 36 },
  },
  {
    id: "ian",
    status: "Bachelor, B3",
    quote: "Sein erster KI-Agent wurde in einem Hackathon bereitgestellt und anschließend im Rahmen einer Arbeitsstudie verfeinert.",
    name: "Ian L.",
    bio: "Bachelor of Computer Science. Arbeitsstudium bei Idoption IA, nachdem ein erster KI-Agent in einem Hackathon geliefert wurde.",
    portrait: "tq_ian",
    logo: null,
  },
  {
    id: "maxime",
    status: "MSc, M1, duales Studium",
    quote: "Automatisierungen aus der ersten Arbeitswoche.",
    name: "Maxime B.",
    bio: "Wirtschaftsstudium, dann MSc. KI-Projektmanager bei Mister IA, berufsbegleitend.",
    portrait: "tq_maxime",
    logo: { name: "lg_misteria", alt: "Mister IA", height: 18 },
  },
] as const;

export const GALLERY = [
  { image: "p_arch_hero", alt: "Der Eingangsbogen und seine leuchtende Kugel öffnen sich zum Atrium", caption: "Eingang unter den Gewölben", width: 340 },
  { image: "p_bancs", alt: "Große Eichentische auf alten Fliesen", caption: "Arbeitsbereiche", width: 220 },
  { image: "p_atrium", alt: "Das glasüberdachte Atrium und seine Steintreppe", caption: "Das glasüberdachte Atrium", width: 300 },
  { image: "p_spiral", alt: "Die Wendeltreppe von oben gesehen", caption: "Die Wendeltreppe", width: 260 },
  { image: "p_fresque", alt: "Das große Keramikfresko im Saal", caption: "Das Lobby-Fresko", width: 320 },
] as const;

export const NEXT_STEPS = [
  {
    n: 1,
    step: "Informieren",
    title: "Die Broschüre",
    accent: "In Ihrem eigenen Tempo, von zu Hause aus",
    text: "Erfahren Sie alles über unsere Bachelor- und MSc-Studiengänge.",
    cta: { href: ROUTES.brochure, label: "Informationsbroschüre herunterladen", primary: false },
  },
  {
    n: 2,
    step: "Kennenlernen",
    title: "Tag der offenen Tür, 12. Dezember",
    accent: "Ein Morgen auf dem Campus",
    text: "Ab 10:30 Uhr auf dem Campus. Kostenlos: Das Team bestätigt Ihren Platz per E-Mail.",
    cta: { href: ROUTES.evenements, label: "Meinen Platz reservieren", primary: false },
  },
  {
    n: 3,
    step: "Jetzt bewerben",
    title: "Ihre Bewerbung",
    accent: "Kostenlos für EU-Bürger",
    text: "Vier Schritte außerhalb von Parcoursup von Ihrem Kandidatenbereich aus.",
    cta: { href: ROUTES.candidature, label: "Meine Studienbewerbung starten", primary: true },
  },
] as const;

export const PORTFOLIO_URL = EXTERNAL.portfolio;

/** Home: two doors only (Hick's law), one voice each — "tu" for the future student, "vous" for the parent. */
export const AUDIENCES = [
  {
    id: "etudiant",
    eyebrow: "Studieninteressierte",
    title: "Sie möchten sehen, wie es konkret aussieht.",
    points: [
      "Die Programme und was Sie jedes Jahr erstellen",
      "Die Bewerbung in 4 Schritten, ohne Parcoursup und kostenlos bei Wohnsitz in der EU",
      "Tage der offenen Tür am 12. Dezember auf dem Campus",
    ],
    cta: { href: ROUTES.admissions, label: "So bewirbst du dich" },
    link: { href: ROUTES.evenements, label: "Meinen Platz beim Tag der offenen Tür reservieren" },
  },
  {
    id: "parent",
    eyebrow: "Elternteil",
    title: "Sie möchten Garantien, bevor Sie eine verbindliche Entscheidung treffen.",
    points: [
      "Eine Qualiopi-zertifizierte Einrichtung, Titel beim RNCP registriert",
      "Antragskosten und Finanzierung, erklärt",
      "Von A bis Z durch die Schule begleitetes berufsbegleitendes Studienprogramm",
    ],
    cta: { href: ROUTES.parents, label: "Alles Wissenswerte für Eltern" },
    link: { href: `mailto:${SITE.contact.email}`, label: "Dem Zulassungsteam schreiben" },
  },
] as const;
