package com.codewithronn.inventorymanagement.service;

import com.codewithronn.inventorymanagement.io.CategoryRequest;
import com.codewithronn.inventorymanagement.io.CategoryResponse;

import java.util.List;

public interface CategoryServices {
    CategoryResponse add(CategoryRequest request);

    List<CategoryResponse> read();

    void delete (String categoryId);
}
