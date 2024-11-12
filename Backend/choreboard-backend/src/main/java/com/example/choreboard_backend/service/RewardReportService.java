package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.Reward;
import com.example.choreboard_backend.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RewardReportService implements ReportGenerator {
    @Autowired
    private RewardRepository rewardRepository;

    @Override
    public Map<String, Object> generateReport(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Reward> rewards = rewardRepository.findAll();
        Map<String, Object> report = new HashMap<>();
        report.put("rewards", rewards);
        report.put("totalRewards", rewards.size());
        report.put("generatedAt", LocalDate.now());
        return report;
    }

    @Override
    public String generateTitle(Long userId, LocalDate startDate, LocalDate endDate) {
        return "Available Rewards Report as of " + LocalDate.now();
    }
}
