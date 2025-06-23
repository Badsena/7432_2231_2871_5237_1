package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://3000.vs.amypo.com")
@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserRepository repo;

  @PostMapping("/register")
  public String register(@RequestBody User user) {
    if (repo.findByEmail(user.getEmail()) != null) {
      return "Email already exists!";
    }
    repo.save(user);
    return "Registered successfully!";
  }

  @PostMapping("/login")
  public String login(@RequestBody User user) {
    User dbUser = repo.findByEmail(user.getEmail());
    if (dbUser != null && dbUser.getPassword().equals(user.getPassword())) {
      return "Login successful!";
    }
    return "Invalid credentials!";
  }
}
