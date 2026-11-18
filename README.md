# Eugenia School website

Premium redesign of [eugeniaschool.com](https://www.eugeniaschool.com), rebuilt from the validated
mockup (six pages) as a fully static [Astro](https://astro.build) site.

## Stack

- Astro 7 (static output), TypeScript strict, pnpm, pinned versions.
- Fonts: Sora and Work Sans, self-hosted via `@fontsource`.
- Images: WebP with `srcset`, generated at build time from `src/assets/images`.
- Formulaires : visibles mais désactivés par défaut sur la démo (aucun script ni envoi HubSpot).
- No framework on the client: the carousel, the accordion and the mobile menu are a few lines of
  plain TypeScript, and every page reads without JavaScript.

## Commands

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # astro check (TypeScript + templates)
pnpm build      # static site in dist/
pnpm preview    # serve dist/
pnpm test       # node:test checks on dist/ (one h1, meta, forbidden fonts, forms, schema...)
node scripts/screenshot.mjs http://127.0.0.1:4321 1440 375   # full-page screenshots
```

## Sécurité des formulaires de démo

Un build standard (`pnpm build`) ne charge aucun script HubSpot et n'envoie aucune
demande aux admissions. Les formulaires restent visibles ; une tentative d'envoi
affiche « Formulaire désactivé sur la démo ». Sans JavaScript, leur méthode
`dialog` empêche aussi tout envoi natif.

La réactivation exige **exactement** `PUBLIC_ENABLE_HUBSPOT_FORMS=true` au build :

```sh
PUBLIC_ENABLE_HUBSPOT_FORMS=true pnpm build
```

Attention : cette option réactive les **vrais formulaires de l'école**, avec les
mêmes identifiants de portail et de formulaire. Ne jamais l'activer sur le
déploiement de démonstration ou pour les tests de l'agent H. Toute autre valeur
(ou l'absence de variable) laisse les envois désactivés. Après un changement,
reconstruire et redéployer les fichiers statiques ; une variable au runtime
ne peut pas réactiver un build de démo.

`pnpm test` vérifie que `dist/` est sûr pour la démo : lancer les tests après
un build **sans** cette variable.

## Structure

```
src/
  layouts/Base.astro       <head>, SEO, JSON-LD, header, footer, skip link
  components/              Header, Footer, Pic (ratio-safe image), Logo, LogoMarquee,
                           Testimonials (carousel), PageTop, EndOfPage, ContinueVisit,
                           HubspotForm, FormPage
  pages/                   index, programmes, carrieres, ecole, admissions, entreprises
                           + brochure, candidature, evenements, contact (forms)
  data/                    all texts and lists of the mockup, as typed data
  styles/global.css        design tokens and shared classes
  scripts/                 carousel.ts, accordion.ts
public/_redirects          301s for the old URLs (also in astro.config.ts)
```

## Design rules (from the brief)

Colours are limited to the Eugenia tokens in `src/styles/global.css`. Every photo keeps the ratio
of its file (`Pic` reads it from the image metadata) and never zooms. One red button per screen.
Motion is limited to the page-top entrance, button press and the slow logo scroll, all disabled
with `prefers-reduced-motion`.
