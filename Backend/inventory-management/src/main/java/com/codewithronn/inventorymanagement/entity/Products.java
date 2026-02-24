package com.codewithronn.inventorymanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

/**
 *
 * @author Ronn Kevin Rubio
 */

@Entity
@Table(name = "product_tbl")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Products {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(unique = true)
    private String productId;
    
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private Integer productQuantity;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;
    
    @UpdateTimestamp
    private Timestamp updatedAt;
    
    private String imgUrl;
    private String publicId; 
    
    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private Category category;
    
}
