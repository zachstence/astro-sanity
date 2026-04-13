// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postSchema } from "./schema/post";
import { presentationTool } from "sanity/presentation";

export default defineConfig({
  name: "sanity-astro",
  title: "Sanity-Astro",
  projectId: "8vxvg7qt",
  dataset: "production",
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {},
    }),
  ],
  schema: {
    types: [postSchema],
  },
});
