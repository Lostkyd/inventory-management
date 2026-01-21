package com.codewithronn.inventorymanagement.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    private String categoryName;
    private String categoryDescription;
}
