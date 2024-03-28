import { useEffect, useMemo, useState } from "react";
import { getRadialBarState } from "./charts";
import { useAB } from "@/lib/contexts/ab";
import { Spinner } from "flowbite-react";

export default function Precision() {
  const { a, b } = useAB();

  const [leftPct, setLeftPct] = useState<number | null>(null);
  const [rightPct, setRightPct] = useState<number | null>(null);
  const left = useMemo(
    () => leftPct && getRadialBarState(a.name, leftPct),
    [leftPct, a.name]
  );
  const right = useMemo(
    () => rightPct && getRadialBarState(b.name, rightPct),
    [rightPct, b.name]
  );

  useEffect(() => {
    const computeLeft = async () =>
      fetch(`/api/recommenders/${a.id}/precision`)
        .then((res) => res.json())
        .then((res) => setLeftPct(Math.round(1000000 * res) / 10000));

    setLeftPct(null);
    computeLeft();
  }, [a.id]);

  useEffect(() => {
    const computeRight = async () =>
      fetch(`/api/recommenders/${b.id}/precision`)
        .then((res) => res.json())
        .then((res) => setRightPct(Math.round(1000000 * res) / 10000));

    setRightPct(null);
    computeRight();
  }, [b.id]);

  const [Chart, setChart] = useState<any>();

  useEffect(() => {
    import("react-apexcharts").then((mod) => setChart(() => mod.default));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Precision</h1>
      <p>
        This measures what percentage of recommended posts are truly relevant.
      </p>
      <div className="flex flex-wrap">
        <div className="flex-1 text-center p-4" style={{ minWidth: 500 }}>
          {left && typeof window !== "undefined" && Chart ? (
            <div className="flex justify-center">
              <Chart
                options={left.options}
                series={left.series}
                type="radialBar"
                width={500}
              />
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="flex-1 text-center p-4" style={{ minWidth: 500 }}>
          {right && typeof window !== "undefined" && Chart ? (
            <div className="flex justify-center">
              <Chart
                options={right.options}
                series={right.series}
                type="radialBar"
                width={500}
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
