package com.example.demo.controller;

import com.example.demo.model.Vendor;
import com.example.demo.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access API
public class VendorController {

    @Autowired
    private VendorService vendorService;
  
    @GetMapping
    /**
     * Retrieves a list of all vendors.
     *
     * This method interacts with the vendor service to fetch the complete list of vendors
     * and returns it wrapped in a ResponseEntity. The response will have an HTTP status of 200 (OK)
     * if the operation is successful.
     *
     * @return a ResponseEntity containing a list of Vendor objects.
     * @throws VendorServiceException if there is an error while retrieving the vendors from the service.
     */
    public ResponseEntity<List<Vendor>> getAllVendors() {
        return ResponseEntity.ok(vendorService.getAllVendors());
    }

    @GetMapping("/{id}")
    /**
     * Retrieves a vendor by its unique identifier.
     *
     * @param id the unique identifier of the vendor to be retrieved
     * @return a ResponseEntity containing the Vendor if found, or a 404 Not Found response if not found
     * @throws IllegalArgumentException if the provided id is null
     *
     * <p>This method interacts with the vendor service to fetch the vendor details.
     * If the vendor exists, it returns a ResponseEntity with an HTTP status of 200 OK
     * and the vendor data. If the vendor does not exist, it returns a ResponseEntity
     * with an HTTP status of 404 Not Found.</p>
     */
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) {
        Optional<Vendor> vendor = vendorService.getVendorById(id);
        return vendor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    /**
     * Adds a new vendor to the system.
     *
     * This method handles the HTTP POST request to create a new vendor.
     * It takes a {@link Vendor} object from the request body and saves it
     * using the vendor service. Upon successful creation, it returns a
     * {@link ResponseEntity} containing the saved vendor object.
     *
     * @param vendor the {@link Vendor} object to be added, must not be null
     * @return a {@link ResponseEntity} containing the saved {@link Vendor} object
     * @throws IllegalArgumentException if the provided vendor is null or invalid
     * @throws VendorServiceException if there is an error during the saving process
     */
    public ResponseEntity<Vendor> addVendor(@RequestBody Vendor vendor) {
        return ResponseEntity.ok(vendorService.saveVendor(vendor));
    }

    @DeleteMapping("/{id}")
    /**
     * Deletes a vendor identified by the given ID.
     *
     * This method interacts with the vendor service to remove the vendor from the system.
     * If the vendor is successfully deleted, it returns a response with no content (204 No Content).
     *
     * @param id the ID of the vendor to be deleted
     * @return a ResponseEntity with no content if the deletion is successful
     * @throws VendorNotFoundException if no vendor with the specified ID exists
     * @throws UnauthorizedAccessException if the user does not have permission to delete the vendor
     */
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }
}
