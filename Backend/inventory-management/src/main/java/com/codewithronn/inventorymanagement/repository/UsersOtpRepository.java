/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.codewithronn.inventorymanagement.repository;

import com.codewithronn.inventorymanagement.entity.Users;
import com.codewithronn.inventorymanagement.entity.UsersOtp;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ronn Kevin Rubio
 */
public interface UsersOtpRepository extends JpaRepository<UsersOtp, String>{
    Optional<UsersOtp> findByUser(Users user);
}
