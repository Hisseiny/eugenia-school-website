/** Share bridge: navigator.share → clipboard + toast → (no JS) the mailto link stays. */
import { track } from "@/scripts/track";

document.querySelectorAll<HTMLElement>("[data-share]").forEach((root) => {
  const btn = root.querySelector<HTMLAnchorElement>("[data-share-btn]")!;
  const toast = root.querySelector<HTMLElement>("[data-share-toast]")!;
  const { shareUrl = "", shareTitle = "", shareText = "", shareEvent = "share" } = root.dataset;
  btn.addEventListener("click", async (e) => {
    if (navigator.share) {
      e.preventDefault();
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        track(shareEvent, { method: "native" });
      } catch {
        /* the person closed the sheet */
      }
      return;
    }
    if (navigator.clipboard) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.hidden = false;
        window.setTimeout(() => (toast.hidden = true), 2400);
        track(shareEvent, { method: "copy" });
      } catch {
        location.href = btn.href;
      }
    }
  });
});
