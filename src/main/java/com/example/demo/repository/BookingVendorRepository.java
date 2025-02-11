package com.example.demo.repository;

import com.example.demo.model.BookingVendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingVendorRepository extends JpaRepository<BookingVendor, Long> {
    /**
     * Retrieves a list of BookingVendor entities associated with a specific user ID.
     *
     * @param userId the ID of the user whose associated BookingVendor entities are to be retrieved
     * @return a list of BookingVendor entities associated with the specified user ID
     * @throws IllegalArgumentException if the provided userId is null
     * @throws DataAccessException if there is an error accessing the data source
     */
    List<BookingVendor> findByUser_Id(Long userId); // Correct Mapping
}
