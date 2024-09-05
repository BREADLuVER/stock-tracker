import React from 'react';
import './StockItem.css'; // Assuming you use CSS for styling

const StockItem = ({ symbol, companyName, price, change }) => {
  // Determine color based on price change
  const changeColor = change >= 0 ? 'green' : 'red';

  return (
    <div className="stock-item">
      <div className="stock-symbol">
        <h2>{symbol}</h2>
        <p>{companyName}</p>
      </div>
      <div className="stock-price">
        <h2>${price.toFixed(2)}</h2>
        <p style={{ color: changeColor }}>
          {change >= 0 ? `+${change.toFixed(2)}` : `${change.toFixed(2)}`}
        </p>
      </div>
    </div>
  );
};

export default StockItem;
