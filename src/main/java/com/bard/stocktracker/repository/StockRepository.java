package com.bard.stocktracker.repository;

import com.bard.stocktracker.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
    // Additional query methods can be defined here
}