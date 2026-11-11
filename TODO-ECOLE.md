# Points à confirmer par l'école

- **Date de fondation** — le JSON-LD du site en ligne indique 2024, tandis que les textes de `/` et `/ecole` indiquaient « fondée en 2023 ». La date a été retirée de `src/pages/index.astro` et `src/pages/ecole.astro` et n'est pas ajoutée aux données structurées tant que l'école ne l'a pas confirmée.
- **Option « Entreprise / non concerné » du formulaire de contact** — `src/data/forms.ts` propose actuellement « Entreprise » (`All.Corporate`) mais pas de choix distinct « non concerné » ; confirmer la valeur et les champs HubSpot attendus avant modification.
- **Profils officiels pour `sameAs`** — vérifier l'existence des profils officiels TikTok et Wikidata avant tout ajout à `src/data/site.ts`.
- **Consentement aux cookies et traceurs** — cette version reprend les analytics du site en ligne, qui charge GTM/GA4 sans bannière de consentement. L'école doit confirmer sa décision au regard des recommandations de la CNIL avant publication.
- **Images Open Graph par page** — les pages utilisent actuellement l'image par défaut issue du visuel du hero de l'accueil. Définir des images dédiées par page si l'école le souhaite.
- Crédits ECTS du Bachelor : la page live affiche B3 S1 36 ECTS + S2 45 ECTS (81), soit 201 ECTS sur 3 ans, alors qu'elle annonce 180 ECTS. Reproduit à l'identique ; à corriger par l'école.
