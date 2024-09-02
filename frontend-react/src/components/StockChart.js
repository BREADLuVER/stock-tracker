import React from 'react';
import { Line } from 'react-chartjs-2';

const StockChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.timestamp),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map(entry => entry.price),
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
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart;
