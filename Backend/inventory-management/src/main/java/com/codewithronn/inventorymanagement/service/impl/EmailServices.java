/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ronn Kevin Rubio
 */
@Service
@RequiredArgsConstructor
public class EmailServices {
    private final JavaMailSender mailSender;
    
    public void sendOtp(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        
        message.setTo(toEmail);
        message.setSubject("Email Verification OTP");
        message.setText("Your OTP is: " + otp + "\nExpires in 2 minutes.");
        mailSender.send(message);
    }
}