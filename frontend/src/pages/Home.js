import React, { useState } from 'react';
import StockChart from '../components/StockChart';

const Home = () => {
  const [symbol, setSymbol] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const handleFetchClick = () => {
    setSelectedSymbol(symbol);
  };

  return (
    <div>
      <h1>Stock Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., IBM)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button onClick={handleFetchClick}>Fetch Data</button>
      </div>
      {selectedSymbol && <StockChart symbol={selectedSymbol} />}
    </div>
  );
};

export default Home;
