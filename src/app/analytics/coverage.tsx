import Chart from "react-apexcharts";
import UnderConstruction from "@/components/alerts/under-construction";

const options = {
  chart: {
    id: "radialBar",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "70%",
      },
    },
  },
  labels: ["Cricket"],
};
const series = [70];

export default function Coverage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Coverage</h1>
      <p>This measures what proportion of all items are ever recommended.</p>
      <UnderConstruction />
      <div className="flex my-4">
        <div className="flex-1 flex justify-center">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            width="500"
          />
        </div>
        <div className="flex-1 flex justify-center">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}
