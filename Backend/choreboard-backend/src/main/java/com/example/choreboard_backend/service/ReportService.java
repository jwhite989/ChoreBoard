package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.Chore;
import com.example.choreboard_backend.repository.ChoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private ChoreRepository choreRepository;

    public long getCompletedChoresCount(Long userId, LocalDate startDate, LocalDate endDate) {
        return choreRepository.findAll().stream()
                .filter(chore -> chore.getAssignedTo().getId().equals(userId))
                .filter(chore -> chore.getCompletedDate() != null)
                .filter(chore -> !chore.getCompletedDate().isBefore(startDate) && !chore.getCompletedDate().isAfter(endDate))
                .count();
    }
} 