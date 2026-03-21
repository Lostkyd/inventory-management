package com.codewithronn.inventorymanagement.service;

import com.codewithronn.inventorymanagement.dtos.request.CategoryRequest;
import com.codewithronn.inventorymanagement.dtos.response.CategoryResponse;

import java.util.List;

public interface CategoryServices {
    CategoryResponse add(CategoryRequest request);

    List<CategoryResponse> read();

    CategoryResponse update(String categoryId, String categoryName);

    void delete (String categoryId);
}
