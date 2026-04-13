import { sanityClient } from "sanity:client";
import type { Post } from "./types";
import { type QueryParams } from "sanity";

const visualEditingEnabled = import.meta.env.PREVIEW === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  if (visualEditingEnabled && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.",
    );
  }

  const perspective = visualEditingEnabled ? "drafts" : "published";

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
      stega: visualEditingEnabled,
      ...(visualEditingEnabled ? { token } : {}),
      useCdn: !visualEditingEnabled,
    },
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}

export const getPosts = async (): Promise<Post[]> => {
  const result = await loadQuery<Post[]>({
    query:
      '*[_type == "post" && defined(slug.current)] | order(_createdAt desc)',
  });
  return result.data;
};

export const getPost = async (slug: string): Promise<Post> => {
  const result = await loadQuery<Post>({
    query: '*[_type == "post" && slug.current == $slug][0]',
    params: { slug },
  });
  return result.data;
};
