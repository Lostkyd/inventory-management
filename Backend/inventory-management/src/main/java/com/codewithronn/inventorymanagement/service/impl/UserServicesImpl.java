package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.dtos.request.UserRequest;
import com.codewithronn.inventorymanagement.dtos.response.UserResponse;
import com.codewithronn.inventorymanagement.entity.UserCredentials;
import com.codewithronn.inventorymanagement.entity.Users;
import com.codewithronn.inventorymanagement.entity.UsersOtp;
import com.codewithronn.inventorymanagement.repository.UserCredentialsRepository;
import com.codewithronn.inventorymanagement.repository.UserRepository;
import com.codewithronn.inventorymanagement.repository.UsersOtpRepository;
import com.codewithronn.inventorymanagement.service.UserServices;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServicesImpl implements UserServices {

    private final UserRepository userRepository;
    private final UserCredentialsRepository userCredentialRepository;
    private final UsersOtpRepository userOtpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailServices emailService;
    private final OtpServices otpService;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String otp = otpService.generateOtp();

        Users newUser = Users.builder()
                .userId(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .role(userRequest.getRole().toUpperCase())
                .isVerified(false)
                .build();
        userRepository.save(newUser);

        UserCredentials credential = UserCredentials.builder()
                .id(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .user(newUser)
                .build();
        userCredentialRepository.save(credential);

        UsersOtp userOtp = UsersOtp.builder()
                .id(UUID.randomUUID().toString())
                .emailOtp(otp)
                .otpExpiry(LocalDateTime.now().plusMinutes(5))
                .user(newUser)
                .build();
        userOtpRepository.save(userOtp);
        emailService.sendOtp(userRequest.getEmail(), otp);

        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(Users user) {
        return UserResponse.builder()
                .email(user.getEmail())
                .userId(user.getUserId())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        Users existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        Users existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRepository.delete(existingUser);
    }
}