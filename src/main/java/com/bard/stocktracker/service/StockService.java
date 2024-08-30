package com.bard.stocktracker.service;

import com.bard.stocktracker.model.Stock;
import com.bard.stocktracker.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    private final String apiKey = System.getenv("ALPHA_VANTAGE_API_KEY");  // Replace with your Alpha Vantage API key
    private final String apiUrl = "https://www.alphavantage.co/query";

    // Define the date-time format that matches the Alpha Vantage API response
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public void fetchAndSaveStockData(String symbol) {
        String url = apiUrl + "?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=" + apiKey;
        
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        
        JSONObject jsonResponse = new JSONObject(response);
        JSONObject timeSeries = jsonResponse.getJSONObject("Time Series (5min)");
        
        // Iterate through the keys (timestamps) in the JSON response
        Iterator<String> keys = timeSeries.keys();
        while (keys.hasNext()) {
            String time = keys.next();
            JSONObject stockData = timeSeries.getJSONObject(time);
            double price = stockData.getDouble("1. open");

            // Parse the timestamp using the correct format
            LocalDateTime timestamp = LocalDateTime.parse(time, formatter);

            Stock stock = new Stock();
            stock.setSymbol(symbol);
            stock.setPrice(price);
            stock.setTimestamp(timestamp);

            stockRepository.save(stock);
        }
    }
}
