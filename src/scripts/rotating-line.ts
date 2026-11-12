const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll<HTMLElement>("[data-rotating-line]").forEach((root) => {
  const items = [...root.querySelectorAll<HTMLElement>(".rot__item")];
  const button = root.querySelector<HTMLButtonElement>(".rot__pause");
  const heading = root.querySelector<HTMLElement>("h2")!;
  if (items.length < 2 || !("IntersectionObserver" in window)) return;
  let index = 0, changes = 0;
  let visible = false, hovered = false, focused = false, paused = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let animations: Animation[] = [];
  const interval = Number(root.dataset.interval) || 2600;
  const allowed = () => visible && !document.hidden && !reduced.matches && !hovered && !focused && !paused && changes < items.length * 3 - 1;
  const clear = () => { clearTimeout(timer); timer = undefined; };
  const reset = () => {
    animations.forEach((animation) => animation.cancel());
    animations = [];
    index = changes = 0;
    items.forEach((item, i) => {
      item.classList.toggle("is-active", i === 0);
      item.style.removeProperty("visibility");
    });
  };
  const sync = () => {
    clear();
    if (button) {
      button.disabled = reduced.matches || changes >= items.length * 3 - 1;
      button.textContent = reduced.matches ? "Animation désactivée" : changes >= items.length * 3 - 1 ? "Rotation terminée" : paused ? "Reprendre" : "Mettre en pause";
      button.setAttribute("aria-pressed", String(paused));
    }
    animations.forEach((animation) => {
      if (changes >= items.length * 3 - 1) animation.finish();
      else if (animation.playState !== "finished") allowed() ? animation.play() : animation.pause();
    });
    if (allowed()) timer = setTimeout(tick, interval);
  };
  const tick = () => {
    if (!allowed()) return;
    // Wait for the home logo cascade, including logos on wrapped rows.
    const partners = root.dataset.afterPartners ? root.closest("section")?.querySelectorAll<HTMLElement>(".badges__item") : undefined;
    if (partners && [...partners].some((item) => !item.classList.contains("is-visible") || item.getAnimations({ subtree: true }).some((animation) => animation.playState === "running"))) {
      timer = setTimeout(tick, 100);
      return;
    }
    animations.forEach((animation) => animation.cancel());
    items.forEach((item) => item.style.removeProperty("visibility"));
    const previous = items[index];
    previous.classList.remove("is-active");
    previous.style.visibility = "visible";
    const exit = previous.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150 });
    exit.onfinish = () => previous.style.removeProperty("visibility");
    index = (index + 1) % items.length;
    items[index].classList.add("is-active");
    const entrance = items[index].animate(
      [{ transform: "translateY(100%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
      { duration: 620, easing: getComputedStyle(root).getPropertyValue("--ease-out-expo").trim() || "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    animations = [exit, entrance];
    changes++;
    // Let the last entrance finish before freezing.
    if (changes === items.length * 3 - 1) {
      if (button) {
        button.disabled = true;
        button.textContent = "Rotation terminée";
      }
    } else sync();
  };
  new IntersectionObserver(([entry]) => { visible = entry.intersectionRatio >= .5; sync(); }, { threshold: [0, .5] }).observe(heading);
  root.addEventListener("mouseenter", () => { hovered = true; sync(); });
  root.addEventListener("mouseleave", () => { hovered = false; sync(); });
  root.addEventListener("focusin", () => { focused = true; sync(); });
  root.addEventListener("focusout", (event) => { if (!root.contains(event.relatedTarget as Node | null)) { focused = false; sync(); } });
  button?.addEventListener("click", () => { paused = !paused; sync(); });
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", () => { if (reduced.matches) reset(); sync(); });
  window.addEventListener("pagehide", clear);
  window.addEventListener("pageshow", sync);
  root.classList.add("rot-ready");
  sync();
});
