package com.example.choreboard_backend.controller;

import com.example.choreboard_backend.model.Chore;
import com.example.choreboard_backend.service.ChoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chores")
public class ChoreController {
    @Autowired
    private ChoreService choreService;

    @GetMapping
    public List<Chore> getAllChores() {
        return choreService.getAllChores();
    }

    @GetMapping("/{id}")
    public Chore getChoreById(@PathVariable Long id) {
        return choreService.getChoreById(id);
    }

    @PostMapping
    public Chore createChore(@RequestBody Chore chore) {
        return choreService.createChore(chore);
    }

    @DeleteMapping("/{id}")
    public void deleteChore(@PathVariable Long id) {
        choreService.deleteChore(id);
    }

    @GetMapping("/search")
    public List<Chore> searchChores(@RequestParam String status) {
        return choreService.searchChoresByStatus(status);
    }

    @PutMapping("/{id}/complete")
    public void completeChore(@PathVariable Long id) {
        choreService.completeChore(id);
    }
}
