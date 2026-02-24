/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.codewithronn.inventorymanagement.repository;

import com.codewithronn.inventorymanagement.entity.UserCredentials;
import com.codewithronn.inventorymanagement.entity.Users;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ronn Kevin Rubio
 */
public interface UserCredentialsRepository extends JpaRepository<UserCredentials, String> {
    Optional<UserCredentials> findByUser(Users user);

    boolean existsByUser(Users user);
}
