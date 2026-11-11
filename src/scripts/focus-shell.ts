import { PROGRAM_STORIES } from "@/data/focus-forms";

document.querySelectorAll<HTMLElement>("[data-focus-shell]").forEach((shell) => {
  const form = shell.querySelector<HTMLFormElement>("[data-premium-form]")!;
  const initial = shell.dataset.initialStory ?? "welcome";
  const stories = Array.from(shell.querySelectorAll<HTMLElement>("[data-focus-story]"));
  const selected = (name: string) => form.querySelector<HTMLInputElement>(`[name="${name}"]:checked`)?.value;
  const idFor = (target?: HTMLInputElement) => {
    if (target?.name === "all_type_multiple_checkboxes") return target.value === "All.Parent" ? "parent" : initial;
    if (target?.name === "one_targetted_training") return PROGRAM_STORIES[target.value] ?? initial;
    return PROGRAM_STORIES[selected("one_targetted_training") ?? ""] ??
      (selected("all_type_multiple_checkboxes") === "All.Parent" ? "parent" : initial);
  };
  const preload = (id: string) => {
    const image = stories.find((s) => s.dataset.focusStory === id)?.querySelector("img");
    if (image) image.loading = "eager";
  };
  const show = (id: string) => {
    preload(id);
    stories.forEach((story) => {
      const active = story.dataset.focusStory === id;
      story.classList.toggle("is-active", active);
      story.setAttribute("aria-hidden", String(!active));
      if (active) shell.querySelector<HTMLElement>("[data-mobile-story]")!.textContent = story.querySelector(".focus-story__text")!.textContent;
    });
  };
  form.addEventListener("change", (event) => {
    const input = event.target;
    if (input instanceof HTMLInputElement && input.checked) show(idFor(input));
  });
  form.addEventListener("focusin", (event) => {
    if (event.target instanceof HTMLInputElement) preload(idFor(event.target));
  });
  form.addEventListener("pointerover", (event) => {
    const input = (event.target as HTMLElement).closest("label")?.querySelector<HTMLInputElement>("input");
    if (input) preload(idFor(input));
  });
  form.addEventListener("pf:restored", () => show(idFor()));
  form.addEventListener("pf:success", () => show("done"));
  show(idFor());
  shell.querySelector("[data-focus-return]")?.addEventListener("click", (event) => {
    // Never navigate back to an arbitrary external referrer or trap a direct visit.
    if (document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1) {
      event.preventDefault();
      history.back();
    }
  });
});
