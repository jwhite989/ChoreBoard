package com.example.choreboard_backend.controller;

import com.example.choreboard_backend.model.Reward;
import com.example.choreboard_backend.model.Redemption;
import com.example.choreboard_backend.service.RewardService;
import com.example.choreboard_backend.service.RewardReportService;
import com.example.choreboard_backend.service.ChildReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {
    @Autowired
    private RewardService rewardService;

    @Autowired
    private RewardReportService rewardReportService;

    @Autowired
    private ChildReportService childReportService;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    @GetMapping("/{id}")
    public Reward getRewardById(@PathVariable Long id) {
        return rewardService.getRewardById(id);
    }

    @PostMapping
    public Reward createReward(@RequestBody Reward reward) {
        return rewardService.createReward(reward);
    }

    @DeleteMapping("/{id}")
    public void deleteReward(@PathVariable Long id) {
        rewardService.deleteReward(id);
    }

    @GetMapping("/report")
    public Map<String, Object> getRewardReport(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now();
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : LocalDate.now();
        return rewardReportService.generateReport(null, start, end);
    }

    @PostMapping("/{id}/redeem")
    public void redeemReward(@PathVariable Long id, @RequestParam Long userId) {
        rewardService.redeemReward(userId, id);
    }

    @PutMapping("/{id}")
    public Reward updateReward(@PathVariable Long id, @RequestBody Reward reward) {
        return rewardService.updateReward(reward);
    }

    @GetMapping("/redemptions")
    public List<Redemption> getRedemptions(@RequestParam(required = false) Long userId) {
        return rewardService.getRedemptions(userId);
    }

    @GetMapping("/child-report/{userId}")
    public Map<String, Object> getChildReport(@PathVariable Long userId) {
        return childReportService.generateChildReport(userId);
    }
}
