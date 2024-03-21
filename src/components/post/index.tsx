import { Avatar, Button, Card } from "flowbite-react";
import {
  HiOutlineChatBubbleLeft,
  HiArrowPath,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi2";
import { PostT } from "@/lib/types/post";
import { useTimeline } from "@/lib/contexts/timeline";

const timeDeltaToString = (a: Date, b: Date) => {
  let diffMs = new Date(b).getTime() - new Date(a).getTime();
  if (diffMs < 1000) return "now";
  else if (diffMs < 60 * 1000) return `${Math.floor(diffMs / 1000)}s`;
  else if (diffMs < 60 * 60 * 1000)
    return `${Math.floor(diffMs / (60 * 1000))}m`;
  else if (diffMs < 24 * 60 * 60 * 1000)
    return `${Math.floor(diffMs / (60 * 60 * 1000))}h`;
  else if (diffMs < 30 * 24 * 60 * 60 * 1000)
    return `${Math.floor(diffMs / (24 * 60 * 60 * 1000))}d`;
  else if (diffMs < 12 * 30 * 24 * 60 * 60 * 1000)
    return `${Math.floor(diffMs / (30 * 24 * 60 * 60 * 1000))}mo`;
  else return `${Math.floor(diffMs / (365 * 24 * 60 * 60 * 1000))}y`;
};

export default function Post({
  post: { id, author, body, comments, shared, shares, liked, likes, timestamp },
}: {
  post: PostT;
}) {
  const { timelineCursor, setTimelineCursor } = useTimeline();

  return (
    <Card className="max-w mb-4" href={`/${author.fid}/${id}`}>
      <Avatar
        img={author.pfp}
        rounded
        theme={{
          root: { base: "flex items-center space-x-4 rounded" },
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="space-y-1 dark:text-white">
          <span className="font-bold hover:underline">
            {author.name || `fid: ${author.fid}`}
          </span>{" "}
          {author.fname && (
            <span className="hover:underline">@{author.fname}</span>
          )}{" "}
          ·{" "}
          <span className="hover:underline">
            {timeDeltaToString(timestamp, timelineCursor)}
          </span>
        </div>
      </Avatar>
      <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
      <div className="flex flex-wrap gap-2">
        <Button
          color="gray"
          className="enabled:hover:text-blue-500"
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={`/${author.fid}/${id}`}
        >
          <HiOutlineChatBubbleLeft className="mr-3 h-4 w-4" />
          {comments.toString()}
        </Button>
        <Button
          color={shared ? "gray-solid" : "gray"}
          theme={{
            color: {
              gray: "text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-green-500 :ring-green-500 dark:bg-transparent dark:border-gray-600 dark:enabled:hover:bg-gray-700 focus:ring-4",
              "gray-solid":
                "text-green-500 bg-white border border-gray-200 enabled:hover:bg-gray-100 :ring-green-500 dark:bg-transparent dark:border-gray-600 dark:enabled:hover:bg-gray-700 focus:ring-4",
            },
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          disabled
        >
          <HiArrowPath className="mr-3 h-4 w-4" />
          {shares.toString()}
        </Button>
        <Button
          color={liked ? "gray-solid" : "gray"}
          theme={{
            color: {
              gray: "text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-red-500 :ring-red-500 dark:bg-transparent dark:border-gray-600 dark:enabled:hover:bg-gray-700 focus:ring-4",
              "gray-solid":
                "text-red-500 bg-white border border-gray-200 enabled:hover:bg-gray-100 :ring-red-500 dark:bg-transparent dark:border-gray-600 dark:enabled:hover:bg-gray-700 focus:ring-4",
            },
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          disabled
        >
          {liked ? (
            <HiHeart className="mr-3 h-4 w-4" />
          ) : (
            <HiOutlineHeart className="mr-3 h-4 w-4" />
          )}
          {likes.toString()}
        </Button>
      </div>
    </Card>
  );
}
