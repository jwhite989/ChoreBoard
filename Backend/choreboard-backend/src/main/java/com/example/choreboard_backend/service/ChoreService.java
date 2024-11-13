package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.Chore;
import com.example.choreboard_backend.model.User;
import com.example.choreboard_backend.repository.ChoreRepository;
import com.example.choreboard_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ChoreService {
    @Autowired
    private ChoreRepository choreRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Chore> getAllChores() {
        return choreRepository.findAll();
    }

    public Chore getChoreById(Long id) {
        return choreRepository.findById(id).orElse(null);
    }

    public Chore createChore(Chore chore) {
        return choreRepository.save(chore);
    }

    public void deleteChore(Long id) {
        choreRepository.deleteById(id);
    }

    public List<Chore> searchChoresByStatus(String status) {
        return choreRepository.findByStatusContainingIgnoreCase(status);
    }

    public List<Chore> getChoresByUser(Long userId) {
        return choreRepository.findByAssignedToId(userId);
    }

    public Chore updateChore(Long id, Chore chore) {
        if (choreRepository.existsById(id)) {
            chore.setId(id);
            return choreRepository.save(chore);
        }
        return null;
    }

    public Chore completeChore(Long choreId) {
        Chore chore = choreRepository.findById(choreId).orElse(null);
        if (chore != null && chore.getAssignedTo() != null) {
            User user = chore.getAssignedTo();
            user.setPoints(user.getPoints() + chore.getPoints());
            chore.setStatus("COMPLETED");
            chore.setCompletedDate(LocalDate.now());
            userRepository.save(user);
            return choreRepository.save(chore);
        }
        return null;
    }
}
