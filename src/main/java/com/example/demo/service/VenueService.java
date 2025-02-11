package com.example.demo.service;

import com.example.demo.model.Venue;
import com.example.demo.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    /**
     * Retrieves a list of all venues from the repository.
     *
     * @return a List of Venue objects representing all the venues.
     * @throws DataAccessException if there is an error accessing the data source.
     */
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    /**
     * Retrieves a venue by its unique identifier.
     *
     * This method queries the venue repository to find a venue associated with the given ID.
     * If a venue with the specified ID exists, it returns an {@link Optional} containing the venue.
     * If no venue is found, it returns an empty {@link Optional}.
     *
     * @param id the unique identifier of the venue to be retrieved; must not be null
     * @return an {@link Optional} containing the found venue, or an empty {@link Optional} if no venue is found
     * @throws IllegalArgumentException if the provided ID is null
     */
    public Optional<Venue> getVenueById(Long id) {
        return venueRepository.findById(id);
    }

    /**
     * Saves the specified venue to the repository.
     *
     * This method takes a {@link Venue} object and persists it in the database.
     * If the operation is successful, it returns the saved {@link Venue} object.
     *
     * @param venue the {@link Venue} object to be saved
     * @return the saved {@link Venue} object
     * @throws IllegalArgumentException if the provided venue is null or invalid
     * @throws DataAccessException if there is an error accessing the database
     */
    public Venue saveVenue(Venue venue) {
        return venueRepository.save(venue);
    }
    /**
     * Deletes a venue from the repository by its unique identifier.
     *
     * This method checks if a venue with the specified ID exists in the repository.
     * If it exists, the venue is deleted and the method returns true. If it does not
     * exist, the method returns false without performing any deletion.
     *
     * @param id the unique identifier of the venue to be deleted
     * @return true if the venue was successfully deleted, false if no venue with the specified ID exists
     * @throws IllegalArgumentException if the provided ID is null
     */
    public boolean deleteVenueById(Long id) {
        if (venueRepository.existsById(id)) {
            venueRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
}
