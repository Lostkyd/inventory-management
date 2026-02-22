/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codewithronn.inventorymanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Ronn Kevin Rubio
 */
@Entity
@Table(name = "user_credentials")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentials {

    @Id
    private String id;
    @Column(unique = true)
    private String email;
    
    private String password;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private Users user;
}
