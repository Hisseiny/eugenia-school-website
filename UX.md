# UX — the parent / future-student journey, and why each element exists

Two audiences read this site with different fears. The future student wants to *see themselves*
there (identity, concreteness, autonomy); the parent wants *guarantees* before a choice that
engages money and years (recognition, cost, follow-up, a human to talk to). Every element below
is tied to a documented principle; no fact was invented — all texts reuse the validated mockup,
the FAQ copied from the current site, and the public contact details of eugeniaschool.com.

| Where | What | Principle (source) |
|---|---|---|
| Home, after the entry doors | Two cards only — « Futur étudiant » (tu) and « Parent » (vous) — each with three concrete points and one primary action | Hick's law: fewer choices, faster decisions (NN/g). Self-reference / identity: people engage with content addressed to *them* (Cialdini, *Pre-Suasion*). Register switch (tu / vous) signals the right reader. |
| Home, parent card | Calm mist background, no red button; the primary action is « Ce qui doit vous rassurer » | Anxiety reduction: parents are in evaluation mode, not action mode; a sales CTA raises reactance (Brehm). |
| Admissions, steps | « Ensuite » under each step: what happens next, in how long (10 days), what is needed (grades can come later), what the interview contains | Uncertainty is the main abandonment driver in multi-step processes; stating the next step and its duration raises completion (NN/g, *progress & expectations*; Kahneman: known duration lowers perceived effort). |
| Admissions, parents block | The four guarantees, then « Vos questions, nos réponses » (deep links to the FAQ: cost, financing, Parcoursup, results, requirements), then « Parler à l'équipe admission » (e-mail, phone) and the brochure | Authority & transparency (certifications, prices stated up front: Cialdini, *authority*; NN/g on trust: show costs, show people). Reciprocity & low commitment (free brochure, Cialdini). Deep links keep one source of truth instead of a duplicated FAQ. |
| FAQ deep links | `#faq-q-N` opens that answer and focuses the question | Recognition over recall; the reader lands exactly where the parents block sent them (NN/g heuristic 6). |
| Form pages | « Ce qui se passe ensuite » (3 ticks) above the form: no commitment, what you receive, who answers and how | Peak-end rule: the last step of the journey must reassure (Kahneman); explicit outcome lowers form abandonment (Baymard). |
| Form fallback | If the HubSpot embed is blocked, a human contact replaces the empty box | Never a dead end (NN/g error-recovery heuristic 9). |
| Everywhere | Tutoiement for students, vouvoiement for parents; numbers (0 €, 4 étapes, 10 jours) in tabular digits | Consistency and predictability (NN/g heuristic 4); concrete numbers beat adjectives (Heath, *Made to Stick*). |

Out of scope on purpose (no verified facts): parent testimonials, salary figures, success rates,
response time of the admissions team, scholarship details beyond the FAQ line already flagged
« [À confirmer par l'école] ».

## Parcours parent (v2)

| Élément | Où | Principe | Source |
| --- | --- | --- | --- |
| Page `/parents` entièrement au « vous » (garanties, alumni, étapes, coût/conditions, contact) | `src/pages/parents.astro` | Cohérence de ton : le parent reste dans une zone écrite pour lui ; mode « évaluation » → un seul bouton rouge, en fin de page, pour éviter la réactance | NN/g (tone of voice), Brehm (réactance psychologique) |
| Faits uniquement issus des données validées ; la réponse « financement » marquée « [À confirmer » est exclue au build | `PARENTS_FAQ_IDS`, filtre dans `parents.astro`, test `html.test.mjs` | Transparence : on montre ce qui est vérifié, jamais de placeholder | Cialdini (autorité, cohérence) |
| Trois actions par engagement croissant (brochure → portes ouvertes → question) | fin de `/parents` | Micro-engagements, pied dans la porte | Freedman & Fraser |
| « Partager avec mes parents » (accueil, Programmes, Carrières) / « Envoyer à mon enfant » (`/parents`) | `ShareLink.astro`, `share.ts` | La décision se prend à deux : on facilite la conversation ; partage natif → copie + toast → `mailto:` sans JS | Progressive enhancement |
| Formulaires : Parent choisi → questions suivantes et confirmation au « vous », `?pour=parent` pré-sélectionne, note « la candidature se fait au nom de votre enfant » sans bloquer | `forms.ts` (`titleParent`, `doneParent`, `parentNote`), `premium-form.ts` | Reconnaissance plutôt que rappel ; pas de friction ajoutée | NN/g heuristics #6 |
| Carrières avec `?pour=parent` → « Continuer la visite » ramène à `/parents` | `carrieres.astro` | Parcours guidé cohérent, logique conditionnelle minimale et progressive | — |
| Événements `audience_card_click`, `share_to_parent`, `share_to_student`, `parents_page_view`, `form_who_parent` poussés dans `window.dataLayer` | `track.ts` | Mesurer sans tracker : aucun conteneur GTM dans ce dépôt (le site actuel charge GTM-KH6RQW8 + GA4) ; à brancher avec un bandeau de consentement | CNIL |
