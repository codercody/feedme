"use server";

import { type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import getCast from "@/app/api/casts";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const per_page = Number(searchParams.get("per_page"));
  const page = Number(searchParams.get("page"));
  /*const userFid = searchParams.get("fid")
    ? Number(searchParams.get("fid"))
    : null;*/
  const userFid = BigInt(197277);
  const cursor = new Date(searchParams.get("cursor") || "");

  const casts = await prisma.casts.findMany({
    where: {
      timestamp: {
        lte: cursor,
      },
    },
    take: per_page,
    skip: (page - 1) * per_page,
    orderBy: {
      timestamp: "desc",
    },
  });

  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return Response.json(posts);
}
