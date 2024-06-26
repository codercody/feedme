"use client";

import Precision from "./precision";
import Recall from "./recall";
import F1Score from "./f1-score";
/*import Accuracy from "./accuracy";
import Coverage from "./coverage";
import Confidence from "./confidence";
import Novelty from "./novelty";
import Serendipity from "./serendipity";
import Diversity from "./diversity";
import Robustness from "./robustness";
import Scalability from "./scalability";*/

export default function Analytics() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>
      <div className="mb-4">
        <Precision />
      </div>
      <div className="mb-4">
        <Recall />
      </div>
      <div className="mb-4">
        <F1Score />
      </div>
      {/*<div className="mb-4">
        <Accuracy />
      </div>
      <div className="mb-4">
        <Coverage />
      </div>
      <div className="mb-4">
        <Confidence />
      </div>
      <div className="mb-4">
        <Novelty />
      </div>
      <div className="mb-4">
        <Serendipity />
      </div>
      <div className="mb-4">
        <Diversity />
      </div>
      <div className="mb-4">
        <Robustness />
      </div>
      <div className="mb-4">
        <Scalability />
  </div>*/}
    </div>
  );
}
