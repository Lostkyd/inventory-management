package com.codewithronn.inventorymanagement.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String userId;
    private String email;
    private String firstName;
    private String middleName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private LocalDate birthDate;
    @JsonProperty("isVerified")
    private boolean isVerified;
    private String role;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
