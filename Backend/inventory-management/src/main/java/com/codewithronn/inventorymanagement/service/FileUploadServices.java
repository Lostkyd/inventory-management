/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.codewithronn.inventorymanagement.service;

import com.codewithronn.inventorymanagement.dtos.response.FileUploadResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ronn Kevin Rubio
 */

public interface FileUploadServices {
    FileUploadResponse upload(MultipartFile file);
    
    FileUploadResponse upload(MultipartFile file, String folder);
    
    List<FileUploadResponse> read();
    
    FileUploadResponse readById(Long id);
    
    void delete(Long fileId);
    
    void deleteByPublicId(String publicId);
}
