/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.repository;

import com.codewithronn.inventorymanagement.entity.FileUpload;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ronn Kevin Rubio
 */
@Repository
public interface FileUploadRepository extends JpaRepository<FileUpload, Long>{
    Optional<FileUpload> findByPublicId(String publicId);
}
