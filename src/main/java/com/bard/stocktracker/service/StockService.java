package com.bard.stocktracker.service;

import com.bard.stocktracker.model.Stock;
import com.bard.stocktracker.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.time.LocalDateTime;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    private final String apiKey = "your_api_key";  // Replace with your Alpha Vantage API key
    private final String apiUrl = "https://www.alphavantage.co/query";

    public void fetchAndSaveStockData(String symbol) {
        String url = apiUrl + "?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=" + apiKey;
        
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        
        JSONObject jsonResponse = new JSONObject(response);
        JSONObject timeSeries = jsonResponse.getJSONObject("Time Series (5min)");
        
        for (String time : timeSeries.keySet()) {
            JSONObject stockData = timeSeries.getJSONObject(time);
            double price = stockData.getDouble("1. open");

            Stock stock = new Stock();
            stock.setSymbol(symbol);
            stock.setPrice(price);
            stock.setTimestamp(LocalDateTime.parse(time));

            stockRepository.save(stock);
        }
    }
}
