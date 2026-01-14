/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.controller;

import com.codewithronn.inventorymanagement.dtos.response.FileUploadResponse;
import com.codewithronn.inventorymanagement.service.FileUploadServices;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ronn Kevin Rubio
 */

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FileUploadController {
    private final FileUploadServices fileUploadServices;
    
    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file) {
        
        FileUploadResponse response = fileUploadServices.upload(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/upload/{folder}")
    public ResponseEntity<FileUploadResponse> uploadFileToFolder(
            @RequestParam("file") MultipartFile file,
            @PathVariable String folder) {
        
        FileUploadResponse response = fileUploadServices.upload(file, folder);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    public ResponseEntity<List<FileUploadResponse>> getAllFiles() {
        List<FileUploadResponse> files = fileUploadServices.read();
        return ResponseEntity.ok(files);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FileUploadResponse> getFileById(@PathVariable Long id) {
        FileUploadResponse response = fileUploadServices.readById(id);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        fileUploadServices.delete(id);
        return ResponseEntity.noContent().build();
    }
}
