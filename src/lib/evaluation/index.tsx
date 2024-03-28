import { RecommenderT } from "@/lib/recommenders";
import {
  TEST_FIDS,
  K,
  TOTAL_NUM_RELEVANT,
  NUM_RELEVANT_A,
  NUM_RELEVANT_B,
} from "./test-set";

async function getNumRelevant(recommender: RecommenderT, fid: bigint) {
  if (recommender.id == "a") return NUM_RELEVANT_A.get(Number(fid));
  else if (recommender.id == "b") return NUM_RELEVANT_B.get(Number(fid));
}

async function getTotalRelevant(recommender: RecommenderT) {
  return TOTAL_NUM_RELEVANT;
}

export async function computePrecision(recommender: RecommenderT) {
  const allPrecisions = await Promise.all(
    TEST_FIDS.map((fid) =>
      getNumRelevant(recommender, fid).then((numRelevant) =>
        numRelevant ? [numRelevant / K] : []
      )
    )
  );

  const validPrecisions = allPrecisions.flat();

  const avgPrecision =
    validPrecisions.reduce((x, y) => x + y, 0) / validPrecisions.length;

  return avgPrecision;
}

export async function computeRecall(recommender: RecommenderT) {
  const totalRelevant = await getTotalRelevant(recommender);

  const allRecalls = await Promise.all(
    TEST_FIDS.map((fid) =>
      getNumRelevant(recommender, fid).then((numRelevant) =>
        numRelevant ? [numRelevant / totalRelevant] : []
      )
    )
  );

  const validRecalls = allRecalls.flat();

  const avgRecall =
    validRecalls.reduce((x, y) => x + y, 0) / validRecalls.length;

  return avgRecall;
}

export async function computeF1Score(recommender: RecommenderT) {
  const totalRelevant = await getTotalRelevant(recommender);

  const allF1s = await Promise.all(
    TEST_FIDS.map((fid) =>
      getNumRelevant(recommender, fid).then((numRelevant) =>
        numRelevant ? [(2 * numRelevant) / (K + totalRelevant)] : []
      )
    )
  );

  const validF1s = allF1s.flat();

  const avgF1 = validF1s.reduce((x, y) => x + y, 0) / validF1s.length;

  return avgF1;
}
