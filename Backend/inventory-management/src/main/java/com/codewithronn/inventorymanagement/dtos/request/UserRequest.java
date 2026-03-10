package com.codewithronn.inventorymanagement.dtos.request;

import com.codewithronn.inventorymanagement.utility.types.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String email;
    private Role role;
}
