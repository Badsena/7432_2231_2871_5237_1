package com.example.demo;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;


import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (repo.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        }
        repo.save(user);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User u = repo.findByEmail(user.getEmail());
        if (u != null && u.getPassword().equals(user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping("/home")
    public ResponseEntity<?> home(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.validateToken(token);
    if (email != null) {
      return ResponseEntity.ok("Welcome to the protected home page!");
    } else {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    }
  }

    @PostMapping("/oauth/google")
public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
    String idTokenString = body.get("idToken");

    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
            .Builder(new NetHttpTransport(), new JacksonFactory())
            .setAudience(Collections.singletonList("501133578210-ad2ls208ucf6au3ukvcqbdor3g6mfvqs.apps.googleusercontent.com"))
            .build();

    try {
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();

            User user = repo.findByEmail(email);
            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setPassword("GOOGLE_OAUTH");
                repo.save(user);
            }

            String jwt = jwtUtil.generateToken(email);
            return ResponseEntity.ok(jwt);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Google verification failed");
    }
}

}
