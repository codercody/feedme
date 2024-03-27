"use client";

import { Select, Label } from "flowbite-react";
import { recommenders, RecommenderT } from "@/lib/recommenders";

export default function Selector({
  recommender,
  setRecommender,
  name,
}: {
  recommender: RecommenderT;
  setRecommender: (recommender: string) => void;
  name: string;
}) {
  return (
    <div className="mb-4 inline-flex">
      <div className="my-auto mr-2">
        <Label htmlFor={`${name}_recommender`} value="Recommender:" />
      </div>
      <div className="my-auto">
        <Select
          id={`${name}_recommender`}
          required
          onChange={(e) => {
            setRecommender(e.target.value);
          }}
          value={recommender.name}
        >
          {recommenders.map(({ name }, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
