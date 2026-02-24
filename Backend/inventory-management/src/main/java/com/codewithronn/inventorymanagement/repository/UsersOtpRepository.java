/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.codewithronn.inventorymanagement.repository;

import com.codewithronn.inventorymanagement.entity.Users;
import com.codewithronn.inventorymanagement.entity.UsersOtp;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Ronn Kevin Rubio
 */
public interface UsersOtpRepository extends JpaRepository<UsersOtp, String> {
    Optional<UsersOtp> findByUser(Users user);

    @Modifying
    @Query("DELETE FROM UsersOtp o WHERE o.otpExpiry < :now")
    void deleteAllExpiredOtps(@Param("now") LocalDateTime now);

    @Modifying
    @Query("DELETE FROM UsersOtp o WHERE o.user = :user")
    void deleteByUser(@Param("user") Users user);
}
