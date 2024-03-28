import Chart from "react-apexcharts";
import NotSupported from "@/components/alerts/not-supported";

const options = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};
const series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

export default function Accuracy() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Accuracy</h1>
      <p>
        This measures how close the algorithm&apos;s predictions are to your
        true preferences.
      </p>
      <NotSupported message="Accuracy metrics are not supported yet." />
      <div className="flex my-4">
        <div className="flex-1 flex justify-center">
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
        <div className="flex-1 flex justify-center">
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
}
