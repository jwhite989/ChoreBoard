package com.example.choreboard_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "Rewards")
public class Reward extends BaseEntity {
    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPointsRequired() {
        return getPoints();
    }

    public void setPointsRequired(int pointsRequired) {
        setPoints(pointsRequired);
    }
}
