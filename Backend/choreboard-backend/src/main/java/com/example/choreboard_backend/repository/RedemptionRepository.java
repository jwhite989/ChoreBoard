package com.example.choreboard_backend.repository;

import com.example.choreboard_backend.model.Redemption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RedemptionRepository extends JpaRepository<Redemption, Long> {
    List<Redemption> findByUserId(Long userId);
} 