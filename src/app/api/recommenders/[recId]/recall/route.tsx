"use server";

import { type NextRequest } from "next/server";
import { getRecommender } from "@/lib/recommenders";
import computeRecall from "@/lib/evaluation/recall";

export async function GET(
  req: NextRequest,
  { params }: { params: { recId: string } }
) {
  const recommender = getRecommender(params.recId);
  if (!recommender) return Response.json([]);

  const searchParams = req.nextUrl.searchParams;

  const recall = await computeRecall(recommender);

  return Response.json(recall);
}
