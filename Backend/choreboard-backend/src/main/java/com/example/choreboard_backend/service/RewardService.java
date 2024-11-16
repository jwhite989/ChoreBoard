package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.Reward;
import com.example.choreboard_backend.model.User;
import com.example.choreboard_backend.model.Redemption;
import com.example.choreboard_backend.repository.RewardRepository;
import com.example.choreboard_backend.repository.UserRepository;
import com.example.choreboard_backend.repository.RedemptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;

@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RedemptionRepository redemptionRepository;

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

                Redemption redemption = new Redemption();
                redemption.setUser(user);
                redemption.setReward(reward);
                redemption.setRedeemedAt(LocalDateTime.now());
                redemption.setDescription("Redeemed " + reward.getName());
                redemptionRepository.save(redemption);
            } else {
                throw new IllegalStateException("Not enough points to redeem reward");
            }
        }
    }

    public Reward updateReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    public List<Redemption> getRedemptions(Long userId) {
        if (userId != null) {
            return redemptionRepository.findByUserId(userId);
        }
        return redemptionRepository.findAll();
    }
}
