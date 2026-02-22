/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.dtos.request;

import java.math.BigDecimal;
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
public class ProductRequest {
    
    private String categoryId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
}
