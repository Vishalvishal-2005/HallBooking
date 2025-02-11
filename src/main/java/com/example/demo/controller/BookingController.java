package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.BookingVendor;
import com.example.demo.model.Bookings;
import com.example.demo.service.BookingService;
import com.example.demo.service.BookingVendorService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private BookingVendorService bookingVendorService;
    
    
    @PostMapping("/{userId}/venues/{venueId}")
    /**
     * Books a venue for a specified user.
     *
     * This method handles the booking of a venue by a user identified by their user ID.
     * It takes the venue ID and booking details as input and processes the booking request.
     *
     * @param userId the ID of the user who is booking the venue
     * @param venueId the ID of the venue to be booked
     * @param booking an object containing the booking details
     * @return a ResponseEntity containing a success message if the booking is successful
     * @throws IllegalArgumentException if the userId or venueId is null or invalid
     * @throws VenueNotAvailableException if the venue is not available for booking at the requested time
     * @throws BookingServiceException if there is an error processing the booking request
     */
    public ResponseEntity<String> bookVenueForUser(
            @PathVariable("userId") Long userId, 
            @PathVariable("venueId") Long venueId, 
            @RequestBody Bookings booking) {
        
        bookingService.bookVenueForUser(userId, venueId, booking);
        return ResponseEntity.ok("Venue booked successfully");
    }

    @GetMapping("/{userId}")
    /**
     * Retrieves a list of bookings for a specified user.
     *
     * @param userId the ID of the user whose bookings are to be retrieved
     * @return a ResponseEntity containing a list of bookings for the specified user
     * @throws UserNotFoundException if no user is found with the given userId
     * @throws BookingServiceException if there is an error retrieving the bookings from the service
     */
    public ResponseEntity<List<Bookings>> getUserBookings(@PathVariable("userId") Long userId) {
        List<Bookings> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }
    

    @GetMapping("/admin/all")
    /**
     * Retrieves a list of all bookings.
     *
     * This method interacts with the booking service to fetch all bookings
     * and returns them wrapped in a ResponseEntity with an HTTP 200 OK status.
     *
     * @return a ResponseEntity containing a list of all bookings.
     * @throws BookingServiceException if there is an error while retrieving bookings from the service.
     */
    public ResponseEntity<List<Bookings>> getAllBookings() {
        List<Bookings> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    @DeleteMapping("/{id}")
/**
 * Deletes a booking identified by the given ID.
 *
 * This method attempts to delete a booking from the system. If the booking is successfully deleted,
 * it returns a response with a status of 200 OK and a message indicating that the booking was deleted successfully.
 * If no booking is found with the specified ID, it returns a response with a status of 404 Not Found and a message
 * indicating that the booking was not found.
 *
 * @param id the ID of the booking to be deleted
 * @return a ResponseEntity containing the status and message regarding the deletion of the booking
 * @throws IllegalArgumentException if the provided ID is null or negative
 */
public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
    boolean deleted = bookingService.deleteBookingById(id);
    if (deleted) {
        return ResponseEntity.ok("Booking deleted successfully");
    } else {
        return ResponseEntity.status(404).body("Booking not found");
    }
}

@PostMapping("/{userId}")
/**
 * Books a vendor for a user based on the provided booking data.
 *
 * This method processes the booking request by extracting relevant information
 * from the provided booking data and invoking the vendor booking service.
 * It returns a response entity containing the result of the booking operation.
 *
 * @param userId The ID of the user making the booking. Must not be null.
 * @param bookingData A map containing the booking details, including:
 *                    - "rname": The name of the requester.
 *                    - "remail": The email of the requester.
 *                    - "rmobile": The mobile number of the requester.
 *                    - "rdate": The date of the booking.
 *                    - "rlocation": The location for the booking.
 *                    - "vendorId": The ID of the vendor to be booked.
 *
 * @return A ResponseEntity containing the result of the booking operation.
 *         If the user ID is missing, it returns a bad request response with an error message.
 *         If the booking is successful, it returns an OK response with the result.
 *         If the user or vendor is not found, it returns a bad request response with an appropriate message.
 *         In case of any exceptions during processing, it returns an internal server error response.
 *
 * @throws IllegalArgumentException if any required fields in bookingData are missing or invalid.
 */
public ResponseEntity<String> bookVendor(@PathVariable Long userId, @RequestBody Map<String, Object> bookingData) {
    System.out.println("Received Booking Data: " + bookingData);
    System.out.println("User ID: " + userId);

    if (userId == null) {
        return ResponseEntity.badRequest().body("User ID is missing");
    }

    try {
        String result = bookingVendorService.bookVendor(
            (String) bookingData.get("rname"),
            (String) bookingData.get("remail"),
            (String) bookingData.get("rmobile"),
            (String) bookingData.get("rdate"),
            (String) bookingData.get("rlocation"),
            ((Number) bookingData.get("vendorId")).longValue(),
            userId
        );

        return result.equals("User or Vendor not found") 
            ? ResponseEntity.badRequest().body(result) 
            : ResponseEntity.ok(result);
    } catch (Exception e) {
        e.printStackTrace(); // Print full error stack trace
        return ResponseEntity.internalServerError().body("An error occurred while processing your request");
    }
}


@GetMapping("/vendor/{userId}")
/**
 * Retrieves a list of vendor bookings for a specified user.
 *
 * This method handles the HTTP GET request to fetch the vendor bookings associated
 * with the provided user ID. It returns a ResponseEntity containing a list of
 * BookingVendor objects.
 *
 * @param userId the ID of the user whose vendor bookings are to be retrieved
 * @return a ResponseEntity containing a list of BookingVendor objects
 * @throws IllegalArgumentException if the userId is null or invalid
 * @throws ResourceNotFoundException if no bookings are found for the specified userId
 * @throws Exception if an unexpected error occurs during the retrieval process
 */
public ResponseEntity<List<BookingVendor>> getVendorBookings(@PathVariable Long userId) {
    return ResponseEntity.ok(bookingVendorService.getUserVendorBookings(userId));
}

@GetMapping("/vendor/all")
/**
 * Retrieves a list of all vendor bookings.
 *
 * This method interacts with the booking vendor service to fetch all the
 * bookings associated with vendors. The result is wrapped in a
 * {@link ResponseEntity} to provide additional HTTP response information.
 *
 * @return a {@link ResponseEntity} containing a list of {@link BookingVendor}
 *         objects and an HTTP status of 200 OK if the operation is successful.
 *
 * @throws SomeSpecificException if there is an error retrieving the vendor bookings.
 *         This could occur if the underlying service encounters an issue, such as
 *         a database access problem or if no bookings are found.
 *
 * @see BookingVendor
 * @see ResponseEntity
 */
public ResponseEntity<List<BookingVendor>> getAllVendorBookings() {
    return ResponseEntity.ok(bookingVendorService.getAllVendorBookings());
}

@DeleteMapping("/vendor/{id}")
/**
 * Deletes a vendor booking identified by the given ID.
 *
 * This method attempts to delete a vendor booking from the system. If the booking is successfully deleted,
 * it returns a response with a status of 200 (OK) and a message indicating success. If the booking with the
 * specified ID does not exist, it returns a response with a status of 404 (Not Found) and a message indicating
 * that the vendor booking was not found.
 *
 * @param id the ID of the vendor booking to be deleted
 * @return a ResponseEntity containing a message about the result of the deletion operation
 * @throws IllegalArgumentException if the provided ID is null or invalid
 */
public ResponseEntity<String> deleteVendorBooking(@PathVariable Long id) {
    return bookingVendorService.deleteVendorBooking(id) 
        ? ResponseEntity.ok("Vendor booking deleted successfully") 
        : ResponseEntity.status(404).body("Vendor booking not found");
}

}
