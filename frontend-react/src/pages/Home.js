import React, { useState } from 'react';
import StockSelector from '../components/StockSelector';
import StockItem from '../components/StockItem';
import { fetchStockData } from '../services/api';

const Home = () => {
  const [subscribedStocks, setSubscribedStocks] = useState([]);

  const handleFetchData = async (symbol) => {
    try {
      const data = await fetchStockData(symbol);
      const stockInfo = {
        symbol: symbol.toUpperCase(),
        companyName: data.companyName,
        price: data.currentPrice, 
        change: data.change,
      };
      setSubscribedStocks([...subscribedStocks, stockInfo]); // Add new stock to list
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Stocks</h1>
      <StockSelector onFetchData={handleFetchData} />
      <div className="stock-list">
        {subscribedStocks.map((stock) => (
          <StockItem
            key={stock.symbol}
            symbol={stock.symbol}
            companyName={stock.companyName}
            price={stock.price}
            change={stock.change}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
