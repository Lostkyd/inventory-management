package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.dtos.response.FileUploadResponse;
import com.codewithronn.inventorymanagement.entity.FileUpload;
import com.codewithronn.inventorymanagement.repository.FileUploadRepository;
import com.codewithronn.inventorymanagement.service.FileUploadServices;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ronn Kevin Rubio
 */

@Service
@RequiredArgsConstructor
public class FileUploadServicesImpl implements FileUploadServices{

    private final CloudinaryServices cloudinaryServices;
    private final FileUploadRepository fileUploadRepository;
    private static final String DEFAULT_FOLDER = "inventory-file";

    @Override
    public FileUploadResponse upload(MultipartFile file) {
        return upload(file, DEFAULT_FOLDER);
    }

    @Override
    public FileUploadResponse upload(MultipartFile file, String folder) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        Map uploadResult = cloudinaryServices.uploadFile(file, folder);
        FileUpload fileUpload = new FileUpload();
        fileUpload.setFilename(file.getOriginalFilename());
        fileUpload.setCloudinaryUrl(uploadResult.get("secure_url").toString());
        fileUpload.setPublicId(uploadResult.get("public_id").toString());
        fileUpload.setContentType(file.getContentType());
        fileUpload.setFileSize(file.getSize());
        fileUpload.setResourceType(uploadResult.get("resource_type").toString());

        FileUpload savedFile = fileUploadRepository.save(fileUpload);

        return mapToResponse(savedFile);
    }

    @Override
    public List<FileUploadResponse> read() {
        return fileUploadRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FileUploadResponse readById(Long id) {
        FileUpload fileUpload = fileUploadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + id));
        return mapToResponse(fileUpload);
    }

    @Override
    public void delete(Long fileId) {
        FileUpload fileUpload = fileUploadRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + fileId));

        cloudinaryServices.deleteFile(fileUpload.getPublicId());
        fileUploadRepository.delete(fileUpload);
    }

    @Override
    public void deleteByPublicId(String publicId) {
        FileUpload fileUpload = fileUploadRepository.findByPublicId(publicId)
                .orElseThrow(() -> new RuntimeException("File not found with publicId: " + publicId));

        cloudinaryServices.deleteFile(fileUpload.getPublicId());
        fileUploadRepository.delete(fileUpload);
    }

    private FileUploadResponse mapToResponse(FileUpload fileEntity) {
        return FileUploadResponse.builder()
                .id(fileEntity.getId())
                .filename(fileEntity.getFilename())
                .cloudinaryUrl(fileEntity.getCloudinaryUrl())
                .publicId(fileEntity.getPublicId())
                .contentType(fileEntity.getContentType())
                .fileSize(fileEntity.getFileSize())
                .resourceType(fileEntity.getResourceType())
                .uploadedAt(fileEntity.getUploadedAt())
                .build();
    }
}