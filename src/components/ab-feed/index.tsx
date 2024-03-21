"use client";

import Feed from "@/components/feed";
import { useAB } from "@/lib/contexts/ab";

export default function ABFeed({
  title,
  apiEndpoint,
  options = "",
}: {
  title: string;
  apiEndpoint: string;
  options: string;
}) {
  const { a, b } = useAB();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="sm:flex gap-4">
        <div className="flex-1">
          <Feed recommender={a} apiEndpoint={apiEndpoint} options={options} />
        </div>
        <div className="flex-1">
          <Feed recommender={b} apiEndpoint={apiEndpoint} options={options} />
        </div>
      </div>
    </div>
  );
}
