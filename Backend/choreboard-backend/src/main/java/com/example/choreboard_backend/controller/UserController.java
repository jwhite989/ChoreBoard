package com.example.choreboard_backend.controller;

import com.example.choreboard_backend.model.User;
import com.example.choreboard_backend.service.ReportService;
import com.example.choreboard_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String username) {
        return userService.searchUsersByUsername(username);
    }

    @GetMapping("/{id}/points")
    public int getUserPoints(@PathVariable Long id) {
        return userService.getUserPoints(id);
    }

    @GetMapping("/{id}/report")
    public long getUserChoreReport(@PathVariable Long id, @RequestParam String startDate, @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return reportService.getDetailedChoreReport(id, start, end).size();
    }
}
