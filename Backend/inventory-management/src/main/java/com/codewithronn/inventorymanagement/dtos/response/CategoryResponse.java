package com.codewithronn.inventorymanagement.dtos.response;

import java.io.Serial;
import java.io.Serializable;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class CategoryResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String categoryId;
    private String categoryName;
    private String categoryDescription;
    private Integer productCount;
    private String imgUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
