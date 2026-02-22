/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.codewithronn.inventorymanagement.repository;

import com.codewithronn.inventorymanagement.entity.Products;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ronn Kevin Rubio
 */
public interface ProductRepository extends JpaRepository<Products, String>{
    Optional<Products> findByProductId(String id);
    
    Integer totalByCategoryId(Long id);
}
