"use server";

import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const data = await prisma.casts.findMany({
    where: {
      fid: 3,
    },
    select: {
      fid: true,
      messages: true,
      timestamp: true,
      text: true,
    },
    take: 10,
    orderBy: {
      timestamp: "desc",
    },
  });

  const resp = [
    {
      author: "vitalik.eth",
      id: "0x9b8aeab6",
      body: "Convex mindset be like: So you say that it's HEALTHY to drink WATER? Well, if you take that idea to its LOGICAL CONCLUSION, you end up essentially advocating for people to put a GARDEN HOSE down their throats and pour WATER in until they're DEAD. So maybe this WATER thing ISN'T SO WISE AFTER ALL.",
      comments: 123,
      shared: false,
      shares: 456,
      liked: false,
      likes: 789,
    },
    {
      author: "vitalik.eth",
      id: "0x9b8aeab6",
      body: "Convex mindset be like: So you say that it's HEALTHY to drink WATER? Well, if you take that idea to its LOGICAL CONCLUSION, you end up essentially advocating for people to put a GARDEN HOSE down their throats and pour WATER in until they're DEAD. So maybe this WATER thing ISN'T SO WISE AFTER ALL.",
      comments: 123,
      shared: false,
      shares: 456,
      liked: false,
      likes: 789,
    },
    {
      author: "vitalik.eth",
      id: "0x9b8aeab6",
      body: "Convex mindset be like: So you say that it's HEALTHY to drink WATER? Well, if you take that idea to its LOGICAL CONCLUSION, you end up essentially advocating for people to put a GARDEN HOSE down their throats and pour WATER in until they're DEAD. So maybe this WATER thing ISN'T SO WISE AFTER ALL.",
      comments: 123,
      shared: false,
      shares: 456,
      liked: false,
      likes: 789,
    },
  ];

  /*return new Response(
    data.map((cast) => `${cast.fid} ${cast.timestamp} ${cast.text}`),
    { status: 200 }
  );*/
  return new Response(JSON.stringify(resp), { status: 200 });
}
