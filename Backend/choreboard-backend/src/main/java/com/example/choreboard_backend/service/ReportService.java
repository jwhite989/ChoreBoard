package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.Chore;
import com.example.choreboard_backend.repository.ChoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService implements ReportGenerator {
    @Autowired
    private ChoreRepository choreRepository;

    @Override
    public Map<String, Object> generateReport(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Chore> chores = getDetailedChoreReport(userId, startDate, endDate);
        Map<String, Object> report = new HashMap<>();
        report.put("chores", chores);
        report.put("totalChores", chores.size());
        report.put("totalPoints", chores.stream().mapToInt(Chore::getPoints).sum());
        report.put("generatedAt", LocalDate.now());
        return report;
    }

    @Override
    public String generateTitle(Long userId, LocalDate startDate, LocalDate endDate) {
        return "Chore Report for User ID: " + userId + " from " + startDate + " to " + endDate;
    }

    private List<Chore> getDetailedChoreReport(Long userId, LocalDate startDate, LocalDate endDate) {
        return choreRepository.findAll().stream()
                .filter(chore -> chore.getAssignedTo().getId().equals(userId))
                .filter(chore -> chore.getCompletedDate() != null)
                .filter(chore -> !chore.getCompletedDate().isBefore(startDate)
                        && !chore.getCompletedDate().isAfter(endDate))
                .toList();
    }
}