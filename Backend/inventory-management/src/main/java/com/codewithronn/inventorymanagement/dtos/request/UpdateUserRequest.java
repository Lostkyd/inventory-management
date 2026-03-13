package com.codewithronn.inventorymanagement.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
    private String firstName;
    private String middleName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private LocalDate birthDate;
}