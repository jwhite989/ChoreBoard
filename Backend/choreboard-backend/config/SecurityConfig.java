package com.example.choreboard_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests((requests) -> requests
                .antMatchers("/api/users/**").authenticated()
                .antMatchers("/api/chores/**").authenticated()
                .antMatchers("/api/rewards/**").authenticated()
                .anyRequest().permitAll())
            .httpBasic();
        return http.build();
    }
} 