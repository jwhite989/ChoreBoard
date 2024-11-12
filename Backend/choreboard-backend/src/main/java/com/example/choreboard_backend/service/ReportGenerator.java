package com.example.choreboard_backend.service;

import java.time.LocalDate;
import java.util.Map;

public interface ReportGenerator {
    Map<String, Object> generateReport(Long userId, LocalDate startDate, LocalDate endDate);

    String generateTitle(Long userId, LocalDate startDate, LocalDate endDate);
}
