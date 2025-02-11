package com.example.demo.controller;

import com.example.demo.model.Venue;
import com.example.demo.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/venues")
public class VenueController {
    
    @Autowired
    private VenueService venueService;
    
    @PostMapping
    /**
     * Creates a new venue and returns the response entity containing the venue.
     *
     * @param venue the venue to be created, must not be null
     * @return a ResponseEntity containing the created venue
     * @throws IllegalArgumentException if the provided venue is null
     * @throws VenueServiceException if there is an error while saving the venue
     */
    public ResponseEntity<Venue> createVenue(@RequestBody Venue venue) {
        return ResponseEntity.ok(venueService.saveVenue(venue));
    }
    @GetMapping
    /**
     * Retrieves a list of all venues.
     *
     * This method interacts with the venue service to fetch the complete list of venues
     * available in the system. The response is wrapped in a {@link ResponseEntity} to provide
     * additional HTTP response information.
     *
     * @return a {@link ResponseEntity} containing a list of {@link Venue} objects and an HTTP status of 200 OK.
     *
     * @throws VenueServiceException if there is an error while retrieving the venues from the service.
     * @throws DataAccessException if there is an issue accessing the data source.
     */
    public ResponseEntity<List<Venue>> getAllVenues() {
        return ResponseEntity.ok(venueService.getAllVenues());
    }

    @GetMapping("/{id}")
    /**
     * Retrieves a venue by its unique identifier.
     *
     * This method handles HTTP GET requests to fetch a venue based on the provided ID.
     * If a venue with the specified ID exists, it returns a ResponseEntity containing
     * the venue and an HTTP status of 200 (OK). If no venue is found, it returns a
     * ResponseEntity with an HTTP status of 404 (Not Found).
     *
     * @param id the unique identifier of the venue to be retrieved
     * @return a ResponseEntity containing the Venue if found, or a 404 Not Found response if not
     * @throws IllegalArgumentException if the provided ID is null or negative
     */
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        Optional<Venue> venue = venueService.getVenueById(id);
        return venue.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    /**
     * Deletes a venue identified by the given ID.
     *
     * This method attempts to delete a venue from the system. If the venue is successfully deleted,
     * it returns a response entity with an HTTP status of 200 (OK) and a message indicating that
     * the venue was deleted successfully. If the venue with the specified ID does not exist,
     * it returns a response entity with an HTTP status of 404 (NOT FOUND) and a message indicating
     * that the venue was not found.
     *
     * @param id the ID of the venue to be deleted
     * @return a ResponseEntity containing a message about the deletion status
     * @throws IllegalArgumentException if the provided ID is null or invalid
     */
    public ResponseEntity<String> deleteVenue(@PathVariable Long id) {
        boolean deleted = venueService.deleteVenueById(id);
        if (deleted) {
            return ResponseEntity.ok("Venue deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venue not found");
        }
    }
    

}
