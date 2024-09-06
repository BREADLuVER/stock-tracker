import React from 'react';
import './StockItem.css'; 

const StockItem = ({ symbol, companyName, price, change, onClick }) => {
  // Handle cases where price or change is undefined
  const formattedPrice = price !== undefined ? price.toFixed(2) : 'N/A';
  const formattedChange = change !== undefined ? (change >= 0 ? `+${change.toFixed(2)}` : `${change.toFixed(2)}`) : 'N/A';
  
  // Determine the color based on price change
  const changeColor = change >= 0 ? 'green' : 'red';

  return (
    <div className="stock-item" onClick={() => onClick(symbol)}>
      <div className="stock-symbol">
        <h2>{symbol}</h2>
        <p>{companyName}</p>
      </div>
      <div className="stock-price">
        <h2>${formattedPrice}</h2>
        <p style={{ color: changeColor }}>{formattedChange}</p>
      </div>
    </div>
  );
};

export default StockItem;
