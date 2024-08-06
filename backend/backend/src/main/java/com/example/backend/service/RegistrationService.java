package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Registration;
import com.example.backend.repository.RegistrationRepo;

@Service
public class RegistrationService {
    @Autowired
    private RegistrationRepo registrationRepo;

    public Registration createRegistration(Registration registration) {
        return registrationRepo.save(registration);
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepo.findAll();
    }

    public Optional<Registration> getRegistrationById(int id) {
        return registrationRepo.findById(id);
    }

    public void deleteRegistration(int id) {
        registrationRepo.deleteById(id);
    }

}
