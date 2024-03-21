"use server";

import { type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { casts } from "@prisma/client";
import { PostT } from "@/lib/types/post";
import getCast from "@/app/api/casts";

const parseCast = (cast: casts): PostT => ({
  id: cast.id.toString(),
  author: {
    fid: cast.fid.toString(),
    fname: "???",
    name: "???",
  },
  body: cast.text,
  comments: 1337,
  shared: false,
  shares: 420,
  liked: false,
  likes: 69,
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const per_page = searchParams.get("per_page");
  const page = searchParams.get("page");
  /*const userFid = searchParams.get("fid")
    ? Number(searchParams.get("fid"))
    : null;*/
  const userFid = Number(197277);
  const cursor = new Date(searchParams.get("cursor") || "");

  /*let targetFids = null;
  if (userFid != null) {
    const links = await prisma.links.findMany({
      where: {
        fid: userFid,
        target_fid: { not: null },
        deleted_at: null,
      },
      select: {
        target_fid: true,
      },
    });

    targetFids = [
      ...(links.map((link) => link.target_fid) as bigint[]),
      BigInt(userFid),
    ];
  }*/

  /*const data = await prisma.casts.findMany({
    where: {
      fid: 3,
      timestamp: {
        lte: cursor,
      },
    },
    select: {
      fid: true,
      timestamp: true,
      text: true,
    },
    take: 5,
    orderBy: {
      timestamp: "desc",
    },
  });*/

  const casts = await prisma.casts.findMany({
    where: {
      fid: 197277,
    },
    take: 10,
  });

  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return Response.json(posts);
}
