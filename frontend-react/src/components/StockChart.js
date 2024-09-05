import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale, // Import time scale
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Adapter for time scale

// Register the required components
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ data }) => {
  // Ensure data is sorted by timestamp
  const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const chartData = {
    labels: sortedData.map(entry => new Date(entry.timestamp)), // Parse timestamps as Date objects
    datasets: [
      {
        label: 'Stock Price',
        data: sortedData.map(entry => entry.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute', // Adjust the unit depending on your data frequency
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
    elements: {
      point: {
        radius: 3, // Adjust point size if needed
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart;
