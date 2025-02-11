package com.example.demo.service;

import com.example.demo.model.Vendor;
import com.example.demo.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    /**
     * Retrieves a list of all vendors from the repository.
     *
     * @return a List of {@link Vendor} objects representing all vendors.
     * @throws DataAccessException if there is an error accessing the vendor data.
     */
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    /**
     * Retrieves a {@link Vendor} by its unique identifier.
     *
     * This method queries the vendor repository to find a vendor associated with the given ID.
     * If a vendor with the specified ID exists, it returns an {@link Optional} containing the vendor.
     * If no vendor is found, it returns an empty {@link Optional}.
     *
     * @param id the unique identifier of the vendor to be retrieved
     * @return an {@link Optional} containing the found {@link Vendor}, or an empty {@link Optional} if no vendor is found
     * @throws IllegalArgumentException if the provided ID is null
     */
    public Optional<Vendor> getVendorById(Long id) {
        return vendorRepository.findById(id);
    }

    /**
     * Saves the given vendor to the repository.
     *
     * This method takes a {@link Vendor} object and persists it in the underlying data store.
     * If the vendor already exists, it may update the existing record based on the implementation
     * of the {@link VendorRepository}.
     *
     * @param vendor the {@link Vendor} object to be saved
     * @return the saved {@link Vendor} object, which may include additional information such as
     *         generated IDs or timestamps
     * @throws IllegalArgumentException if the provided vendor is null or invalid
     * @throws DataAccessException if there is an error while accessing the data store
     */
    public Vendor saveVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    /**
     * Deletes a vendor from the repository based on the provided vendor ID.
     *
     * @param id the ID of the vendor to be deleted
     * @throws IllegalArgumentException if the provided ID is null
     * @throws EntityNotFoundException if no vendor with the specified ID exists in the repository
     */
    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }
}
