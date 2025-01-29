import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Card = ({ title, icon, value }) => {
  const chartData = {
    labels: ["إجمالي"],
    datasets: [
      {
        label: title,
        data: [value || 0], // العدد الحقيقي القادم من `HomePage`
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <div className="text-blue-600 text-2xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xl font-bold text-gray-800 mb-2">{value}</p>{" "}
      {/* عرض العدد الحقيقي */}
      <div className="w-full h-32">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Card;
