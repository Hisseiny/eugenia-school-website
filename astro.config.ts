import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const redirects = {
  "/trajectoires": "/carrieres",
  "/notre-adn": "/ecole",
  "/campus/paris": "/ecole#campus",
  "/vie-etudiante": "/ecole#vie",
  "/entrepreneuriat": "/ecole",
  "/approche-pedagogique": "/ecole#professeurs",
  "/methode-eugenia": "/ecole",
  "/entreprises-partenaires": "/entreprises",
  "/recruter-nos-etudiants": "/entreprises",
  "/projets-entreprises": "/entreprises#hackathons",
} as const;
const redirectUrls = new Set(Object.keys(redirects).map((path) => new URL(path, "https://www.eugeniaschool.com").href));

export default defineConfig({
  site: "https://www.eugeniaschool.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404") && !redirectUrls.has(page) })],
  // Old URLs of eugeniaschool.com that the six new pages replace. Static hosts also need these
  // as real 301s (see public/_redirects).
  redirects,
  image: {
    // Hero/portrait crops come from the validated mockup; never upscale them.
    responsiveStyles: true,
  },
});
