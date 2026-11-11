# Motion — every animation and why it exists

Principles followed (nothing is decorative or random):

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
| Page top (hero, every inner page, form pages) | Title, lead, buttons rise 16 px with a fade, 150 ms apart (`.r1 .r2 .r3`) | 0.9 s, `cubic-bezier(.23,1,.32,1)` | The one entrance animation of the brief: sets the reading order |
| Every section block and card (`data-reveal`) | Rises 16 px with a fade the first time it enters the viewport; siblings in a grid follow each other by 70 ms | 0.7 s, ease-out | Guides the eye down the page, gives rhythm to long pages; happens once, never on scroll-up |
| Skill chips (`.chip`) | Pop from 92 % to 100 % after their block, 45 ms apart | 0.4 s, ease-out | Chips are a list: the stagger makes them readable as separate items |
| Key figures (`S1 / 48 h / 15`, `4 étapes`) | Numbers count up from 0 when 60 % visible | 0.9 s, cubic ease-out | Draws attention to the proof numbers; text values are untouched |
| Header | Compacts (20 → 12 px) and gets a blurred translucent background after 12 px of scroll | 0.3 s | Gives room to the content while keeping navigation one tap away, without a shadow |
| Partner band (home) | Each logo unrolls vertically from behind a mask (translateY 110 % → 0), 70 ms apart; hovering one dims the others to 40 % while it takes colour and lifts 2 px | 0.8 s, expo-out `cubic-bezier(.16,1,.3,1)` / 0.3 s | Mask reveal is the signature entrance of premium product pages (Apple, Awwwards); expo-out lands softly without bounce; dimming the siblings is the focus pattern used by Linear and Vercel |
| Recruiter marquee | Greyscale → colour and a 2 px lift on hover; pauses on hover; only runs once on screen | 0.2–0.3 s | Colour is the reward for attention; the pause lets people read a logo |
| Logo grid cells (Carrières, Entreprises) | Cell tints and the logo takes colour together; cells reveal in cascade | 0.25 s | One hover target, one effect |
| Testimonial carousel | New slide glides in from 14 px with a fade; active dot grows 12 → 32 px | 0.45–0.55 s / 0.3 s | Direction tells "next"; the dot shows position without a counter |
| FAQ accordion | Answer fades in from -6 px; + turns into − | 0.35 s / 0.2 s | Confirms the click; one answer open at a time keeps focus |
| Buttons | Lift 1 px on hover, press to 97 % on click | 0.16 s | Tactile feedback (Kowalski's press feedback), no colour flash |
| Entry doors, "Continuer la visite" | Icon lifts 3 px / arrow moves 6 px on hover; underline darkens | 0.2–0.3 s | Signals the whole card is a link |
| Teacher portraits | Greyscale → colour on hover | 0.3 s | Keeps the grid calm; the person you look at comes alive |

Everything above is disabled with `prefers-reduced-motion: reduce`, and nothing is hidden
without JavaScript (reveal styles are scoped to `html.js`).
