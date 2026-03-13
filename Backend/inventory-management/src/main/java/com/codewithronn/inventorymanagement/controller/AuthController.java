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
import com.codewithronn.inventorymanagement.utility.types.Role;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsImpl userDetailsImpl;
    private final UserServices  userServices;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest,
                                              HttpServletResponse response) throws Exception {
        authenticate(authRequest.getEmail(), authRequest.getPassword());

        final UserDetails userDetails = userDetailsImpl.loadUserByUsername(authRequest.getEmail());
        String role = userServices.getUserRole(authRequest.getEmail());
        String firstName = userServices.getUserFirstName(authRequest.getEmail());

        final String accessToken = jwtUtil.generateAccessToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        Cookie accessCookie = new Cookie("access_token", accessToken);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(false);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(60 * 15);
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refresh_token", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(60 * 60 * 24 * 7);
        response.addCookie(refreshCookie);

        return ResponseEntity.ok(new AuthResponse(authRequest.getEmail(), role, null, firstName));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("refresh_token".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token missing");
        }

        try {
            String email = jwtUtil.extractUsername(refreshToken);
            UserDetails userDetails = userDetailsImpl.loadUserByUsername(email);

            if (!jwtUtil.validateRefreshToken(refreshToken, userDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }

            String newAccessToken = jwtUtil.generateAccessToken(userDetails);

            Cookie accessCookie = new Cookie("access_token", newAccessToken);
            accessCookie.setHttpOnly(true);
            accessCookie.setSecure(false);
            accessCookie.setPath("/");
            accessCookie.setMaxAge(60 * 15); // 15 minutes
            response.addCookie(accessCookie);

            return ResponseEntity.ok("Access token refreshed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie accessCookie = new Cookie("access_token", "");
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(false);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(0);
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refresh_token", "");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);
        response.addCookie(refreshCookie);

        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(HttpServletRequest request) {
        String jwt = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("access_token".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            String email = jwtUtil.extractUsername(jwt);
            String role = userServices.getUserRole(email);
            String firstName = userServices.getUserFirstName(email);
            return ResponseEntity.ok(new AuthResponse(email, role, null, firstName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    //Register user own account
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest userRequest) {
        try {
            userRequest.setRole(Role.ROLE_USER);
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
}
