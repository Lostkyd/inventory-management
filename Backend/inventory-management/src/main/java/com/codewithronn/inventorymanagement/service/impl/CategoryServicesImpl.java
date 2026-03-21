package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.entity.Category;
import com.codewithronn.inventorymanagement.dtos.request.CategoryRequest;
import com.codewithronn.inventorymanagement.dtos.response.CategoryResponse;
import com.codewithronn.inventorymanagement.repository.CategoryRepository;
import com.codewithronn.inventorymanagement.repository.ProductRepository;
import com.codewithronn.inventorymanagement.service.CategoryServices;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CategoryServicesImpl implements CategoryServices {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    @CacheEvict(cacheNames = "categories", key = "'all'")
    public CategoryResponse add(CategoryRequest request) {

        Category cat = toEntity(request);
        cat = categoryRepository.save(cat);
        return toResponse(cat);

    }

    @Override
    @Cacheable(cacheNames = "categories", key = "'all'")
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    @CacheEvict(cacheNames = "categories", key = "'all'")
    public CategoryResponse update(String categoryId, String categoryName) {

        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        if (categoryName != null) {
            category.setCategoryName(categoryName);
        }

        category = categoryRepository.save(category);

        return toResponse(category);
    }

    @Override
    @Transactional
    @CacheEvict(cacheNames = "categories", key = "'all'")
    public void delete(String categoryId) {

        Category existCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found " + categoryId));

        categoryRepository.delete(existCategory);
    }

    private CategoryResponse toResponse(Category cat) {
        Integer productCounter = productRepository.countByCategoryId(cat.getId());

        return CategoryResponse.builder()
                .categoryId(cat.getCategoryId())
                .categoryName(cat.getCategoryName())
                .productCount(productCounter)
                .updatedAt(cat.getUpdatedAt())
                .createdAt(cat.getCreatedAt())
                .build();
    }

    private Category toEntity(CategoryRequest request) {
        return Category.builder()
                .categoryId(UUID.randomUUID().toString())
                .categoryName(request.getCategoryName())
                .build();
    }
}
