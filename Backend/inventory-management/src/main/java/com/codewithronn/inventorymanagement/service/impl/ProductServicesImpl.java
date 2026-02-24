
package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.dtos.request.ProductRequest;
import com.codewithronn.inventorymanagement.dtos.response.FileUploadResponse;
import com.codewithronn.inventorymanagement.dtos.response.ProductResponse;
import com.codewithronn.inventorymanagement.entity.Category;
import com.codewithronn.inventorymanagement.entity.Products;
import com.codewithronn.inventorymanagement.repository.CategoryRepository;
import com.codewithronn.inventorymanagement.repository.ProductRepository;
import com.codewithronn.inventorymanagement.service.FileUploadServices;
import com.codewithronn.inventorymanagement.service.ProductServices;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ronn Kevin Rubio
 */

@Service
@RequiredArgsConstructor
public class ProductServicesImpl implements ProductServices {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FileUploadServices fileUploadServices;

    @Override
    public ProductResponse add(ProductRequest productRequest, MultipartFile file) {
        Category category = categoryRepository.findByCategoryId(productRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        FileUploadResponse imgUrl = fileUploadServices.upload(file);

        Products product = Products.builder()
                .productId(UUID.randomUUID().toString())
                .productName(productRequest.getProductName())
                .productDescription(productRequest.getProductDescription())
                .productQuantity(productRequest.getProductQuantity())
                .productPrice(productRequest.getProductPrice())
                .imgUrl(imgUrl.getCloudinaryUrl())
                .publicId(imgUrl.getPublicId())
                .category(category)
                .build();

        product = productRepository.save(product);
        return toResponse(product);
    }

    @Override
    public List<ProductResponse> fetchProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public void deleteProduct(String productId) {
        Products existProduct = productRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));
        fileUploadServices.deleteByPublicId(existProduct.getPublicId());
        productRepository.delete(existProduct);
    }

    private ProductResponse toResponse(Products product) {
        return ProductResponse.builder()
                .productId(product.getProductId())
                .productName(product.getProductName())
                .productDescription(product.getProductDescription())
                .productPrice(product.getProductPrice())
                .productQuantity(product.getProductQuantity())
                .imgUrl(product.getImgUrl())
                .categoryId(product.getCategory().getCategoryId())
                .categoryName(product.getCategory().getCategoryName())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}
