/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PREVIEW?: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
