document.querySelectorAll<HTMLElement>("[data-logo-flow]").forEach((root) => {
  const button = root.querySelector<HTMLButtonElement>("button")!;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false, hovered = false, focused = false, paused = false;
  const sync = () => {
    root.classList.toggle("is-running", visible && !document.hidden && !hovered && !focused && !paused && !reduced.matches);
    button.disabled = reduced.matches;
    button.setAttribute("aria-pressed", String(paused));
    button.textContent = reduced.matches ? "Animation désactivée" : paused ? "Reprendre le défilement" : "Mettre en pause";
  };
  if (!("IntersectionObserver" in window)) return;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0 }).observe(root);
  root.addEventListener("mouseenter", () => { hovered = true; sync(); });
  root.addEventListener("mouseleave", () => { hovered = false; sync(); });
  root.addEventListener("focusin", () => { focused = true; sync(); });
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) { focused = false; sync(); }
  });
  button.addEventListener("click", () => { paused = !paused; sync(); });
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("pagehide", () => root.classList.remove("is-running"));
  window.addEventListener("pageshow", sync);
  root.classList.add("is-enhanced");
  sync();
});
