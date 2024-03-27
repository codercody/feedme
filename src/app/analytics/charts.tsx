export const getRadialBarState = (label: string, value: number) => ({
  options: {
    labels: [label],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
  },
  series: [value],
});
