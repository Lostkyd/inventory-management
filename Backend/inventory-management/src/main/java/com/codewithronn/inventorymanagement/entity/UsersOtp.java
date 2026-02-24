package com.codewithronn.inventorymanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Ronn Kevin Rubio
 */
@Entity
@Table(name = "user_otp")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsersOtp {

    @Id
    private String id;
    private String emailOtp;
    private LocalDateTime otpExpiry;
    private LocalDateTime lastOtpSentAt;
    private Integer attempts;
    private Integer resendCount;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;
}