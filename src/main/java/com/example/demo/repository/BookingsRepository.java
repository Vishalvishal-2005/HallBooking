package com.example.demo.repository;

import com.example.demo.model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
    /**
     * Retrieves a list of bookings associated with the specified user ID.
     *
     * @param userId the ID of the user whose bookings are to be retrieved
     * @return a list of {@link Bookings} objects associated with the specified user ID
     * @throws IllegalArgumentException if the provided userId is null
     * @throws DataAccessException if there is an error accessing the data source
     */
    List<Bookings> findByUserId(Long userId);
    
    // Fetch all bookings with user details
    /**
     * Retrieves a list of all bookings.
     *
     * @return a List of {@link Bookings} objects representing all bookings.
     * @throws DataAccessException if there is an error accessing the data source.
     * @throws IllegalStateException if the method is called when the service is not initialized.
     */
    List<Bookings> findAll();
}
