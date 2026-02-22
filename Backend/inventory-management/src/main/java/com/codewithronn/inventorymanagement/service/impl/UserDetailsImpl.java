package com.codewithronn.inventorymanagement.service.impl;

import com.codewithronn.inventorymanagement.entity.Users;
import com.codewithronn.inventorymanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsImpl  implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found" + email));
        
        String password = existingUser.getCredential().getPassword();
        
        return new User(existingUser.getEmail(), password, Collections.singleton(new SimpleGrantedAuthority(existingUser.getRole())));
    }
}
