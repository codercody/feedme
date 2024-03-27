"use client";

import Post from "@/components/post";
import { Button, Spinner } from "flowbite-react";
import useSWRInfinite from "swr/infinite";
import { RecommenderT } from "@/lib/recommenders";
import { useTimeline } from "@/lib/contexts/timeline";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 6;

export default function Feed({
  recommender,
  apiEndpoint,
  options = "",
}: {
  recommender: RecommenderT;
  apiEndpoint: string;
  options: string;
}) {
  const { timelineCursor, setTimelineCursor } = useTimeline();

  const { isLoading, error, size, setSize, data } = useSWRInfinite(
    (index) =>
      `/api/recommenders/${
        recommender.id
      }/${apiEndpoint}?per_page=${PAGE_SIZE}&page=${
        index + 1
      }&cursor=${timelineCursor.toISOString()}${options}`,
    fetcher
  );

  const posts = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return (
    <div>
      {error ? (
        <p className="text-red-500 mb-4">Error loading feed.</p>
      ) : (
        <>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
          {isLoadingMore && <Spinner className="mx-auto mb-4 block" />}
          {isEmpty && <p className="mb-4">No posts found.</p>}
          <Button
            className="mx-auto mb-4"
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            Load more...
          </Button>
        </>
      )}
    </div>
  );
}
