package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  @Autowired
  private JavaMailSender mailSender;

  public void sendOtpEmail(String to, String otp) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject("Your OTP for Password Reset");
    message.setText("Use the following OTP to reset your password:\n\n" + otp + "\n\nIt is valid for 5 minutes.");
    mailSender.send(message);
  }
}
