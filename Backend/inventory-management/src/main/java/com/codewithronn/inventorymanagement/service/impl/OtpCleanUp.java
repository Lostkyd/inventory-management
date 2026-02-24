package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.repository.UsersOtpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpCleanUp {

    private final UsersOtpRepository usersOtpRepository;

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void deleteExpiredOtp() {
        usersOtpRepository.deleteAllExpiredOtps(LocalDateTime.now());
    }
}
