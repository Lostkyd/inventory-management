/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.codewithronn.inventorymanagement.service;

import com.codewithronn.inventorymanagement.dtos.request.ProductRequest;
import com.codewithronn.inventorymanagement.dtos.response.ProductResponse;
import java.util.List;

import com.codewithronn.inventorymanagement.dtos.response.PublicProductResponse;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ronn Kevin Rubio
 */
public interface ProductServices {
    ProductResponse add(ProductRequest productRequest, MultipartFile file);

    ProductResponse update(String productId, String productData, MultipartFile file);

    List<ProductResponse> fetchProducts();

    void deleteProduct(String productId);

    // For public product
    List<PublicProductResponse> fetchAvailablePublicProducts();
}
