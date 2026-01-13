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
  const rawLabels = data?.pageviews?.map((point) => point.x) || [];
  const labels = rawLabels?.map((isoDate) => format(parseISO(isoDate), "MMM"));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sessions",
        data: data?.sessions?.map((point) => point.y) || [],
        backgroundColor: "rgba(255, 255, 184, 0.7)",
        stack: "traffic",
        borderRadius: 4,
      },
      {
        label: "Page views",
        data: data?.pageviews?.map((point) => point.y) || [],
        backgroundColor: "rgba(251, 228, 0, 0.7)",
        stack: "traffic",
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const isoDate = rawLabels[index];
            return isoDate ? format(parseISO(isoDate), "MMM yyyy") : "";
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[350px] w-full md:h-[400px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TrafficTrendsChart;
