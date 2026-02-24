package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.entity.Category;
import com.codewithronn.inventorymanagement.dtos.request.CategoryRequest;
import com.codewithronn.inventorymanagement.dtos.response.CategoryResponse;
import com.codewithronn.inventorymanagement.dtos.response.FileUploadResponse;
import com.codewithronn.inventorymanagement.repository.CategoryRepository;
import com.codewithronn.inventorymanagement.repository.ProductRepository;
import com.codewithronn.inventorymanagement.service.CategoryServices;
import com.codewithronn.inventorymanagement.service.FileUploadServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CategoryServicesImpl implements CategoryServices {

    private final CategoryRepository categoryRepository;
    private final FileUploadServices fileUploadServices;
    private final ProductRepository productRepository;


    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
        FileUploadResponse imgUrl = fileUploadServices.upload(file);
        Category cat = toEntity(request);
        cat.setImgUrl(imgUrl.getCloudinaryUrl());
        cat.setPublicId(imgUrl.getPublicId());
        cat = categoryRepository.save(cat);
        return toResponse(cat);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public void delete(String categoryId) {
        Category existCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found" + categoryId));
        fileUploadServices.deleteByPublicId(existCategory.getPublicId());
        categoryRepository.delete(existCategory);
    }

    private CategoryResponse toResponse(Category cat) {
        Integer productCounter = productRepository.countByCategoryId(cat.getId());
        return CategoryResponse.builder()
                .categoryId(cat.getCategoryId())
                .categoryName(cat.getCategoryName())
                .categoryDescription(cat.getCategoryDescription())
                .productCount(productCounter)
                .imgUrl(cat.getImgUrl())
                .updatedAt(cat.getUpdatedAt())
                .createdAt(cat.getCreatedAt())
                .build();
    }

    private Category toEntity(CategoryRequest request) {
        return Category.builder()
                .categoryId(UUID.randomUUID().toString())
                .categoryName(request.getCategoryName())
                .categoryDescription(request.getCategoryDescription())
                .build();
    }
}
