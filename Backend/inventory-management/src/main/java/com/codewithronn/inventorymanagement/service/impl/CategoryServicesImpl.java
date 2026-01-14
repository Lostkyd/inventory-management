package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.entity.Category;
import com.codewithronn.inventorymanagement.io.CategoryRequest;
import com.codewithronn.inventorymanagement.io.CategoryResponse;
import com.codewithronn.inventorymanagement.repository.CategoryRepository;
import com.codewithronn.inventorymanagement.service.CategoryServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServicesImpl implements CategoryServices {

    private final CategoryRepository categoryRepository;


    @Override
    public CategoryResponse add(CategoryRequest request) {
        Category cat = toEntity(request);
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
        categoryRepository.delete(existCategory);
    }

    private CategoryResponse toResponse(Category cat) {
        return CategoryResponse.builder()
                .categoryId(cat.getCategoryId())
                .categoryName(cat.getCategoryName())
                .categoryDescription(cat.getCategoryDescription())
                .bgColor(cat.getBgColor())
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
                .bgColor(request.getBgColor())
                .build();
    }
}
