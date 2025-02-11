package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Vendor;
import com.example.demo.repository.VendorRepository;

@Service
public class VendorService {
    @Autowired
    private VendorRepository vendorRepository;

    public Vendor saveVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor updateVendor(Long id, Vendor vendor) {
        if (vendorRepository.existsById(id)) {
            vendor.setId(id);
            return vendorRepository.save(vendor);
        }
        return null;
    }

    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }
}
