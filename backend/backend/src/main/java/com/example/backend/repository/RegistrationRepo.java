package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Registration;

public interface RegistrationRepo extends JpaRepository<Registration, Integer> {
}
