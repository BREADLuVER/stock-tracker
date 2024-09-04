package com.bard.stocktracker.controller;

import com.bard.stocktracker.model.Stock;
import com.bard.stocktracker.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/fetch/{symbol}")
    public List<Stock> fetchStockData(@PathVariable String symbol) {
        return stockService.fetchAndSaveStockData(symbol);
    }
}
