package com.codewithronn.inventorymanagement.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DotEnvLoader {
    private static final Logger logger = LoggerFactory.getLogger(DotEnvLoader.class);

    static {
        // Only load .env in development, not in production
        String activeProfile = System.getProperty("spring.profiles.active");
        
        if (activeProfile == null || activeProfile.isEmpty() || "dev".equals(activeProfile)) {
            try {
                Dotenv dotenv = Dotenv.configure()
                    .ignoreIfMissing()
                    .load();
                
                dotenv.entries().forEach(entry -> {
                    System.setProperty(entry.getKey(), entry.getValue());
                    logger.debug("Loaded property: {}", entry.getKey());
                });
                
                logger.info(".env file loaded successfully");
            } catch (Exception e) {
                logger.warn("Failed to load .env file: {}", e.getMessage());
            }
        } else {
            logger.info("Skipping .env file loading for profile: {}", activeProfile);
        }
    }
}