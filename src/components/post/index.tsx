"use client";

import { useState } from "react";
import { Avatar, Button, Card } from "flowbite-react";
import Link from "next/link";
import {
  HiOutlineChatBubbleLeft,
  HiArrowPath,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi2";
import { PostT } from "@/lib/types/post";

export default function Post({
  post: {
    author,
    id,
    body,
    comments: initialComments,
    shared: initialShared,
    shares: initialShares,
    liked: initialLiked,
    likes: initialLikes,
  },
}: {
  post: PostT;
}) {
  const [comments, setComments] = useState(initialComments);
  const [shared, setShared] = useState(initialShared);
  const [shares, setShares] = useState(initialShares);
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const toggleShared = () => {
    if (shared) {
      setShared(false);
      setShares(shares - 1);
    } else {
      setShared(true);
      setShares(shares + 1);
    }
  };

  const toggleLiked = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <Card className="max-w mb-4" href={`/${author}/${id}`}>
      <Avatar
        img="https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_jpg,w_144/https%3A%2F%2Fi.imgur.com%2FIzJxuId.jpg"
        rounded
        theme={{
          root: { base: "flex items-center space-x-4 rounded" },
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          alert("&hai&");
        }}
      >
        <div className="space-y-1 dark:text-white">
          <span className="font-bold hover:underline">Vitalik Buterin</span>{" "}
          <span className="hover:underline">@vitalik.eth</span> ·{" "}
          <span className="hover:underline">23h</span>
        </div>
      </Avatar>
      <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
      <div className="flex flex-wrap gap-2">
        <Button
          color="gray"
          className="enabled:hover:text-blue-500"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <HiOutlineChatBubbleLeft className="mr-3 h-4 w-4" />
          {comments}
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
            toggleShared();
          }}
        >
          <HiArrowPath className="mr-3 h-4 w-4" />
          {shares}
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
            toggleLiked();
          }}
        >
          {liked ? (
            <HiHeart className="mr-3 h-4 w-4" />
          ) : (
            <HiOutlineHeart className="mr-3 h-4 w-4" />
          )}
          {likes}
        </Button>
      </div>
    </Card>
  );
}
