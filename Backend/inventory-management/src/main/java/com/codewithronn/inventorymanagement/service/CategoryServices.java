package com.codewithronn.inventorymanagement.service;

import com.codewithronn.inventorymanagement.dtos.request.CategoryRequest;
import com.codewithronn.inventorymanagement.dtos.response.CategoryResponse;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CategoryServices {
    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete (String categoryId);
}
