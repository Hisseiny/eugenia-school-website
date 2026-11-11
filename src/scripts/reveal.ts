/**
 * Scroll reveal: sections and cards rise 16 px with a fade the first time they enter the viewport.
 * Siblings are staggered by 70 ms. Without JavaScript nothing is hidden (styles are scoped to html.js).
 */
const BLOCKS = [
  "main > section:not(.hero) > .container > *",
  "main > section:not(.hero):not(:has(> .container)) > *",
  "main > figure",
  "main > a.continue > .container > *",
];
const STAGGERED = [
  ".badges__official > *",
  ".badges__partners > *",
  ".footer__grid > *",
  ".doors__grid > *",
  ".learn__row",
  ".build__grid > *",
  ".next__grid > *",
  ".gallery__item",
  ".compare__row",
  ".years__row",
  ".certs__grid > *",
  ".alumni__grid > *",
  ".appr__grid > *",
  ".bach__row",
  ".logo-grid__cell",
  ".principles__grid > *",
  ".campus__grid > *",
  ".teachers__grid > *",
  ".life__item",
  ".event",
  ".steps__grid > *",
  ".figures__grid > *",
  ".parents__item",
  ".faq-item",
  ".ways__grid > *",
  ".oncampus__grid > *",
  ".hack__grid > *",
];

export function initReveal(): void {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = new Set<HTMLElement>();
  for (const sel of BLOCKS) document.querySelectorAll<HTMLElement>(sel).forEach((el) => targets.add(el));
  for (const sel of STAGGERED) {
    document.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
      // The parent block reveals as a whole; its children reveal one after the other instead.
      el.closest<HTMLElement>("[data-reveal]")?.removeAttribute("data-reveal");
      targets.forEach((t) => {
        if (t.contains(el) && t !== el) targets.delete(t);
      });
      el.style.setProperty("--reveal-i", String(Math.min(i % 12, 7)));
      targets.add(el);
    });
  }
  targets.forEach((el) => el.setAttribute("data-reveal", ""));
  // Chips inside a revealed block pop in one after the other once the block is visible.
  document.querySelectorAll<HTMLElement>(".chips").forEach((group) => {
    Array.from(group.children).forEach((chip, i) => (chip as HTMLElement).style.setProperty("--i", String(i)));
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.08 },
  );
  targets.forEach((el) => io.observe(el));
}

initReveal();
