import { sanityClient } from "sanity:client";
import type { Post } from "./types";

export const getPosts = async (): Promise<Post[]> => {
  return sanityClient.fetch<Post[]>(
    '*[_type == "post" && defined(slug.current)] | order(_createdAt desc)',
  );
};

export const getPost = (slug: string): Promise<Post> => {
  return sanityClient.fetch<Post>(
    '*[_type == "post" && slug.current == $slug][0]',
    { slug },
  );
};
