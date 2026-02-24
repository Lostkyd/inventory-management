package com.codewithronn.inventorymanagement.dtos.request;

import lombok.Data;

@Data
public class SetPasswordRequest {
    private String email;
    private String password;
    private String confirmPassword;
}