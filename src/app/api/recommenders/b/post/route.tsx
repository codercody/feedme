"use server";

import { type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import getCast from "@/app/api/casts";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const author = searchParams.get("author");
  const id = searchParams.get("id");
  const per_page = Number(searchParams.get("per_page"));
  const page = Number(searchParams.get("page"));
  /*const userFid = searchParams.get("fid")
    ? Number(searchParams.get("fid"))
    : null;*/
  const userFid = BigInt(197277);
  const cursor = new Date(searchParams.get("cursor") || "");

  const root = await prisma.casts.findUnique({
    where: {
      id,
    },
  });

  const casts = await prisma.casts.findMany({
    where: {
      parent_hash: root?.hash,
    },
    take: per_page,
    skip: (page - 1) * per_page,
    orderBy: {
      timestamp: "desc",
    },
  });

  const rootPost = await getCast(root, userFid);
  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return Response.json([rootPost, ...posts]);
}
