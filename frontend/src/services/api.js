export const fetchStockData = async (symbol) => {
    const response = await fetch(`/fetch/${symbol}`);
    if (!response.ok) {
      throw new Error(`Error fetching data for ${symbol}`);
    }
    return response.json();
  };
  