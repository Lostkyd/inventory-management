package com.codewithronn.inventorymanagement.controller;

import com.codewithronn.inventorymanagement.dtos.request.CategoryRequest;
import com.codewithronn.inventorymanagement.dtos.response.CategoryResponse;
import com.codewithronn.inventorymanagement.service.CategoryServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryServices categoryServices;

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestBody CategoryRequest request) {
        return categoryServices.add(request);
    }

    @PutMapping("/admin/categories/{categoryId}")
    public CategoryResponse updateCategory(
            @PathVariable String categoryId,
            @RequestBody CategoryRequest request) {
        return categoryServices.update(categoryId, request.getCategoryName());
    }

    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories(){
        return categoryServices.read();

    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/categories/{categoryId}")
    public void deleteCategory(@PathVariable String categoryId){
        try {
            categoryServices.delete(categoryId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
