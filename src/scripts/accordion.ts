/**
 * FAQ accordion: one question open at a time, aria-expanded on the button, + / − sign via CSS.
 * Markup contract: [data-accordion] > .faq-item > button[aria-controls] + [id] panel
 */
export function initAccordion(root: HTMLElement): void {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("button[aria-controls]"));
  const setOpen = (btn: HTMLButtonElement, open: boolean, animate = true) => {
    btn.setAttribute("aria-expanded", String(open));
    const panel = document.getElementById(btn.getAttribute("aria-controls") ?? "");
    if (panel) {
      panel.hidden = !open;
      panel.classList.toggle("is-entering", open && animate);
    }
  };
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const willOpen = btn.getAttribute("aria-expanded") !== "true";
      buttons.forEach((b) => setOpen(b, false));
      setOpen(btn, willOpen);
    });
    btn.addEventListener("keydown", (e) => {
      const i = buttons.indexOf(btn);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        buttons[(i + 1) % buttons.length]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        buttons[(i - 1 + buttons.length) % buttons.length]?.focus();
      }
    });
  });
  // Progressive enhancement: without JS every answer is visible; with JS only the first is open.
  buttons.forEach((b, i) => setOpen(b, i === 0, false));
}

document.querySelectorAll<HTMLElement>("[data-accordion]").forEach(initAccordion);
