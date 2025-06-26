package com.example.demo;
 
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
 
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
 
import org.springframework.test.web.servlet.MockMvc;
 
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
 
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
 
@WebMvcTest(UserController.class)
public class UserControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private UserRepository repo;
 
    @MockBean
    private JwtUtil jwtUtil;
 
    private final ObjectMapper objectMapper = new ObjectMapper();
 
    @Test
    void testRegisterSuccess() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
 
        Mockito.when(repo.findByEmail("test@example.com")).thenReturn(null);
 
        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
            .andExpect(status().isOk())
            .andExpect(content().string("Registration successful"));
    }
 
    @Test
    void testRegisterDuplicate() throws Exception {
        User user = new User();
        user.setEmail("existing@example.com");
        user.setPassword("password");
 
        Mockito.when(repo.findByEmail("existing@example.com")).thenReturn(user);
 
        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("User already exists"));
    }
 
    @Test
    void testLoginSuccess() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
 
        Mockito.when(repo.findByEmail("test@example.com")).thenReturn(user);
        Mockito.when(jwtUtil.generateToken("test@example.com")).thenReturn("fake-jwt");
 
        mockMvc.perform(post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
            .andExpect(status().isOk())
            .andExpect(content().string("fake-jwt"));
    }
 
    // @Test
    // void testLoginFailure() throws Exception {
    //     User user = new User();
    //     user.setEmail("test@example.com");
    //     user.setPassword("wrong");
 
    //     Mockito.when(repo.findByEmail("test@example.com")).thenReturn(user);
 
    //     user.setPassword("wrong"); // mismatched password
 
    //     mockMvc.perform(post("/api/users/login")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(user)))
    //         .andExpect(status().isUnauthorized())
    //         .andExpect(content().string("Invalid credentials"));
    // }
 
    @Test
    void testHomeWithValidToken() throws Exception {
        Mockito.when(jwtUtil.validateToken("valid-token")).thenReturn("test@example.com");
 
        mockMvc.perform(get("/api/users/home")
                .header("Authorization", "Bearer valid-token"))
            .andExpect(status().isOk())
            .andExpect(content().string("Welcome to the protected home page!"));
    }
 
    @Test
    void testHomeWithInvalidToken() throws Exception {
        Mockito.when(jwtUtil.validateToken("invalid-token")).thenReturn(null);
 
        mockMvc.perform(get("/api/users/home")
                .header("Authorization", "Bearer invalid-token"))
            .andExpect(status().isUnauthorized())
            .andExpect(content().string("Invalid or expired token"));
    }
 
    @Test
    void testTestEndpoint() throws Exception {
        mockMvc.perform(get("/api/users/test"))
            .andExpect(status().isOk())
            .andExpect(content().string("Hello"));
    }
}



