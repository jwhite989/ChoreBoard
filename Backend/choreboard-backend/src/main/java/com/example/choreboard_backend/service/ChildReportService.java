package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.User;
import com.example.choreboard_backend.model.Chore;
import com.example.choreboard_backend.model.Redemption;
import com.example.choreboard_backend.repository.UserRepository;
import com.example.choreboard_backend.repository.ChoreRepository;
import com.example.choreboard_backend.repository.RedemptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChildReportService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChoreRepository choreRepository;
    @Autowired
    private RedemptionRepository redemptionRepository;

    public Map<String, Object> generateChildReport(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Chore> completedChores = choreRepository.findByAssignedToAndCompletedDateIsNotNull(user);
        List<Redemption> redemptions = redemptionRepository.findByUserId(userId);

        Map<String, Object> report = new HashMap<>();
        report.put("username", user.getUsername());
        report.put("completedChores", completedChores);
        report.put("currentPoints", user.getPoints());
        report.put("redeemedRewards", redemptions);
        report.put("totalChoresCompleted", completedChores.size());
        report.put("totalPointsEarned", completedChores.stream().mapToInt(Chore::getPoints).sum());
        report.put("totalRewardsRedeemed", redemptions.size());
        report.put("generatedAt", LocalDateTime.now());

        return report;
    }
} 