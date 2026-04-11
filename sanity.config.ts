// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "sanity-astro",
  title: "Sanity-Astro",
  projectId: "8vxvg7qt",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [
      /* your content types here*/
    ],
  },
});
