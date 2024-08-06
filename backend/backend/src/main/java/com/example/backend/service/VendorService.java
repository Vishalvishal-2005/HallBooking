package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Vendor;
import com.example.backend.repository.VendorRepo;

@Service
public class VendorService {

    @Autowired
    private VendorRepo vendorRepo;

    public Vendor createVendor(Vendor vendor) {
        return vendorRepo.save(vendor);
    }

    public List<Vendor> getAllVendors() {
        return vendorRepo.findAll();
    }
}
