# Eugenia School website

Premium redesign of [eugeniaschool.com](https://www.eugeniaschool.com), rebuilt from the validated
mockup (six pages) as a fully static [Astro](https://astro.build) site.

## Stack

- Astro 7 (static output), TypeScript strict, pnpm, pinned versions.
- Fonts: Sora and Work Sans, self-hosted via `@fontsource`.
- Images: WebP with `srcset`, generated at build time from `src/assets/images`.
- Forms: local demos for applications, brochures, events, contact and recruiters. Submitting validates the answers and displays a confirmation without sending data.
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

Les formulaires valident les réponses et affichent une confirmation locale,
sans transmettre de données. Sans JavaScript, leur méthode `dialog` empêche
aussi tout envoi natif.

### Bac à sable des formulaires (Preview uniquement)

Définir au build `PUBLIC_SANDBOX_FORM_ENDPOINT` (URL http(s) de la fausse base)
et `PUBLIC_SANDBOX_HOSTS` (hôtes exacts séparés par des virgules, sans protocole ni port).
Exemple local : `PUBLIC_SANDBOX_FORM_ENDPOINT=http://127.0.0.1:3100/formulaires PUBLIC_SANDBOX_HOSTS=127.0.0.1 pnpm build`.
Sur Vercel, poser ces variables **seulement dans Preview, jamais dans Production**.
Reconstruire après modification. Sans les deux variables, ou sur un hôte hors liste,
aucune réponse n’est envoyée. Le domaine eugeniaschool.com et ses sous-domaines
sont refusés au build. Utiliser uniquement des données de test ; le bandeau indique
l’envoi vers la base de test. Une erreur permet de réessayer sans afficher de succès.

### Traçage également désactivé par défaut

Aucun script de mesure d'audience, préchargement de domaine de traçage ni iframe
GTM (y compris sans JavaScript) n'est ajouté par défaut. La réactivation exige
**exactement** `PUBLIC_ENABLE_ANALYTICS=true` au build :

```sh
PUBLIC_ENABLE_ANALYTICS=true pnpm build
```

Cette option réactive le vrai GTM et GA de l'école, et les traceurs qu'ils chargent
(notamment HubSpot et Facebook). Ne jamais l'activer sur la démo ou les
prévisualisations destinées à l'agent H. Toute autre valeur que `true` (ou
l'absence de la variable) laisse le traçage désactivé.
Reconstruire puis redéployer après tout changement ; `pnpm test` vérifie aussi
l'absence des domaines et identifiants de traçage dans les artefacts par défaut.

## Structure

```
src/
  layouts/Base.astro       <head>, SEO, JSON-LD, header, footer, skip link
  components/              Header, Footer, Pic (ratio-safe image), Logo, LogoMarquee,
                           Testimonials (carousel), PageTop, EndOfPage, ContinueVisit,
                           PremiumForm, FormPage
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
