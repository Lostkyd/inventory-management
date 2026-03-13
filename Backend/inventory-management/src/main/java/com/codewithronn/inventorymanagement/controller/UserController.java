package com.codewithronn.inventorymanagement.controller;

import com.codewithronn.inventorymanagement.dtos.request.UpdateUserRequest;
import com.codewithronn.inventorymanagement.dtos.request.UserRequest;
import com.codewithronn.inventorymanagement.dtos.response.UserResponse;
import com.codewithronn.inventorymanagement.service.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {
    private final UserServices  userServices;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestBody UserRequest userRequest) {
        try{
            return userServices.createUser(userRequest);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable String id,
                                                   @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userServices.updateUser(id, request));
    }

    @GetMapping("/users")
    public List<UserResponse> getUsers() {
        return userServices.readUsers();
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id) {
        try {
            userServices.deleteUser(id);
            }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }
}
