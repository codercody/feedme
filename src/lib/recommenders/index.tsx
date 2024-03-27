import { RecommenderT } from "./base";
import { A } from "./a";
import { B } from "./b";

export type { RecommenderT };

export const recommenders: RecommenderT[] = [A, B];

export const getRecommender = (id: string) =>
  recommenders.find((recommender) => recommender.id === id);
