# Points à confirmer par l'école

- **Date de fondation** — le JSON-LD du site en ligne indique 2024, tandis que les textes de `/` et `/ecole` indiquaient « fondée en 2023 ». La date a été retirée de `src/pages/index.astro` et `src/pages/ecole.astro` et n'est pas ajoutée aux données structurées tant que l'école ne l'a pas confirmée.
- **Financement des formations** — la réponse de la FAQ est conservée dans `src/data/admissions.ts` (`FAQ`, question « Comment financer ma formation ? »), mais elle est exclue de l'accordéon, des données FAQ et des fichiers llms jusqu'à confirmation.
- **Titre du Bachelor** — `src/data/programmes.ts` (`COMPARE_ROWS`, ligne « Titre », cellule `bachelor`) reste à confirmer ; la page affiche « — » à la place.
- **Frais de scolarité** — aucun montant n'est publié dans les données ou pages actuelles ; ne pas en ajouter avant validation.
- **Option « Entreprise / non concerné » du formulaire de contact** — `src/data/forms.ts` propose actuellement « Entreprise » (`All.Corporate`) mais pas de choix distinct « non concerné » ; confirmer la valeur et les champs HubSpot attendus avant modification.
- **Profils officiels pour `sameAs`** — vérifier l'existence des profils officiels TikTok et Wikidata avant tout ajout à `src/data/site.ts`.
- **Consentement aux cookies et traceurs** — cette version reprend les analytics du site en ligne, qui charge GTM/GA4 sans bannière de consentement. L'école doit confirmer sa décision au regard des recommandations de la CNIL avant publication.
- **Images Open Graph par page** — les pages utilisent actuellement l'image par défaut issue du visuel du hero de l'accueil. Définir des images dédiées par page si l'école le souhaite.
