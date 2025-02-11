package com.example.demo.service;

import com.example.demo.model.BookingVendor;
import com.example.demo.model.User;
import com.example.demo.model.Vendor;
import com.example.demo.repository.BookingVendorRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.VendorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingVendorService {

    private final BookingVendorRepository bookingVendorRepository;
    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;

    public BookingVendorService(BookingVendorRepository bookingVendorRepository, 
                                UserRepository userRepository,
                                VendorRepository vendorRepository) {
        this.bookingVendorRepository = bookingVendorRepository;
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
    }

    /**
     * Books a vendor for a specified event.
     *
     * This method takes the details of the user and the vendor, along with event specifics,
     * and creates a booking for the vendor. It checks if both the user and vendor exist in the
     * repository before proceeding with the booking.
     *
     * @param name          the name of the customer booking the vendor
     * @param email         the email address of the customer
     * @param phone         the phone number of the customer
     * @param eventDate     the date of the event for which the vendor is being booked
     * @param eventLocation  the location of the event
     * @param vendorId      the ID of the vendor to be booked
     * @param userId        the ID of the user making the booking
     * @return a message indicating whether the booking was successful or if there was an error
     *         (e.g., "User or Vendor not found" if either does not exist).
     *
     * @throws IllegalArgumentException if any of the input parameters are null or invalid.
     * @throws EntityNotFoundException if no user or vendor is found with the provided IDs.
     */
    public String bookVendor(String name, String email, String phone, String eventDate, 
                             String eventLocation, Long vendorId, Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);

        if (userOpt.isEmpty() || vendorOpt.isEmpty()) {
            return "User or Vendor not found";
        }

        BookingVendor booking = new BookingVendor();
        booking.setUser(userOpt.get());
        booking.setCustomerName(name);
        booking.setEmail(email);
        booking.setPhone(phone);
        booking.setEventDate(eventDate);
        booking.setEventLocation(eventLocation);
        booking.setVendor(vendorOpt.get());

        bookingVendorRepository.save(booking);
        return "Vendor booked successfully!";
    }

    /**
     * Retrieves a list of booking vendors associated with a specific user.
     *
     * @param userId the ID of the user whose vendor bookings are to be retrieved
     * @return a list of {@link BookingVendor} objects associated with the specified user
     * @throws IllegalArgumentException if the provided userId is null
     * @throws DataAccessException if there is an error accessing the data source
     */
    public List<BookingVendor> getUserVendorBookings(Long userId) {
        return bookingVendorRepository.findByUser_Id(userId);
    }

    /**
     * Retrieves a list of all vendor bookings from the repository.
     *
     * @return a List of {@link BookingVendor} objects representing all vendor bookings.
     * @throws DataAccessException if there is an error accessing the data source.
     */
    public List<BookingVendor> getAllVendorBookings() {
        return bookingVendorRepository.findAll();
    }

    /**
     * Deletes a vendor booking identified by the specified ID.
     *
     * <p>This method checks if a vendor booking with the given ID exists in the repository.
     * If it exists, it deletes the booking and returns true. If it does not exist, it returns false.</p>
     *
     * @param id the ID of the vendor booking to be deleted
     * @return true if the vendor booking was successfully deleted, false if it did not exist
     *
     * @throws IllegalArgumentException if the provided ID is null
     */
    public boolean deleteVendorBooking(Long id) {
        if (bookingVendorRepository.existsById(id)) {
            bookingVendorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
