package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Bookings;
import com.example.demo.model.User;
import com.example.demo.repository.BookingsRepository;
import com.example.demo.repository.UserRepository;
@Service
public class BookingService {

    @Autowired
    private BookingsRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;  // Add this to retrieve the user by userId

    /**
     * Books a venue for a specified user.
     *
     * This method associates a booking with a user and a venue. It retrieves the user from the repository
     * using the provided user ID. If the user is not found, an IllegalArgumentException is thrown.
     * The booking object is then updated with the user and venue information and saved to the repository.
     *
     * @param userId the ID of the user for whom the venue is being booked
     * @param venueId the ID of the venue to be booked
     * @param booking the booking object containing details of the booking
     * @throws IllegalArgumentException if no user is found with the provided userId
     */
    public void bookVenueForUser(Long userId, Long venueId, Bookings booking) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        
        booking.setUser(user);  // Set the User object directly
        booking.setVenueId(venueId);
        bookingRepository.save(booking);
    }

    /**
     * Retrieves a list of bookings associated with a specific user.
     *
     * @param userId the ID of the user whose bookings are to be retrieved
     * @return a list of {@link Bookings} objects associated with the specified user
     * @throws IllegalArgumentException if the provided userId is null
     * @throws DataAccessException if there is an error accessing the booking data
     */
    public List<Bookings> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    /**
     * Retrieves a list of all bookings from the booking repository.
     *
     * @return a List of {@link Bookings} objects representing all bookings.
     * @throws DataAccessException if there is an error accessing the data source.
     */
    public List<Bookings> getAllBookings() {
        return bookingRepository.findAll();
    }
    /**
     * Deletes a booking from the repository by its unique identifier.
     *
     * This method checks if a booking with the specified ID exists in the repository.
     * If it exists, the booking is deleted and the method returns true. If it does not
     * exist, the method returns false without performing any deletion.
     *
     * @param id the unique identifier of the booking to be deleted
     * @return true if the booking was successfully deleted, false if no booking with the specified ID exists
     * @throws IllegalArgumentException if the provided ID is null
     */
    public boolean deleteBookingById(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
}
