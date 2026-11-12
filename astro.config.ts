import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const redirects = {
  "/trajectoires": "/carrieres",
} as const;
const redirectUrls = new Set(Object.keys(redirects).map((path) => new URL(path, "https://www.eugeniaschool.com").href));

export default defineConfig({
  site: "https://www.eugeniaschool.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404") && !redirectUrls.has(page) })],
  // Static hosts also need the remaining legacy redirect as a real 301 (see public/_redirects).
  redirects,
  image: {
    // Hero/portrait crops come from the validated mockup; never upscale them.
    responsiveStyles: true,
  },
});
