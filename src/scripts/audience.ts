import { track } from "@/scripts/track";

const parentContextPaths = new Set(["/candidature", "/brochure", "/evenements", "/contact"]);

function audienceHref(href: string, audience: "student" | "parent"): string {
  if (audience !== "parent") return href;
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin || !parentContextPaths.has(url.pathname)) return href;
  url.searchParams.set("pour", "parent");
  return `${url.pathname}${url.search}${url.hash}`;
}

function setAudience(root: HTMLElement, audience: "student" | "parent", record = false): void {
  root.querySelectorAll<HTMLElement>("[data-audience]").forEach((content) => {
    content.hidden = content.dataset.audience !== audience;
  });
  const cta = root.querySelector<HTMLAnchorElement>("[data-audience-cta]");
  const href = audience === "parent" ? cta?.dataset.audienceParentHref : cta?.dataset.audienceStudentHref;
  if (cta && href) cta.setAttribute("href", audienceHref(href, audience));
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
