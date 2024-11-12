package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.Reward;
import com.example.choreboard_backend.model.User;
import com.example.choreboard_backend.repository.RewardRepository;
import com.example.choreboard_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public Reward getRewardById(Long id) {
        return rewardRepository.findById(id).orElse(null);
    }

    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    public void deleteReward(Long id) {
        rewardRepository.deleteById(id);
    }

    public void redeemReward(Long userId, Long rewardId) {
        User user = userRepository.findById(userId).orElse(null);
        Reward reward = rewardRepository.findById(rewardId).orElse(null);

        if (user != null && reward != null) {
            if (user.getPoints() >= reward.getPointsRequired()) {
                user.setPoints(user.getPoints() - reward.getPointsRequired());
                userRepository.save(user);
            } else {
                throw new IllegalStateException("Not enough points to redeem reward");
            }
        }
    }

    public Reward updateReward(Reward reward) {
        return rewardRepository.save(reward);
    }
}
