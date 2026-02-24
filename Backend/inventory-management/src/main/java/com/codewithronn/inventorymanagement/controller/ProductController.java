/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.controller;

import com.codewithronn.inventorymanagement.dtos.request.ProductRequest;
import com.codewithronn.inventorymanagement.dtos.response.ProductResponse;
import com.codewithronn.inventorymanagement.service.ProductServices;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

/**
 *
 * @author Ronn Kevin Rubio
 */

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductServices productServices;

    @PostMapping("/admin/products")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse addProduct(@RequestPart("product") String productString,
                                   @RequestPart("file")MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();
        ProductRequest pRequest = null;
        try{
            pRequest = mapper.readValue(productString, ProductRequest.class);
            return productServices.add(pRequest, file);
        }catch (JsonParseException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Exception occured while parsing the json" + e.getMessage());
        }
    }

    @GetMapping("/products")
    public List<ProductResponse> getItems(){
        return productServices.fetchProducts();
    }

    @DeleteMapping("/admin/products/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable("productId") String productId){
        try{
            productServices.deleteProduct(productId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found" + e.getMessage());
        }
    }
}
