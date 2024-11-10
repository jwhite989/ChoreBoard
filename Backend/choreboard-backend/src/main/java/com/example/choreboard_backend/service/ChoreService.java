package com.example.choreboard_backend.service;

import com.example.choreboard_backend.model.Chore;
import com.example.choreboard_backend.repository.ChoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChoreService {
    @Autowired
    private ChoreRepository choreRepository;

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
}
