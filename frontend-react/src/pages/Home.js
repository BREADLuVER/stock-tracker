import React, { useState } from 'react';
import StockSelector from '../components/StockSelector';
import StockItem from '../components/StockItem';
import StockChart from '../components/StockChart'; // Import StockChart
import { fetchStockData } from '../services/api';
import { fetchStockChartData } from '../services/chartApi';


const Home = () => {
  const [subscribedStocks, setSubscribedStocks] = useState([]);
  const [selectedStockData, setSelectedStockData] = useState(null); // Store chart data for selected stock
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async (symbol) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchStockData(symbol);
      const stockInfo = {
        symbol: symbol.toUpperCase(),
        companyName: data.companyName,
        price: data.currentPrice,
        change: data.change,
      };
      setSubscribedStocks([...subscribedStocks, stockInfo]);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(`Error fetching stock data for ${symbol}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStockClick = async (symbol) => {
    // Fetch chart data when a stock item is clicked
    setLoading(true);
    setError(null);
    try {
      const chartData = await fetchStockChartData(symbol);
      setSelectedStockData(chartData);
    } catch (error) {
      console.error('Error fetching stock chart data:', error);
      setError(`Error fetching chart data for ${symbol}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Stocks</h1>
      <StockSelector onFetchData={handleFetchData} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="stock-list">
        {subscribedStocks.map((stock) => (
          <StockItem
            key={stock.symbol}
            symbol={stock.symbol}
            companyName={stock.companyName}
            price={stock.price}
            change={stock.change}
            onClick={handleStockClick} // Pass the click handler to StockItem
          />
        ))}
      </div>
      {selectedStockData && <StockChart data={selectedStockData} />}
    </div>
  );
};

export default Home;
