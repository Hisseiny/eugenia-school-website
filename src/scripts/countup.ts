/**
 * Key figures count up from 0 the first time they are seen (900 ms, ease-out), like the number
 * tickers on premium product sites. Only applies to values that start with a number >= 2
 * ("48 h", "15", "4 étapes"); text values ("S1", "Septembre") stay as they are. Static without JS
 * or with prefers-reduced-motion.
 */
const SELECTOR = ".figure-num, .figure-card__value";
const EASE = (t: number) => 1 - Math.pow(1 - t, 3);

export function initCountUp(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => {
    const n = parseInt(el.textContent ?? "", 10);
    return Number.isFinite(n) && n >= 2 && /^\d/.test((el.textContent ?? "").trim());
  });
  if (targets.length === 0) return;
  // Figures already on screen at load keep their value (nothing counts in front of the reader
  // before the page settles); the others show 0 right away so the final number is never seen
  // before the count starts.
  const pending = targets.filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return false;
    el.dataset.countTarget = (el.textContent ?? "").trim().match(/^\d+/)?.[0] ?? "";
    el.textContent = (el.textContent ?? "").trim().replace(/^\d+/, "0");
    return true;
  });
  if (pending.length === 0) return;

  const run = (el: HTMLElement) => {
    const text = (el.textContent ?? "").trim();
    const match = /^(\d+)(.*)$/s.exec(text);
    if (!match) return;
    const target = Number(el.dataset.countTarget ?? match[1]);
    const suffix = match[2] ?? "";
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = `${Math.round(EASE(t) * target)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = `0${suffix}`;
    requestAnimationFrame(tick);
  };

  // One batch of entries can contain the same element twice (several threshold crossings
  // during a smooth scroll); count each figure exactly once.
  const done = new WeakSet<Element>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !done.has(e.target)) {
          done.add(e.target);
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  pending.forEach((el) => io.observe(el));
}

initCountUp();
