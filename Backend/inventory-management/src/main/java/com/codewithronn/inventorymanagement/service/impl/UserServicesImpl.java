package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.dtos.request.OtpRequest;
import com.codewithronn.inventorymanagement.dtos.request.SetPasswordRequest;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

        UsersOtp userOtp = UsersOtp.builder()
                .id(UUID.randomUUID().toString())
                .emailOtp(otp)
                .otpExpiry(LocalDateTime.now().plusMinutes(2))
                .lastOtpSentAt(LocalDateTime.now())
                .attempts(0)
                .resendCount(0)
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

    @Override
    @Transactional
    public void verifyOtp(OtpRequest otpRequest) {
        Users user = userRepository.findByEmail(otpRequest.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        UsersOtp userOtp = userOtpRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP not found. Please request a new one"));

        if (userOtp.getOtpExpiry().isBefore(LocalDateTime.now())) {
            userOtpRepository.delete(userOtp);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired. Please request a new one");
        }
        if (!userOtp.getEmailOtp().equals(otpRequest.getEmailOtp())) {
            userOtp.setAttempts(userOtp.getAttempts() + 1);
            if (userOtp.getAttempts() >= 3) {
                userOtpRepository.delete(userOtp);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Too many wrong attempts. Please request a new OTP");
            }
            userOtpRepository.save(userOtp);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid OTP. " + (3 - userOtp.getAttempts()) + " attempts remaining");
        }
        user.setVerified(true);
        userRepository.save(user);
        userOtpRepository.delete(userOtp);
    }

    @Override
    @Transactional
    public void setPassword(SetPasswordRequest request) {
        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // ✅ must be verified first
        if (!user.isVerified()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email not verified. Please verify your email first");
        }

        // ✅ check if password already set
        if (userCredentialRepository.existsByUser(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password already set. Please login");
        }

        // ✅ confirm password match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords do not match");
        }

        UserCredentials credential = UserCredentials.builder()
                .id(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .user(user)
                .build();
        userCredentialRepository.save(credential);
    }

    @Override
    @Transactional
    public void resendOtp(String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.isVerified()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already verified");
        }

        UsersOtp existingOtp = userOtpRepository.findByUser(user).orElse(null);

        int resendCount = 0;

        if (existingOtp != null && existingOtp.getLastOtpSentAt() != null) {
            resendCount = existingOtp.getResendCount();

            long cooldownSeconds = getCooldownSeconds(resendCount);
            LocalDateTime cooldownTime = existingOtp.getLastOtpSentAt()
                    .plusSeconds(cooldownSeconds);

            if (LocalDateTime.now().isBefore(cooldownTime)) {
                long secondsLeft = java.time.Duration.between(
                        LocalDateTime.now(), cooldownTime).getSeconds();
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,
                        "Please wait " + secondsLeft + " seconds before requesting a new OTP");
            }

            userOtpRepository.deleteByUser(user);
        }

        String otp = otpService.generateOtp();
        UsersOtp newOtp = UsersOtp.builder()
                .id(UUID.randomUUID().toString())
                .emailOtp(otp)
                .otpExpiry(LocalDateTime.now().plusMinutes(2))
                .lastOtpSentAt(LocalDateTime.now())
                .attempts(0)
                .resendCount(resendCount + 1)
                .user(user)
                .build();
        userOtpRepository.save(newOtp);
        emailService.sendOtp(email, otp);
    }

    private long getCooldownSeconds(int resendCount) {
        return switch (resendCount) {
            case 0 -> 0;
            case 1 -> 30;
            case 2 -> 60;
            default -> 300;
        };
    }
}