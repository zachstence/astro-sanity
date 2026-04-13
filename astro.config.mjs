// @ts-check
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import { loadEnv } from "vite";

const { PREVIEW: PREVIEW_ENV } = loadEnv(
  process.env.NODE_ENV ?? "",
  process.cwd(),
  "",
);
const PREVIEW = PREVIEW_ENV === "true";

// https://astro.build/config
export default defineConfig({
  output: PREVIEW ? "server" : "static",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    sanity({
      projectId: "8vxvg7qt",
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: PREVIEW ? "/admin" : undefined,
      stega: {
        enabled: PREVIEW,
        studioUrl: "/admin",
      },
    }),
    PREVIEW ? react() : undefined,
  ],
  vite: {
    optimizeDeps: {
      // Fixed for similar issue for Nuxt sanity: https://github.com/sanity-io/sanity/issues/7379#issuecomment-2914410299
      include: [
        "lodash/isObject.js",
        "react/compiler-runtime",
        "lodash/groupBy.js",
        "@sanity/astro/visual-editing",
      ],
    },
  },
});
