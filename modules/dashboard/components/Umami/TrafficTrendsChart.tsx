"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { format, parseISO } from "date-fns";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface DataPoint {
  x: string;
  y: number;
}

interface DataProps {
  data: {
    pageviews: DataPoint[];
    sessions: DataPoint[];
  };
}

const TrafficTrendsChart = ({ data }: DataProps) => {
  const rawLabels = data?.pageviews?.map((point) => point.x);
  const labels = rawLabels?.map((isoDate) => format(parseISO(isoDate), "MMM"));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sessions",
        data: data?.sessions?.map((point) => point.y),
        backgroundColor: "rgba(255, 255, 184, 0.7)",
        stack: "traffic",
      },
      {
        label: "Page views",
        data: data?.pageviews?.map((point) => point.y),
        backgroundColor: "rgba(251, 228, 0,0.7)",
        stack: "traffic",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stacked Traffic Trends",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const isoDate = rawLabels[index];
            return format(parseISO(isoDate), "MMM yyyy");
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TrafficTrendsChart;
