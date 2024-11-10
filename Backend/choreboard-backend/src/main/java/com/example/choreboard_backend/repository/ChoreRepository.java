package com.example.choreboard_backend.repository;

import com.example.choreboard_backend.model.Chore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoreRepository extends JpaRepository<Chore, Long> {
}
