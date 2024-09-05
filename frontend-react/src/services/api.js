export const fetchStockData = async (symbol) => {
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`;
  
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    throw new Error(`Error fetching data for ${symbol}`);
  }

  const data = await response.json();

  // Extract the time series data and get the most recent stock price
  const timeSeries = data['Time Series (5min)'];
  if (!timeSeries) {
    throw new Error(`No time series data available for ${symbol}`);
  }

  // Get the most recent time (the first entry in the timeSeries object)
  const latestTime = Object.keys(timeSeries)[0];
  const latestData = timeSeries[latestTime];

  // Extract the necessary data
  const currentPrice = parseFloat(latestData['4. close']);  // Use the close price as the current price
  const openPrice = parseFloat(latestData['1. open']);      // Use the open price to calculate the change
  const priceChange = currentPrice - openPrice;

  // Return the parsed data
  return {
    symbol,
    companyName: `${symbol.toUpperCase()} Inc.`,  // You can improve this later by fetching the company name
    currentPrice,
    change: priceChange,
  };
};
  