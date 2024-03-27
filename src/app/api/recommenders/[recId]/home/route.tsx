"use server";

import { type NextRequest } from "next/server";
import { getRecommender } from "@/lib/recommenders";

export async function GET(
  req: NextRequest,
  { params }: { params: { recId: string } }
) {
  const recommender = getRecommender(params.recId);
  if (!recommender) return Response.json([]);

  const searchParams = req.nextUrl.searchParams;

  const cursor = new Date(searchParams.get("cursor") || "");
  const userFid = BigInt(197277);
  const page = Number(searchParams.get("page"));
  const perPage = Number(searchParams.get("per_page"));
  const options = { cursor, userFid, page, perPage };

  const posts = await recommender.getHome(options);

  return Response.json(posts);
}
