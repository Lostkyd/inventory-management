package com.codewithronn.inventorymanagement.dtos.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Ronn Kevin Rubio
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponse {
    private Long id;
    private String filename;
    private String cloudinaryUrl;
    private String publicId;
    private String contentType;
    private Long fileSize;
    private String resourceType;
    private LocalDateTime uploadedAt;
}