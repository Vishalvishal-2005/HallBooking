package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Registration;
import com.example.backend.model.Vendor;
import com.example.backend.service.RegistrationService;
import com.example.backend.service.VendorService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private VendorService vendorService;

    @PostMapping("/register")
    public ResponseEntity<Registration> register(@RequestBody Registration registration) {
        Registration createdRegistration = registrationService.createRegistration(registration);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRegistration);
    }

    @GetMapping("/registrations")
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @PutMapping("/registrations/{id}")
    public ResponseEntity<Registration> updateRegistration(@PathVariable("id") int id, @RequestBody Registration updatedRegistration) {
        Optional<Registration> existingRegistration = registrationService.getRegistrationById(id);
        if (existingRegistration.isPresent()) {
            Registration registration = existingRegistration.get();
            registration.setName(updatedRegistration.getName());
            registration.setEmail(updatedRegistration.getEmail());
            registration.setEvent(updatedRegistration.getEvent());
            registration.setMobile(updatedRegistration.getMobile());
            registration.setDate(updatedRegistration.getDate());
            Registration savedRegistration = registrationService.createRegistration(registration);
            return ResponseEntity.ok(savedRegistration);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/registrations/{id}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable("id") int id) {
        Optional<Registration> existingRegistration = registrationService.getRegistrationById(id);
        if (existingRegistration.isPresent()) {
            registrationService.deleteRegistration(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/vendors")
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
      //  System.out.println("Received Vendor: " + vendor.getDate()); // Debugging line
        Vendor createdVendor = vendorService.createVendor(vendor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVendor);
    }
    
    @GetMapping("/getall")
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }
}
