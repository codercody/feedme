"use client";

import Post from "@/components/post";
import { Spinner } from "flowbite-react";
import { PostT } from "@/lib/types/post";
import { Fetcher } from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { RecommenderT } from "@/lib/types/recommender";

export default function Feed({
  recommender,
  getKey,
  fetcher,
}: {
  recommender: RecommenderT;
  getKey: SWRInfiniteKeyLoader;
  fetcher: Fetcher<PostT[], string>;
}) {
  const { isLoading, error, data: posts } = useSWRInfinite(getKey, fetcher);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">Error loading feed.</p>
      ) : posts && posts.length > 0 ? (
        posts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <p>{recommender.name} No posts found.</p>
      )}
    </div>
  );
}
