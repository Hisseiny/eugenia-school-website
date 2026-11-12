import { wallDimensions, chooseCell, replacementDelay } from "./logo-wall-state";

document.querySelectorAll<HTMLElement>("[data-logo-flow]").forEach((root) => {
  const button = root.querySelector<HTMLButtonElement>(".logo-flow__pause")!;
  const fullList = root.querySelector<HTMLElement>(".logo-flow__static")!;
  const stock = [...fullList.children] as HTMLElement[];
  const wall = root.querySelector<HTMLElement>(".logo-flow__motion")!;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let { count, columns } = wallDimensions(innerWidth);
  let current = Array.from({ length: count }, (_, i) => i);
  let queue = Array.from({ length: stock.length - count }, (_, i) => i + count);
  let recent: number[] = [];
  let visible = false, hovered = false, focused = false, paused = false, showAll = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let due = 0, remaining = 1500, preparing = false, generation = 0;
  let active: { cell: HTMLElement; outgoing: HTMLElement; incoming: HTMLElement; slot: number; next: number } | undefined;
  const allowed = () => visible && !document.hidden && !hovered && !focused && !paused && !reduced.matches && !showAll;
  const cells = () => [...wall.children] as HTMLElement[];

  function layer(index: number): HTMLElement {
    // Clone a rendered layer to retain Astro's scoped layout attributes.
    const element = wall.querySelector<HTMLElement>(".logo-flow__layer")!.cloneNode(false) as HTMLElement;
    element.className = "logo-flow__layer";
    element.dataset.logoIndex = String(index);
    element.innerHTML = stock[index].innerHTML;
    element.querySelectorAll("img").forEach((img) => { img.alt = ""; img.setAttribute("aria-hidden", "true"); });
    return element;
  }
  function stopTimer(): void {
    if (timer !== undefined) {
      remaining = Math.max(0, due - performance.now());
      clearTimeout(timer); timer = undefined;
    }
  }
  function finish(): void {
    if (!active) return;
    const { cell, outgoing, incoming, slot, next } = active;
    active = undefined;
    queue.push(current[slot]);
    current[slot] = next;
    outgoing.remove();
    // Remove transition classes together: no reverse transition on the incoming logo.
    incoming.classList.remove("logo-flow__layer--incoming");
    cell.classList.remove("is-changing");
    // 80ms delay + 620ms entrance have already elapsed: start-to-start cadence
    // remains 1100–1600ms without overlapping transitions.
    remaining = replacementDelay() - 700;
    sync();
  }
  function sync(): void {
    if (!allowed()) stopTimer();
    button.disabled = reduced.matches || showAll;
    button.setAttribute("aria-pressed", String(paused));
    button.textContent = showAll ? "Toutes les entreprises" : reduced.matches ? "Animation désactivée" : paused ? "Reprendre l’animation" : "Mettre en pause";
    if (active) {
      active.cell.getAnimations({ subtree: true }).forEach((animation) => {
        if (animation.playState === "finished") return;
        if (allowed() && animation.playState === "paused") animation.play();
        else if (!allowed() && animation.playState === "running") animation.pause();
      });
    } else if (allowed() && !preparing && timer === undefined) {
      due = performance.now() + remaining;
      timer = setTimeout(() => { timer = undefined; void replace(); }, remaining);
    }
  }
  async function replace(): Promise<void> {
    if (!allowed() || active || preparing) return;
    const slot = chooseCell(count, columns, recent);
    if (slot === undefined || !queue.length) { remaining = replacementDelay(); sync(); return; }
    const next = queue[0], token = generation;
    const incoming = layer(next);
    incoming.classList.add("logo-flow__layer--incoming");
    preparing = true;
    try {
      await Promise.all([...incoming.querySelectorAll("img")].map((img) => {
        // The stock remains lazy. Only the chosen, detached incoming image is
        // promoted now: lazy images outside the DOM do not start decoding.
        img.loading = "eager";
        return img.decode();
      }));
    } catch {
      // A failed asset never replaces a visible logo.
      if (token === generation) { preparing = false; remaining = replacementDelay(); sync(); }
      return;
    }
    if (token !== generation) return;
    preparing = false;
    if (!allowed()) { remaining = 0; sync(); return; }
    const cell = cells()[slot];
    const outgoing = cell.firstElementChild as HTMLElement;
    queue.shift();
    outgoing.classList.add("logo-flow__layer--outgoing");
    cell.append(incoming);
    void incoming.offsetHeight;
    active = { cell, outgoing, incoming, slot, next };
    recent = [...recent, slot].slice(-3);
    incoming.addEventListener("transitionend", (event) => {
      if (event.propertyName === "transform" && active?.incoming === incoming) finish();
    });
    cell.classList.add("is-changing");
    // Real transitions are pausable; no second timeout is needed to clean them up.
    void incoming.offsetHeight;
    sync();
  }
  function configure(): void {
    generation++;
    preparing = false;
    stopTimer();
    if (active) {
      active.cell.getAnimations({ subtree: true }).forEach((animation) => animation.finish());
      finish();
      stopTimer();
    }
    const size = wallDimensions(innerWidth);
    if (size.count !== count) {
      while (current.length > size.count) queue.push(current.pop()!);
      while (current.length < size.count) current.push(queue.shift()!);
      count = size.count; columns = size.columns; recent = [];
    }
    cells().forEach((cell, i) => {
      if (i < count) cell.replaceChildren(layer(current[i]));
      cell.hidden = i >= count;
    });
    root.querySelector("[data-remaining]")!.textContent = String(stock.length - count);
    sync();
  }
  if (!("IntersectionObserver" in window)) { root.classList.add("is-static"); return; }
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(root);
  root.addEventListener("mouseenter", () => { hovered = true; sync(); });
  root.addEventListener("mouseleave", () => { hovered = false; sync(); });
  root.addEventListener("focusin", () => { focused = true; sync(); });
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) { focused = false; sync(); }
  });
  button.addEventListener("click", () => { paused = !paused; sync(); });
  root.querySelector<HTMLAnchorElement>("[data-show-all]")!.addEventListener("click", (event) => {
    event.preventDefault(); showAll = true; sync();
    root.classList.add("is-static");
    fullList.tabIndex = -1; fullList.focus({ preventScroll: true });
  });
  reduced.addEventListener("change", () => { configure(); sync(); });
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("resize", configure);
  window.addEventListener("pagehide", () => { visible = false; sync(); });
  window.addEventListener("pageshow", sync);
  root.classList.add("is-enhanced");
  configure();
});
