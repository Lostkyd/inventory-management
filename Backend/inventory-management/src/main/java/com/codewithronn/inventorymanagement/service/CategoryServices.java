package com.codewithronn.inventorymanagement.service;

import com.codewithronn.inventorymanagement.dtos.request.CategoryRequest;
import com.codewithronn.inventorymanagement.dtos.response.CategoryResponse;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CategoryServices {
    CategoryResponse add(CategoryRequest request);

    List<CategoryResponse> read();

    CategoryResponse update(String categoryId, String categoryName);

    void delete (String categoryId);
}
