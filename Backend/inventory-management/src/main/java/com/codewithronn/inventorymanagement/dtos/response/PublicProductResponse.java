package com.codewithronn.inventorymanagement.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PublicProductResponse {
    private String productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private String imgUrl;
    private String categoryName;
    private boolean available;
}