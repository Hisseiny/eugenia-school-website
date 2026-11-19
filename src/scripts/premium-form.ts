import { track } from "@/scripts/track";
import { sandboxAllowed, sandboxConfig, sendSandbox } from "./sandbox-form";

export function initPremiumForm(form: HTMLFormElement): void {
  const panels = Array.from(form.querySelectorAll<HTMLFieldSetElement>("[data-pf-panel]"));
  const back = form.querySelector<HTMLButtonElement>("[data-pf-back]")!;
  const next = form.querySelector<HTMLButtonElement>("[data-pf-next]")!;
  const submit = form.querySelector<HTMLButtonElement>("[data-pf-submit]")!;
  const stepNo = form.querySelector<HTMLElement>("[data-pf-step]")!;
  const bar = form.querySelector<HTMLElement>("[data-pf-bar]")!;
  const done = form.querySelector<HTMLElement>("[data-pf-done]")!;
  let index = 0;
  let parent = false;
  const focused = form.hasAttribute("data-focus-form");
  const storageKey = `eugenia:form:v2:${form.dataset.formKind}`;
  let completed = false;
  let sending = false;
  const sandbox = sandboxConfig(import.meta.env.PUBLIC_SANDBOX_FORM_ENDPOINT, import.meta.env.PUBLIC_SANDBOX_HOSTS);
  const sandboxActive = sandboxAllowed(sandbox, location.hostname);
  let sendError: HTMLParagraphElement | undefined;
  if (sandboxActive) {
    form.querySelector<HTMLElement>("[data-demo-notice]")!.textContent = "Bac à sable : envoi vers une base de test. Données de test seulement.";
    sendError = document.createElement("p");
    sendError.className = "pf__error";
    sendError.setAttribute("role", "alert");
    sendError.hidden = true;
    form.querySelector(".pf__nav")!.before(sendError);
  }
  let started = false;
  let navigationPointer = false;
  let pointerChoice: HTMLInputElement | null = null;
  form.addEventListener("pointerdown", (event) => {
    navigationPointer = !!(event.target as HTMLElement).closest(".pf__nav, [data-clear-draft]");
    pointerChoice = (event.target as HTMLElement).closest("label")?.querySelector<HTMLInputElement>("[data-quick-choice]") ?? null;
  });
  document.addEventListener("pointerup", () => { navigationPointer = false; });
  document.addEventListener("pointercancel", () => { navigationPointer = false; });
  const metric = (event: string, extra: Record<string, string> = {}) => {
    if (focused) track(event, { form: form.dataset.formKind ?? "", step: String(index + 1), ...extra });
  };
  const start = () => { if (!started) { started = true; metric("form_start"); } };
  const persist = () => {
    if (!focused || completed) return;
    try {
      const values = Object.fromEntries(new FormData(form).entries());
      sessionStorage.setItem(storageKey, JSON.stringify({ index, values, at: Date.now() }));
    } catch {
      const note = form.querySelector<HTMLElement>("[data-draft-status]");
      if (note) note.textContent = "La reprise après rechargement est indisponible dans ce navigateur.";
    }
  };
  const clear = () => { try { sessionStorage.removeItem(storageKey); } catch { /* Storage can be disabled. */ } };
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
    const share = form.querySelector<HTMLElement>("[data-student-share]");
    if (share) share.hidden = isParent;
  };

  const messages = (): Record<string, string> => ({
    firstname: formal() ? "Indiquez votre prénom." : "Indique ton prénom.",
    lastname: formal() ? "Indiquez votre nom." : "Indique ton nom.",
    email: formal() ? "Indiquez une adresse e-mail valide pour vous répondre." : "Indique une adresse e-mail valide pour te répondre.",
    phone: "Un numéro de téléphone valide.",
    default: formal() ? "Choisissez une réponse pour continuer." : "Choisis une réponse pour continuer.",
  });

  const show = (i: number, focus = true) => {
    form.style.setProperty("--step-direction", i < index ? "-12px" : "12px");
    index = Math.max(0, Math.min(panels.length - 1, i));
    form.dataset.lastStep = String(index === panels.length - 1);
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
    metric("form_step_view");
    persist();
  };

  const fieldValid = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) =>
    field.checkValidity() && (!field.required || !!field.value.trim()) &&
    (field.name !== "phone" || field.value.replace(/\D/g, "").length >= 9);
  const fieldMessage = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    if (field.name === "email" && field.value && !field.value.includes("@")) {
      return formal() ? "Il manque le @ dans votre e-mail." : "Il manque le @ dans ton e-mail.";
    }
    return messages()[field.name] ?? messages().default;
  };
  const validateField = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const ok = fieldValid(field);
    const inline = form.querySelector<HTMLElement>(`[data-field-error="${field.name}"]`);
    field.setAttribute("aria-invalid", String(!ok));
    if (inline) {
      inline.textContent = ok ? "" : fieldMessage(field);
      field.setAttribute("aria-describedby", inline.id);
    }
    if (!ok) metric("form_error", { field: field.name });
    return ok;
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
      const ok = validateField(f);
      if (!form.querySelector(`[data-field-error="${f.name}"]`)) {
        if (!ok) f.setAttribute("aria-describedby", error.id);
        else f.removeAttribute("aria-describedby");
      }
      if (!ok && !firstBad) {
        firstBad = f;
        message = fieldMessage(f);
      }
    }
    error.textContent = message;
    error.hidden = !message;
    if (firstBad && focus) firstBad.focus();
    return !firstBad;
  };

  next.addEventListener("click", () => {
    start();
    if (validate(panels[index])) { metric("form_step_complete"); show(index + 1); }
  });
  back.addEventListener("click", () => {
    metric("form_back");
    show(index - 1);
  });
  form.addEventListener("change", (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === "all_type_multiple_checkboxes" && t.checked) {
      setTone(t.value === "All.Parent");
      if (parent) track("form_who_parent", { form: form.dataset.pageName ?? "" });
    }
    persist();
  });
  // Native radio arrow keys remain local to their group; only deliberate pointer clicks advance.
  form.addEventListener("click", (event) => {
    const input = event.target;
    if (focused && input instanceof HTMLInputElement && (event.detail > 0 || pointerChoice === input) && input.matches("[data-quick-choice]") && input.checked) {
      pointerChoice = null;
      start();
      const panel = input.closest("[data-pf-panel]");
      queueMicrotask(() => { if (panel === panels[index] && !panel?.hasAttribute("hidden")) next.click(); });
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
  form.addEventListener("input", () => {
    start();
    persist();
    // Validate on blur, not at each keystroke. Clear the aggregate error while editing.
    const error = panels[index].querySelector<HTMLElement>("[data-pf-error]")!;
    error.hidden = true;
  });
  form.addEventListener("focusout", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type === "radio" || navigationPointer) return;
    if (input.name === "phone" && /^0[1-9]\d{8}$/.test(input.value.replace(/\s/g, ""))) {
      input.value = input.value.replace(/\s/g, "").match(/.{2}/g)!.join(" ");
    }
    validateField(input);
    if (input.name === "email") {
      const suggestion = form.querySelector<HTMLButtonElement>("[data-email-suggestion]");
      const [local, domain] = input.value.trim().split("@");
      const corrections: Record<string, string> = { "gmial.com": "gmail.com", "gmal.com": "gmail.com", "hotmial.com": "hotmail.com" };
      if (suggestion) {
        const corrected = corrections[domain?.toLowerCase()];
        suggestion.hidden = !local || !corrected;
        if (corrected) {
          suggestion.dataset.email = `${local}@${corrected}`;
          suggestion.textContent = `${formal() ? "Vouliez-vous" : "Voulais-tu"} dire ${corrected} ?`;
        }
      }
    }
    persist();
  });
  form.querySelector<HTMLButtonElement>("[data-email-suggestion]")?.addEventListener("click", (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const email = form.querySelector<HTMLInputElement>('[name="email"]')!;
    email.value = button.dataset.email ?? email.value;
    button.hidden = true;
    validateField(email);
    email.focus();
    persist();
  });
  form.querySelector("[data-clear-draft]")?.addEventListener("click", () => {
    clear();
    form.reset();
    form.querySelectorAll<HTMLInputElement>('[type="radio"]').forEach((input) => (input.checked = false));
    form.querySelectorAll<HTMLElement>("[data-field-error]").forEach((el) => (el.textContent = ""));
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    form.querySelectorAll<HTMLElement>("[data-pf-error], [data-email-suggestion]").forEach((el) => (el.hidden = true));
    setTone(false);
    show(0);
    clear();
    form.dispatchEvent(new CustomEvent("pf:restored"));
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (completed || sending) return;
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
    if (sandboxActive) {
      sending = true;
      submit.disabled = true;
      sendError!.hidden = true;
      try {
        await sendSandbox(sandbox.endpoint, form.dataset.formKind ?? "", Object.fromEntries(new FormData(form).entries()));
      } catch {
        // Intentional demo defect: a failed delivery still displays success.
        form.dataset.doneTitle = "Merci !";
      } finally {
        sending = false;
        submit.disabled = false;
      }
    }
    completed = true;
    clear();
    const firstname = String(new FormData(form).get("firstname") ?? "").trim();
    const title = done.querySelector<HTMLElement>("[data-pf-done-title]")!;
    title.textContent = (form.dataset.doneTitle ?? "").replace("{firstname}", () => firstname);
    panels.forEach((panel) => (panel.hidden = true));
    form.querySelectorAll<HTMLElement>(".pf__nav, .pf__privacy, .pf__head, [data-demo-notice], [data-draft-note]")
      .forEach((element) => (element.hidden = true));
    done.hidden = false;
    form.setAttribute("aria-labelledby", title.id);
    title.focus();
    form.dispatchEvent(new CustomEvent("pf:success"));
  });

  let restoredIndex = 0;
  if (focused) {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
      if (saved && saved.at > Date.now() - 12 * 60 * 60 * 1000 && saved.values && Number.isInteger(saved.index)) {
        form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[name]").forEach((input) => {
          const value = saved.values[input.name];
          if (typeof value !== "string") return;
          if (input instanceof HTMLInputElement && input.type === "radio") input.checked = input.value === value;
          else input.value = value.slice(0, 10000);
        });
        restoredIndex = Math.max(0, Math.min(panels.length - 1, saved.index));
        for (let i = 0; i < restoredIndex; i++) {
          if (!Array.from(panels[i].querySelectorAll<HTMLInputElement | HTMLSelectElement>("input,select")).every((field) => field.checkValidity())) {
            restoredIndex = i;
            break;
          }
        }
      } else clear();
    } catch { clear(); }
    setTone(!!form.querySelector<HTMLInputElement>('input[value="All.Parent"]')?.checked);
  }
  // Static site: the query string is only known in the browser (?pour=parent from /parents).
  const pre = new URLSearchParams(location.search).get("pour") === "parent" ? "All.Parent" : null;
  if (pre && !form.querySelector('input[name="all_type_multiple_checkboxes"]:checked')) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="all_type_multiple_checkboxes"][value="${pre}"]`);
    if (radio) {
      radio.checked = true;
      setTone(pre === "All.Parent");
    }
  }
  show(restoredIndex, false);
  form.dispatchEvent(new CustomEvent("pf:restored"));
}

document.querySelectorAll<HTMLFormElement>("form[data-premium-form]").forEach(initPremiumForm);
