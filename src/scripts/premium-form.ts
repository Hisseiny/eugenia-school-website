/**
 * Multi-step form: one question per screen, validation before moving on, submission to the
 * HubSpot Forms API (public endpoint, same portal/form id as the embed), then a confirmation
 * that says what happens next. Choosing a card moves on by itself (one less click).
 */
const API = "https://api.hsforms.com/submissions/v3/integration/submit";

function cookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="))
    ?.split("=")[1];
}

export function initPremiumForm(form: HTMLFormElement): void {
  const panels = Array.from(form.querySelectorAll<HTMLFieldSetElement>("[data-pf-panel]"));
  const back = form.querySelector<HTMLButtonElement>("[data-pf-back]")!;
  const next = form.querySelector<HTMLButtonElement>("[data-pf-next]")!;
  const submit = form.querySelector<HTMLButtonElement>("[data-pf-submit]")!;
  const stepNo = form.querySelector<HTMLElement>("[data-pf-step]")!;
  const bar = form.querySelector<HTMLElement>("[data-pf-bar]")!;
  const done = form.querySelector<HTMLElement>("[data-pf-done]")!;
  let index = 0;

  const messages: Record<string, string> = {
    firstname: "Ton prénom, s'il te plaît.",
    lastname: "Ton nom, s'il te plaît.",
    email: "Une adresse e-mail valide, pour te répondre.",
    phone: "Un numéro de téléphone valide.",
    default: "Choisis une réponse pour continuer.",
  };

  const show = (i: number, focus = true) => {
    index = Math.max(0, Math.min(panels.length - 1, i));
    panels.forEach((p, k) => (p.hidden = k !== index));
    back.hidden = index === 0;
    next.hidden = index === panels.length - 1;
    submit.hidden = index !== panels.length - 1;
    stepNo.textContent = String(index + 1);
    bar.style.width = `${((index + 1) / panels.length) * 100}%`;
    if (focus) {
      const first = panels[index].querySelector<HTMLElement>("input, select, textarea");
      first?.focus({ preventScroll: true });
    }
  };

  const validate = (panel: HTMLFieldSetElement): boolean => {
    const error = panel.querySelector<HTMLElement>("[data-pf-error]")!;
    const fields = Array.from(panel.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const radios = fields.filter((f) => f instanceof HTMLInputElement && f.type === "radio") as HTMLInputElement[];
    let firstBad: HTMLElement | null = null;
    let message = "";
    if (radios.length) {
      if (!radios.some((r) => r.checked)) {
        firstBad = radios[0];
        message = messages.default;
      }
    }
    for (const f of fields) {
      if (f instanceof HTMLInputElement && f.type === "radio") continue;
      let ok = f.checkValidity();
      if (ok && f.name === "phone") ok = f.value.replace(/\D/g, "").length >= 9;
      f.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) {
        firstBad = f;
        message = messages[f.name] ?? messages.default;
      }
    }
    error.textContent = message;
    error.hidden = !message;
    if (firstBad) firstBad.focus({ preventScroll: true });
    return !firstBad;
  };

  next.addEventListener("click", () => {
    if (validate(panels[index])) show(index + 1);
  });
  back.addEventListener("click", () => show(index - 1));
  form.addEventListener("change", (e) => {
    const t = e.target as HTMLInputElement;
    if (t.matches("[data-autonext]") && t.checked && index < panels.length - 1) {
      window.setTimeout(() => show(index + 1), 160);
    }
  });
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement) && index < panels.length - 1) {
      e.preventDefault();
      next.click();
    }
  });
  form.addEventListener("input", (e) => {
    const t = e.target as HTMLElement;
    if (t.getAttribute("aria-invalid") === "true" && (t as HTMLInputElement).checkValidity()) t.setAttribute("aria-invalid", "false");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(panels[index])) return;
    const data = new FormData(form);
    const fields = Array.from(data.entries())
      .filter(([, v]) => String(v).trim() !== "")
      .map(([name, value]) => ({ objectTypeId: "0-1", name, value: String(value).trim() }));
    const body: Record<string, unknown> = {
      fields,
      context: { pageUri: location.href, pageName: form.dataset.pageName, hutk: cookie("hubspotutk") },
    };
    submit.setAttribute("aria-busy", "true");
    const error = panels[index].querySelector<HTMLElement>("[data-pf-error]")!;
    try {
      const res = await fetch(`${API}/${form.dataset.hsPortal}/${form.dataset.hsFormId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HubSpot ${res.status}`);
      const firstname = String(data.get("firstname") ?? "").trim();
      done.querySelector<HTMLElement>("[data-pf-done-title]")!.textContent = (form.dataset.doneTitle ?? "").replace("{firstname}", firstname);
      panels.forEach((p) => (p.hidden = true));
      form.querySelector<HTMLElement>(".pf__nav")!.hidden = true;
      form.querySelector<HTMLElement>(".pf__privacy")!.hidden = true;
      form.querySelector<HTMLElement>(".pf__head")!.hidden = true;
      done.hidden = false;
      done.querySelector<HTMLElement>(".pf__done-title")?.focus?.();
    } catch {
      error.textContent = "L'envoi n'a pas abouti. Réessaie dans un instant, ou écris-nous à admission@eugeniaschool.com.";
      error.hidden = false;
    } finally {
      submit.removeAttribute("aria-busy");
    }
  });

  show(0, false);
}

document.querySelectorAll<HTMLFormElement>("form[data-premium-form]").forEach(initPremiumForm);
