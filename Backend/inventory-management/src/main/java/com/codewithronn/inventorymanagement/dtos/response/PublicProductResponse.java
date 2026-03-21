package com.codewithronn.inventorymanagement.dtos.response;

import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PublicProductResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private String imgUrl;
    private String categoryName;
    private boolean available;
}
