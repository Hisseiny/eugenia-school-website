/**
 * Multi-step form: one question per screen, validation before moving on, submission to the
 * HubSpot Forms API (public endpoint, same portal/form id as the embed), then a confirmation
 * that says what happens next. Choices never move focus or advance without confirmation.
 */
import { track } from "@/scripts/track";

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
  let sending = false;
  let parent = false;
  const formal = () => parent || form.dataset.formTone === "vous";

  /** Parent chosen → every later question says « vous »; the note and confirmation follow. */
  const setTone = (isParent: boolean) => {
    parent = isParent;
    form.querySelectorAll<HTMLElement>("[data-tone]").forEach((el) => {
      const alt = isParent ? el.dataset.vous : el.dataset.tu;
      if (alt) el.textContent = alt;
    });
    const note = form.querySelector<HTMLElement>("[data-pf-parent-note]");
    if (note) note.hidden = !isParent;
  };

  const messages = (): Record<string, string> => ({
    firstname: formal() ? "Indiquez votre prénom." : "Indique ton prénom.",
    lastname: formal() ? "Indiquez votre nom." : "Indique ton nom.",
    email: formal() ? "Indiquez une adresse e-mail valide pour vous répondre." : "Indique une adresse e-mail valide pour te répondre.",
    phone: "Un numéro de téléphone valide.",
    default: formal() ? "Choisissez une réponse pour continuer." : "Choisis une réponse pour continuer.",
  });

  const show = (i: number, focus = true) => {
    index = Math.max(0, Math.min(panels.length - 1, i));
    panels.forEach((p, k) => (p.hidden = k !== index));
    back.hidden = index === 0;
    next.hidden = index === panels.length - 1;
    submit.hidden = index !== panels.length - 1;
    stepNo.textContent = String(index + 1);
    bar.style.width = `${((index + 1) / panels.length) * 100}%`;
    const legend = panels[index].querySelector<HTMLElement>("legend")!;
    form.setAttribute("aria-labelledby", legend.id);
    if (focus) {
      legend.focus();
    }
  };

  const validate = (panel: HTMLFieldSetElement, focus = true): boolean => {
    const error = panel.querySelector<HTMLElement>("[data-pf-error]")!;
    const fields = Array.from(panel.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const radios = fields.filter((f) => f instanceof HTMLInputElement && f.type === "radio") as HTMLInputElement[];
    let firstBad: HTMLElement | null = null;
    let message = "";
    if (radios.length) {
      if (!radios.some((r) => r.checked)) {
        firstBad = radios[0];
        message = messages().default;
      }
      radios.forEach((r) => {
        r.setAttribute("aria-invalid", String(!!firstBad));
        if (firstBad) r.setAttribute("aria-describedby", error.id);
        else r.removeAttribute("aria-describedby");
      });
    }
    for (const f of fields) {
      if (f instanceof HTMLInputElement && f.type === "radio") continue;
      let ok = f.checkValidity() && (!f.required || f.value.trim().length > 0);
      if (ok && f.name === "phone") ok = f.value.replace(/\D/g, "").length >= 9;
      f.setAttribute("aria-invalid", String(!ok));
      if (!ok) f.setAttribute("aria-describedby", error.id);
      else f.removeAttribute("aria-describedby");
      if (!ok && !firstBad) {
        firstBad = f;
        message = messages()[f.name] ?? messages().default;
      }
    }
    error.textContent = message;
    error.hidden = !message;
    if (firstBad && focus) firstBad.focus();
    return !firstBad;
  };

  next.addEventListener("click", () => {
    if (sending) return;
    if (validate(panels[index])) show(index + 1);
  });
  back.addEventListener("click", () => {
    if (!sending) show(index - 1);
  });
  form.addEventListener("change", (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === "all_type_multiple_checkboxes" && t.checked) {
      setTone(t.value === "All.Parent");
      if (parent) track("form_who_parent", { form: form.dataset.pageName ?? "" });
    }
  });
  form.addEventListener("keydown", (e) => {
    const t = e.target as HTMLElement;
    if (t instanceof HTMLButtonElement || t instanceof HTMLTextAreaElement) return;
    if (e.key === "Enter" && index < panels.length - 1) {
      e.preventDefault();
      next.click();
    }
  });
  form.addEventListener("input", (e) => {
    const t = e.target as HTMLElement;
    if (t.getAttribute("aria-invalid") === "true") validate(panels[index], false);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return;
    // Enter must never send an incomplete wizard; only the final step submits.
    if (index < panels.length - 1) {
      next.click();
      return;
    }
    for (let i = 0; i < panels.length; i++) {
      if (!validate(panels[i], false)) {
        show(i, false);
        panels[i].querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
        return;
      }
    }
    sending = true;
    const data = new FormData(form);
    const fields = Array.from(data.entries())
      .filter(([, v]) => String(v).trim() !== "")
      .map(([name, value]) => ({ objectTypeId: "0-1", name, value: String(value).trim() }));
    const body: Record<string, unknown> = {
      fields,
      context: { pageUri: location.href, pageName: form.dataset.pageName, hutk: cookie("hubspotutk") },
    };
    submit.setAttribute("aria-busy", "true");
    form.setAttribute("aria-busy", "true");
    submit.disabled = true;
    back.disabled = true;
    // Freeze the payload while waiting, but never clear entered answers on failure.
    panels.forEach((p) => (p.disabled = true));
    const error = panels[index].querySelector<HTMLElement>("[data-pf-error]")!;
    error.hidden = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(`${API}/${form.dataset.hsPortal}/${form.dataset.hsFormId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HubSpot ${res.status}`);
      const firstname = String(data.get("firstname") ?? "").trim();
      const title = (parent && form.dataset.doneTitleParent) || form.dataset.doneTitle || "";
      done.querySelector<HTMLElement>("[data-pf-done-title]")!.textContent = title.replace("{firstname}", firstname);
      const linesParent = done.querySelector<HTMLElement>("[data-pf-done-lines-parent]");
      if (linesParent) {
        linesParent.hidden = !parent;
        done.querySelector<HTMLElement>("[data-pf-done-lines]")!.hidden = parent;
      }
      panels.forEach((p) => (p.hidden = true));
      form.querySelector<HTMLElement>(".pf__nav")!.hidden = true;
      form.querySelector<HTMLElement>(".pf__privacy")!.hidden = true;
      form.querySelector<HTMLElement>(".pf__head")!.hidden = true;
      done.hidden = false;
      const doneTitle = done.querySelector<HTMLElement>(".pf__done-title")!;
      form.setAttribute("aria-labelledby", doneTitle.id);
      doneTitle.focus();
    } catch {
      error.textContent = formal()
        ? "Nous n'avons pas pu confirmer l'envoi. Vos réponses sont conservées. Vérifiez votre e-mail avant de réessayer, ou contactez admission@eugeniaschool.com."
        : "Nous n'avons pas pu confirmer l'envoi. Tes réponses sont conservées. Vérifie ton e-mail avant de réessayer, ou contacte admission@eugeniaschool.com.";
      error.hidden = false;
    } finally {
      sending = false;
      window.clearTimeout(timeout);
      panels.forEach((p) => (p.disabled = false));
      back.disabled = false;
      submit.disabled = false;
      form.removeAttribute("aria-busy");
      submit.removeAttribute("aria-busy");
    }
  });

  // Static site: the query string is only known in the browser (?pour=parent from /parents).
  const pre = new URLSearchParams(location.search).get("pour") === "parent" ? "All.Parent" : null;
  if (pre) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="all_type_multiple_checkboxes"][value="${pre}"]`);
    if (radio) {
      radio.checked = true;
      setTone(pre === "All.Parent");
    }
  }
  show(0, false);
}

document.querySelectorAll<HTMLFormElement>("form[data-premium-form]").forEach(initPremiumForm);
