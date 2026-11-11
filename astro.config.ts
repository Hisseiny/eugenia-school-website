import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.eugeniaschool.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  integrations: [sitemap()],
  // Old URLs of eugeniaschool.com that the six new pages replace. Static hosts also need these
  // as real 301s (see public/_redirects).
  redirects: {
    "/trajectoires": "/carrieres",
    "/notre-adn": "/ecole",
    "/campus/paris": "/ecole#campus",
    "/vie-etudiante": "/ecole#vie",
    "/entrepreneuriat": "/ecole",
    "/approche-pedagogique": "/ecole#professeurs",
    "/methode-eugenia": "/ecole",
    "/processus-admission": "/admissions",
    "/faq": "/admissions#faq",
    "/programme/bachelor-ia-business": "/programmes#bachelor",
    "/programme/bachelor-ia-business-3eme-annee-alternance": "/programmes#bachelor",
    "/programme/master-ia-business-alternance": "/programmes#msc",
    "/entreprises-partenaires": "/entreprises",
    "/recruter-nos-etudiants": "/entreprises",
    "/projets-entreprises": "/entreprises#hackathons",
  },
  image: {
    // Hero/portrait crops come from the validated mockup; never upscale them.
    responsiveStyles: true,
  },
});
