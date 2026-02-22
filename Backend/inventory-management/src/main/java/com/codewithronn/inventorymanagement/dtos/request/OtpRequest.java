/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.dtos.request;

import lombok.Data;

/**
 *
 * @author Ronn Kevin Rubio
 */

@Data
public class OtpRequest {
    
    private String email;
    private String emailOtp;
    
}
