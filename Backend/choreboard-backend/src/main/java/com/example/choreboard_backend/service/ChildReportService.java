package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.User;
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

        List<Map<String, Object>> completedChores = choreRepository
                .findByAssignedToAndCompletedDateIsNotNull(user)
                .stream()
                .map(chore -> {
                    Map<String, Object> choreMap = new HashMap<>();
                    choreMap.put("name", chore.getTitle());
                    choreMap.put("title", chore.getTitle());
                    choreMap.put("completedDate", chore.getCompletedDate().toString());
                    choreMap.put("points", chore.getPoints());
                    return choreMap;
                })
                .toList();

        List<Map<String, Object>> redeemedRewards = redemptionRepository
                .findByUserId(userId)
                .stream()
                .map(redemption -> {
                    Map<String, Object> rewardMap = new HashMap<>();
                    rewardMap.put("name", redemption.getReward().getName());
                    rewardMap.put("title", redemption.getReward().getName());
                    rewardMap.put("redeemedAt", redemption.getRedeemedAt().toString());
                    rewardMap.put("pointsCost", redemption.getReward().getPointsRequired());
                    return rewardMap;
                })
                .toList();

        Map<String, Object> report = new HashMap<>();
        report.put("username", user.getUsername());
        report.put("completedChores", completedChores);
        report.put("currentPoints", user.getPoints());
        report.put("redeemedRewards", redeemedRewards);
        report.put("totalChoresCompleted", completedChores.size());
        report.put("totalPointsEarned", completedChores.stream()
                .mapToInt(chore -> (Integer) chore.get("points")).sum());
        report.put("totalRewardsRedeemed", redeemedRewards.size());
        report.put("generatedAt", LocalDateTime.now());

        return report;
    }
}