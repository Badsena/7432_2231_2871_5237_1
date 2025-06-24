package com.example.demo;

import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;

@Component
public class JwtKeyGenerator {

    private String secretKey;

    @PostConstruct
    public void init() {
        Key key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
        this.secretKey = Base64.getEncoder().encodeToString(key.getEncoded());
        System.out.println("Generated JWT Secret Key: " + secretKey); // For debugging only
    }

    public String getSecretKey() {
        return secretKey;
    }
}
