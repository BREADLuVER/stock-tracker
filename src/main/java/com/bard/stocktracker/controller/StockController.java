package com.bard.stocktracker.controller;

import com.bard.stocktracker.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/fetch/{symbol}")
    public String fetchStockData(@PathVariable String symbol) {
        stockService.fetchAndSaveStockData(symbol);
        return "Stock data for " + symbol + " fetched and saved successfully.";
    }
}
