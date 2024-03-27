"use server";

import { type NextRequest } from "next/server";
import { getRecommender } from "@/lib/recommenders";
import computePrecision from "@/lib/evaluation/precision";

export async function GET(
  req: NextRequest,
  { params }: { params: { recId: string } }
) {
  const recommender = getRecommender(params.recId);
  if (!recommender) return Response.json([]);

  const searchParams = req.nextUrl.searchParams;

  const precision = await computePrecision(recommender);

  return Response.json(precision);
}
