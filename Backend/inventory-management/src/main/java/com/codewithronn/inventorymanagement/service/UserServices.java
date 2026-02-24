package com.codewithronn.inventorymanagement.service;

import com.codewithronn.inventorymanagement.dtos.request.OtpRequest;
import com.codewithronn.inventorymanagement.dtos.request.SetPasswordRequest;
import com.codewithronn.inventorymanagement.dtos.request.UserRequest;
import com.codewithronn.inventorymanagement.dtos.response.UserResponse;

import java.util.List;

public interface UserServices {

    UserResponse createUser(UserRequest userRequest);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);

    void verifyOtp(OtpRequest otpRequest);

    void setPassword(SetPasswordRequest request);

    void resendOtp(String email);
}
