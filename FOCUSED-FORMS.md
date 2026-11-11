# Focused admission journeys

Follow-up to the accessibility/recovery changes in PR #4. Covers candidature, brochure,
event registration and contact, without changing the public HubSpot destinations or field values.

## Interaction choices

- Pointer/touch selection advances immediately; native radio arrow keys do not. Enter or
  Continue confirms a keyboard selection. The question receives focus after a step change.
- Questions remain visible without JS, with the existing public-contact fallback.
- Contact validation occurs on blur and explicit navigation/submission, never at each keystroke.
  Blur validation is deferred when clicking navigation to avoid moving the button under the pointer.
- Answers are kept in sessionStorage, scoped to this form and tab, for up to 12 hours. An explicit
  clear action and successful submission remove them. Storage failure does not block submission.
- Phone spacing is presentation-only for French national numbers. The original ten digits are sent.
- Only known email typo domains are suggested, and correction always requires an explicit click.
- Funnel events contain the form kind, step and field name, never answers or contact details.
  This change does not install analytics or change the consent implementation.

## Content and deliberate safeguards

- Portraits, descriptions and employer credit come from src/data/carrieres.ts. Descriptions
  are not presented as direct quotations. General campus and programme copy uses existing data.
- The live /candidature page was read during implementation: it mentions ten-day eligibility
  and decision responses, but not later submission of missing grades. The latter is not rendered.
- A read-only browser inspection of the live candidature HubSpot embed found no
  .legal-consent-container text. No consent sentence or consent checkbox was invented.
  The existing public privacy-policy link remains. Have the school confirm its legal copy.
- The confirmation checks **request transmitted**, not **complete application submitted**.
  The remaining admission stages come from STEPS; a real dossier and account creation are
  not inferred from a successful public Forms API response.
- Brand red #e33054 is limited to the focused form's submit action. Its white text is 19px/700
  (large text under WCAG AA). Other controls use plum. The photo caption has a solid-enough
  plum backing in addition to the gradient, so readability does not depend on the photograph.
- The next event date comes from existing form options and is hidden at build time after
  its known date. Static deployments need rebuilding when event content changes.

## Verification commands

```
node node_modules/astro/bin/astro.mjs check
node node_modules/astro/bin/astro.mjs build
node --test
node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4322 --ignore-lock
# Separate terminal, using a compatible local Chromium executable:
CHROME_PATH=/path/to/chromium node scripts/check-premium-forms.mjs
CHROME_PATH=/path/to/chromium node scripts/check-focus-flow.mjs
```

Both browser scripts intercept external traffic; no contact is created in the live CRM.
The focus-flow script verifies the unchanged candidature payload, three-click progression,
contextual images, email correction, reload/restore, draft removal, and analytics without PII.
It also writes preview captures under attached_assets/eugenia-preview outside this repository.

Do not equate a stubbed successful submission with verified HubSpot workflow/email delivery.
Do not claim the Lighthouse acceptance threshold until a completed measurement is available.
