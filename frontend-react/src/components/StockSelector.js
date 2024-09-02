import React, { useState } from 'react';

const StockSelector = ({ onFetchData }) => {
  const [symbol, setSymbol] = useState('');

  const handleFetch = () => {
    if (symbol) {
      onFetchData(symbol);
    } else {
      alert('Please enter a stock symbol.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., IBM)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch Data</button>
    </div>
  );
};

export default StockSelector;
