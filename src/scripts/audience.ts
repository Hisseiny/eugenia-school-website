import { track } from "@/scripts/track";

function setAudience(root: HTMLElement, audience: "student" | "parent", record = false): void {
  root.querySelectorAll<HTMLElement>("[data-audience]").forEach((content) => {
    content.hidden = content.dataset.audience !== audience;
  });
  root.querySelectorAll<HTMLButtonElement>("[data-audience-select]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.audienceSelect === audience));
  });
  if (record) track("audience_toggle", { audience });
}

document.querySelectorAll<HTMLElement>("[data-audience-root]").forEach((root) => {
  const initial = new URLSearchParams(window.location.search).get("pour") === "parent" ? "parent" : "student";
  setAudience(root, initial);
  root.querySelectorAll<HTMLButtonElement>("[data-audience-select]").forEach((button) => {
    button.addEventListener("click", () => {
      const audience = button.dataset.audienceSelect;
      if (audience === "student" || audience === "parent") setAudience(root, audience, true);
    });
  });
});
