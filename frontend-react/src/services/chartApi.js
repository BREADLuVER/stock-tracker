const API_KEY = console.log(process.env.alphavantage_api_key);

export const fetchStockChartData = async (symbol) => {
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`;
  
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    throw new Error(`Error fetching chart data for ${symbol}`);
  }

  const data = await response.json();

  // Extract the time series data and convert it to the format needed for the chart
  const timeSeries = data['Time Series (5min)'];
  if (!timeSeries) {
    throw new Error(`No time series data available for ${symbol}`);
  }

  const chartData = Object.keys(timeSeries).map((timestamp) => {
    return {
      timestamp,
      price: parseFloat(timeSeries[timestamp]['4. close']), // Use the closing price for the chart
    };
  });

  return chartData; // Return the array of timestamp and price objects
};
