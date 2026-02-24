package com.codewithronn.inventorymanagement.controller;

import com.codewithronn.inventorymanagement.dtos.request.AuthRequest;
import com.codewithronn.inventorymanagement.dtos.request.OtpRequest;
import com.codewithronn.inventorymanagement.dtos.request.SetPasswordRequest;
import com.codewithronn.inventorymanagement.dtos.request.UserRequest;
import com.codewithronn.inventorymanagement.dtos.response.AuthResponse;
import com.codewithronn.inventorymanagement.dtos.response.UserResponse;
import com.codewithronn.inventorymanagement.entity.Users;
import com.codewithronn.inventorymanagement.repository.UserRepository;
import com.codewithronn.inventorymanagement.service.UserServices;
import com.codewithronn.inventorymanagement.service.impl.UserDetailsImpl;
import com.codewithronn.inventorymanagement.utility.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsImpl userDetailsImpl;
    private final UserServices  userServices;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) throws Exception {
        authenticate(authRequest.getEmail(), authRequest.getPassword());
        final UserDetails userDetails = userDetailsImpl.loadUserByUsername(authRequest.getEmail());
        String role = userServices.getUserRole(authRequest.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        return new AuthResponse(authRequest.getEmail(), role, jwtToken);
    }

    //Register user own account
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest userRequest) {
        try {
            userRequest.setRole("ROLE_USER");
            return userServices.createUser(userRequest);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpRequest otpRequest) {
        userServices.verifyOtp(otpRequest);
        return ResponseEntity.ok("Email verified successfully");
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestBody Map<String, String> request) {
        userServices.resendOtp(request.get("email"));
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/set-password")
    public ResponseEntity<String> setPassword(@RequestBody SetPasswordRequest request) {
        userServices.setPassword(request);
        return ResponseEntity.ok("Password set successfully. You can now login.");
    }

    private void authenticate(String email, String password) throws Exception {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (!user.isVerified()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email not verified. Please check your email for OTP.");
        }
        if (user.getCredential() == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Password not set. Please set your password first.");
        }
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("User account is disabled.");
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect email or password.");
        }
    }

    //For local development
    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> request) {
        return passwordEncoder.encode(request.get("password"));
    }
}
