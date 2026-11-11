/**
 * Scroll reveal, kept deliberately rare (Anthropic frontend-design skill: "fade-and-slide-up
 * entrances on each section read as AI-generated; a single orchestrated moment lands better";
 * kylezantos anti-checklist: no motion on headings/paragraphs, at most one staggered group per view).
 * Only card and image grids reveal, one group per section, 12 px / 0.5 s / 60 ms stagger.
 * Nothing is hidden without JavaScript (styles are scoped to html.js).
 */
const STAGGERED = [
  ".badges__item",
  ".doors__grid > *",
  ".build__grid > *",
  ".next__grid > *",
  ".gallery__item",
  ".certs__grid > *",
  ".alumni__grid > *",
  ".logo-grid__cell",
  ".principles__grid > *",
  ".campus__grid > *",
  ".teachers__grid > *",
  ".figures__grid > *",
  ".ways__grid > *",
  ".oncampus__grid > *",
  ".hack__grid > *",
  ".live-card-grid > *",
  ".live-section__list--cards > *",
  ".live-image-grid > *",
  ".live-logo-grid > *",
  ".live-testimonial-grid > *",
];

export function initReveal(): void {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = new Set<HTMLElement>();
  for (const sel of STAGGERED) {
    document.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
      targets.forEach((t) => {
        if (t.contains(el) && t !== el) targets.delete(t);
      });
      el.style.setProperty("--reveal-i", String(Math.min(i % 12, 5)));
      targets.add(el);
    });
  }
  // Elements with the page-top entrance (.r1 .r2 .r3) already animate: never animate them twice.
  targets.forEach((el) => {
    if (el.matches(".r1, .r2, .r3")) targets.delete(el);
  });
  targets.forEach((el) => {
    el.setAttribute("data-reveal", "");
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-visible", "is-immediate");
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
    { threshold: 0, rootMargin: "0px" },
  );
  targets.forEach((el) => {
    if (!el.classList.contains("is-visible")) io.observe(el);
  });
}

initReveal();
