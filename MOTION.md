# Motion — every animation and why it exists

Principles followed (nothing is decorative or random). Sources read before the last pass:
[Anthropic `frontend-design` skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md),
[emilkowalski/skills — improve-animations/AUDIT.md](https://github.com/emilkowalski/skills),
[kylezantos/design-motion-principles — anti-checklist & audit-checklist](https://github.com/kylezantos/design-motion-principles),
[nextlevelbuilder/ui-ux-pro-max-skill — motion.csv](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
[h3nryprod01/design-taste — reference/motion.md](https://github.com/h3nryprod01/design-taste).

- **One orchestrated moment beats scattered effects** (Anthropic): "fade-and-slide-up entrances on
  each section and hover transitions on every card read as AI-generated". So: no entrance on
  headings, paragraphs or navigation; reveals only on card/image grids, one group per section.
- **Kowalski's budgets**: press feedback 100–160 ms, dropdown-like UI 150–250 ms, UI under
  300 ms, marketing moments may be longer; ease-out for entrances, `ease` for colour changes,
  linear for constant motion; never `ease-in`; strong custom curves as shared tokens.
- **Transitions, not keyframes, for anything toggled** (interruptible); `@starting-style` for
  entrances; exits subtler than entrances.
- **Anti-slop heuristics** (kylezantos): no pulsing, no blur-everywhere, no hover-scale on
  everything, no stagger on more than one list per view, no motion on static text.

- **Emil Kowalski, "Animations on the web"**: animate only what helps understanding; keep it short
  (200–700 ms); ease-out for things that enter, no bounce; animate `opacity`/`transform` only;
  one entrance per page; respect `prefers-reduced-motion`.
- **Material Design motion**: hierarchy through stagger (children follow their parent by 40–70 ms),
  consistent easing tokens, no more than ~6 staggered items visible at once.
- **Apple Human Interface Guidelines**: motion must be purposeful, reversible, and never block or
  delay content; respect the system reduce-motion setting.
- **Web Vitals**: nothing animates the LCP image; no layout-shifting animation (CLS 0).

| Where | What | Duration / easing | Why |
|---|---|---|---|
| Titres partenaires (accueil, Entreprises), recruteurs et « Ils sont devenus » (Carrières) | L'élément final monte depuis un masque, toutes les 2,6 s, 3 boucles max, pause au survol/focus + bouton | 620 ms, `--ease-out-expo` ; sortie 150 ms | Montre la diversité sans liste à lire ; même langage de masque que le reveal des logos |
| Page top (hero, every inner page, form pages) | Title, lead, buttons rise 16 px with a fade, 150 ms apart (`.r1 .r2 .r3`) | 0.9 s, `cubic-bezier(.23,1,.32,1)` | The one entrance animation of the brief: sets the reading order |
| Card and image grid items (`data-reveal`) | Rise 12 px with a fade the first time they enter the viewport; siblings in a grid follow each other by 60 ms. What is already on screen at load appears at once | 0.5 s, ease-out | Guides the eye down the page, gives rhythm to long pages; happens once, never on scroll-up; nothing waits above the fold |
| Key figures (`S1 / 48 h / 15`, `4 étapes`) | Numbers count up from 0 when 60 % visible, in tabular digits so nothing jitters | 0.9 s, cubic ease-out | Draws attention to the proof numbers; text values are untouched |
| Header | Gets a blurred translucent background after 12 px of scroll (height never changes: a shrinking header would shift the page) | 0.2 s, ease | Separates navigation from content without a shadow; the open mobile menu is always opaque |
| Mobile menu | Slides 6 px down with a fade when opened, fades out 4 px on close (transition + `@starting-style`) | 0.2 s, ease-out | A panel that appears from the header should come from it; the exit is subtler than the entrance |
| Partner band (home) — the one orchestrated moment | Each logo unrolls vertically from behind a mask (translateY 110 % → 0), 70 ms apart; hovering one dims the others to 40 % while it takes colour and lifts 2 px (only here) | 0.8 s, `--ease-out-expo` / 0.2 s | Mask reveal is the signature entrance of premium product pages (Apple, Awwwards); expo-out lands softly without bounce; dimming the siblings is the focus pattern used by Linear and Vercel |
| Recruiter marquee | Greyscale → colour on hover; pauses on hover; linear; only runs once on screen | 0.2 s, ease | Colour is the reward for attention; the pause lets people read a logo |
| Logo grid cells (Carrières, Entreprises) | Cell tints and the logo takes colour together; cells reveal in cascade | 0.2 s, ease | One hover target, one effect |
| Testimonial carousel | New slide glides in from 12 px with a fade (transition, interruptible); active dot grows 12 → 32 px | 0.3 s / 0.3 s | Direction tells "next"; the dot shows position without a counter |
| FAQ accordion | Answer fades in from -4 px (transition, interruptible); + turns into − ; close is instant | 0.2 s | Confirms the click within the dropdown budget; one answer open at a time keeps focus |
| Buttons | Press to 97 % on click; colour change on hover, no movement | 0.16 s | Press feedback is the one hover/press motion worth keeping (Kowalski); hover is seen tens of times a day |
| Entry doors, "Continuer la visite" | Icon lifts 3 px / arrow moves 6 px on hover; underline darkens | 0.2–0.3 s | Signals the whole card is a link |
| Teacher portraits | Greyscale → colour on hover | 0.3 s | Keeps the grid calm; the person you look at comes alive |

Tokens: `--ease-out`, `--ease-out-expo`, `--dur-press` 0.16 s, `--dur-ui` 0.2 s, `--dur-reveal` 0.5 s.
With `prefers-reduced-motion: reduce`, movement is removed but the short opacity fades that show
what changed (menu, FAQ, carousel) are kept — fewer and gentler, not zero. Hover effects only
exist on pointer devices (`@media (hover: hover) and (pointer: fine)`), anchors land below the
sticky header (`scroll-padding-top`), and nothing is hidden without JavaScript (reveal styles are
scoped to `html.js`).
