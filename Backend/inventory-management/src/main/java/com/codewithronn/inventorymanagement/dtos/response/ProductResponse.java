/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.dtos.response;

import java.math.BigDecimal;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Ronn Kevin Rubio
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    
    private String productId;
    private String categoryId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private String categoryName;
    private String imgUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
