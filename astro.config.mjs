// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static-first marketing site. Individual server routes (e.g. /api/waitlist)
// opt into on-demand rendering with `export const prerender = false`, which the
// Vercel adapter serves as a serverless function.
export default defineConfig({
  site: "https://conan.sh",
  output: "static",
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
