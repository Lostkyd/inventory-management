package com.codewithronn.inventorymanagement;

import com.codewithronn.inventorymanagement.config.DotEnvLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InventoryManagementApplication {
    static {
            new DotEnvLoader();
        }
    public static void main(String[] args) {
        SpringApplication.run(InventoryManagementApplication.class, args);
    }

}
