package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://3000.vs.amypo.com/")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already exists!";
        }
        userRepository.save(user);
        return "Registered successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existing = userRepository.findByEmail(user.getEmail());
        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return "Login successful!";
        }
        return "Invalid credentials!";
    }
}
