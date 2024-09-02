import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchStockData } from '../services/api';

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockData(symbol);
        const labels = data.map(item => item.timestamp);
        const prices = data.map(item => item.price);
        setChartData({
          labels,
          datasets: [
            {
              label: `Stock Prices for ${symbol}`,
              data: prices,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  return <Line data={chartData} />;
};

export default StockChart;
