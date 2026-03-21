package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.dtos.request.ProductRequest;
import com.codewithronn.inventorymanagement.dtos.response.FileUploadResponse;
import com.codewithronn.inventorymanagement.dtos.response.ProductResponse;
import com.codewithronn.inventorymanagement.dtos.response.PublicProductResponse;
import com.codewithronn.inventorymanagement.entity.Category;
import com.codewithronn.inventorymanagement.entity.Products;
import com.codewithronn.inventorymanagement.repository.CategoryRepository;
import com.codewithronn.inventorymanagement.repository.ProductRepository;
import com.codewithronn.inventorymanagement.service.FileUploadServices;
import com.codewithronn.inventorymanagement.service.ProductServices;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class ProductServicesImpl implements ProductServices {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FileUploadServices fileUploadServices;

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "products"),
            @CacheEvict(cacheNames = "publicProducts")
    })
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
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "products"),
            @CacheEvict(cacheNames = "publicProducts")
    })
    public ProductResponse update(String productId, String productData, MultipartFile file) {
        Products product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        ObjectMapper mapper = new ObjectMapper();
        try {
            ProductRequest request = mapper.readValue(productData, ProductRequest.class);
            if (request.getProductName() != null) product.setProductName(request.getProductName());
            if (request.getProductDescription() != null) product.setProductDescription(request.getProductDescription());
            if (request.getProductPrice() != null) product.setProductPrice(request.getProductPrice());
            if (request.getProductQuantity() != null) product.setProductQuantity(request.getProductQuantity());
            if (request.getCategoryId() != null) {
                Category category = categoryRepository.findByCategoryId(request.getCategoryId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
                product.setCategory(category);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid product");
        }

        String previousPublicId = product.getPublicId();
        if (file != null && !file.isEmpty()) {
            FileUploadResponse imgUrl = fileUploadServices.upload(file);
            product.setImgUrl(imgUrl.getCloudinaryUrl());
            product.setPublicId(imgUrl.getPublicId());
        }

        product = productRepository.save(product);
        if (file != null && !file.isEmpty() && previousPublicId != null && !previousPublicId.equals(product.getPublicId())) {
            fileUploadServices.deleteByPublicId(previousPublicId);
        }
        return toResponse(product);
    }

    @Override
    @Cacheable(cacheNames = "products")
    public List<ProductResponse> fetchProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "products"),
            @CacheEvict(cacheNames = "publicProducts")
    })
    public void deleteProduct(String productId) {
        Products existProduct = productRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));
        String publicId = existProduct.getPublicId();
        productRepository.delete(existProduct);
        productRepository.flush();
        if (publicId != null) {
            fileUploadServices.deleteByPublicId(publicId);
        }
    }

    @Override
    @Cacheable(cacheNames = "publicProducts")
    public List<PublicProductResponse> fetchAvailablePublicProducts() {
        return productRepository.findAll()
                .stream()
                .filter(product -> product.getProductQuantity() != null && product.getProductQuantity() > 0)
                .map(this::toPublicResponse)
                .collect(Collectors.toList());
    }

    private PublicProductResponse toPublicResponse(Products product) {
        return PublicProductResponse.builder()
                .productId(product.getProductId())
                .productName(product.getProductName())
                .productDescription(product.getProductDescription())
                .productPrice(product.getProductPrice())
                .imgUrl(product.getImgUrl())
                .categoryName(product.getCategory().getCategoryName())
                .available(product.getProductQuantity() != null && product.getProductQuantity() > 0)
                .build();
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
