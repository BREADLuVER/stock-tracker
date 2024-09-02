import React, { useState } from 'react';
import StockSelector from '../components/StockSelector';
import StockChart from '../components/StockChart';
import { fetchStockData } from '../services/api';

const Home = () => {
  const [stockData, setStockData] = useState([]);

  const handleFetchData = async (symbol) => {
    try {
      const data = await fetchStockData(symbol);
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div>
      <h1>Stock Tracker</h1>
      <StockSelector onFetchData={handleFetchData} />
      {stockData.length > 0 && <StockChart data={stockData} />}
    </div>
  );
};

export default Home;
