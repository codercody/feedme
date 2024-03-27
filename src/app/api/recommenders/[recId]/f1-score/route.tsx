"use server";

import { type NextRequest } from "next/server";
import { getRecommender } from "@/lib/recommenders";
import computeF1Score from "@/lib/evaluation/f1-score";

export async function GET(
  req: NextRequest,
  { params }: { params: { recId: string } }
) {
  const recommender = getRecommender(params.recId);
  if (!recommender) return Response.json([]);

  const searchParams = req.nextUrl.searchParams;

  const f1Score = await computeF1Score(recommender);

  return Response.json(f1Score);
}
