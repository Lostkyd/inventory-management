package com.codewithronn.inventorymanagement.controller;

import com.codewithronn.inventorymanagement.dtos.request.CategoryRequest;
import com.codewithronn.inventorymanagement.dtos.response.CategoryResponse;
import com.codewithronn.inventorymanagement.service.CategoryServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryServices categoryServices;

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(
            @RequestPart("category") String categoryString,
            @RequestPart("file") MultipartFile file) {
        
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request = null;
        try{
            request = objectMapper.readValue(categoryString,  CategoryRequest.class);
            return categoryServices.add(request,file);
        }catch (JsonProcessingException ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Exception occurred while parsing the json" + ex.getMessage());
        }
    }

    @PutMapping("/admin/categories/{categoryId}")
    public CategoryResponse updateCategory(
            @PathVariable String categoryId,
            @RequestPart("categoryName") String categoryName,
            @RequestPart(value = "categoryDescription", required = false) String categoryDescription,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return categoryServices.update(categoryId, categoryName, categoryDescription, file);
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
