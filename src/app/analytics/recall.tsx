import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { getRadialBarState } from "./charts";
import { useAB } from "@/lib/contexts/ab";
import { Spinner } from "flowbite-react";

export default function Recall() {
  const { a, b } = useAB();

  const [leftPct, setLeftPct] = useState<number | null>(null);
  const [rightPct, setRightPct] = useState<number | null>(null);
  const left = useMemo(
    () => leftPct && getRadialBarState(a.name, leftPct),
    [leftPct]
  );
  const right = useMemo(
    () => rightPct && getRadialBarState(b.name, rightPct),
    [rightPct]
  );

  useEffect(() => {
    const computeLeft = async () =>
      fetch(`/api/recommenders/${a.id}/recall`)
        .then((res) => res.json())
        .then((res) => setLeftPct(Math.round(1000000 * res) / 10000));
    const computeRight = async () =>
      fetch(`/api/recommenders/${b.id}/recall`)
        .then((res) => res.json())
        .then((res) => setRightPct(Math.round(1000000 * res) / 10000));

    computeLeft();
    computeRight();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Recall</h1>
      <p>This measures how much time and resources the algorithm takes.</p>
      <div className="flex flex-wrap">
        <div className="flex-1 text-center p-4" style={{ minWidth: 500 }}>
          {left ? (
            <div className="flex justify-center">
              <Chart
                options={left.options}
                series={left.series}
                type="radialBar"
                width="500"
              />
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="flex-1 text-center p-4" style={{ minWidth: 500 }}>
          {right ? (
            <div className="flex justify-center">
              <Chart
                options={right.options}
                series={right.series}
                type="radialBar"
                width="500"
              />
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}
