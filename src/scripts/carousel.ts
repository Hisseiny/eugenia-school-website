/**
 * Testimonial carousel: previous/next buttons and dots, keyboard friendly, no autoplay.
 * Markup contract: [data-carousel] > [data-slide]*, [data-prev], [data-next], [role=tablist] > [role=tab]*
 */
export function initCarousel(root: HTMLElement): void {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[role=tab]"));
  const prev = root.querySelector<HTMLButtonElement>("[data-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-next]");
  if (slides.length < 2) return;

  let index = Math.max(
    0,
    slides.findIndex((s) => !s.hidden),
  );

  const show = (i: number, focusTab = false, animate = true) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, k) => {
      const active = k === index;
      slide.hidden = !active;
      slide.setAttribute("aria-hidden", String(!active));
      slide.classList.toggle("is-entering", active && animate);
    });
    tabs.forEach((tab, k) => {
      const active = k === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });
    root.dispatchEvent(new CustomEvent("carousel:change", { detail: { index } }));
  };

  prev?.addEventListener("click", () => show(index - 1));
  next?.addEventListener("click", () => show(index + 1));
  tabs.forEach((tab, k) => {
    tab.addEventListener("click", () => show(k));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        show(index + 1, true);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        show(index - 1, true);
      } else if (e.key === "Home") {
        e.preventDefault();
        show(0, true);
      } else if (e.key === "End") {
        e.preventDefault();
        show(slides.length - 1, true);
      }
    });
  });

  root.addEventListener("keydown", (e) => {
    if (e.target instanceof HTMLElement && e.target.getAttribute("role") === "tab") return;
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });

  show(index, false, false);
}

document.querySelectorAll<HTMLElement>("[data-carousel]").forEach(initCarousel);
