// @ts-check
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { loadEnv } from "vite";

const { PREVIEW } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: PREVIEW ? "server" : "static",
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId: "8vxvg7qt",
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: PREVIEW ? "/admin" : undefined,
    }),
    PREVIEW ? react() : undefined,
  ],
});
