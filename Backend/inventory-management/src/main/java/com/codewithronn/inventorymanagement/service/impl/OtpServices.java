/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.service.impl;

import org.springframework.stereotype.Service;

/**
 *
 * @author Ronn Kevin Rubio
 */
@Service
public class OtpServices {
    public String generateOtp() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);
    }
}
