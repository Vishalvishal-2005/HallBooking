package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.model.User;
import com.example.demo.model.Venue;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
        @Autowired
        private VenueService venueService;

        @Autowired
        private PasswordEncoder passwordEncoder; // Injecting Password Encoder
    
        /**
         * Saves a user to the repository after encoding their password.
         *
         * This method takes a {@link User} object, encodes its password using a password encoder,
         * and then saves the user to the user repository. It is important to ensure that the user
         * object provided has a non-null password before calling this method.
         *
         * @param user the {@link User} object to be saved, which must contain a non-null password
         * @return the saved {@link User} object after it has been persisted in the repository
         * @throws IllegalArgumentException if the provided user is null or if the user's password is null
         * @throws DataAccessException if there is an error while saving the user to the repository
         */
        public User saveUser(User user) {
            // Hash the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
    /**
     * Retrieves a user by their unique identifier.
     *
     * This method queries the user repository to find a user associated with the given ID.
     * If a user with the specified ID exists, an {@link Optional} containing the user is returned.
     * If no user is found, an empty {@link Optional} is returned.
     *
     * @param id the unique identifier of the user to be retrieved; must not be null
     * @return an {@link Optional} containing the user if found, or an empty {@link Optional} if not found
     * @throws IllegalArgumentException if the provided ID is null
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Retrieves a User object from the repository based on the provided email address.
     *
     * @param email the email address of the user to be retrieved
     * @return the User object associated with the specified email, or null if no user is found
     * @throws IllegalArgumentException if the provided email is null or empty
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Retrieves a list of all users from the user repository.
     *
     * @return a List of User objects representing all users in the repository.
     * @throws DataAccessException if there is an error accessing the user data.
     */
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Validates a user by checking the provided email and password against the stored user data.
     *
     * This method retrieves a user from the repository using the provided email.
     * If a user is found, it checks if the provided password matches the stored password
     * using a password encoder. If both the email and password are valid, the user object
     * is returned; otherwise, null is returned.
     *
     * @param email    the email of the user to be validated
     * @param password the password of the user to be validated
     * @return the User object if the email and password are valid; null otherwise
     *
     * @throws IllegalArgumentException if the email or password is null or empty
     */
    public User validateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }
    /**
     * Books a venue for a specified user.
     *
     * This method retrieves a user by their ID and, if found, attempts to book a venue
     * for that user by adding the venue to the user's list of venues. If either the user
     * or the venue cannot be found, a runtime exception is thrown.
     *
     * @param userId the ID of the user for whom the venue is to be booked
     * @param venueId the ID of the venue to be booked for the user
     * @throws RuntimeException if the user with the specified ID is not found
     * @throws RuntimeException if the venue with the specified ID is not found
     */
    public void bookVenueForUser(Long userId, Long venueId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Optional<Venue> venueOpt = venueService.getVenueById(venueId);
            if (venueOpt.isPresent()) {
                Venue venue = venueOpt.get();
                user.getVenues().add(venue);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Venue not found");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    /**
     * Retrieves a list of venues associated with a specific user.
     *
     * @param userId the ID of the user whose bookings are to be retrieved
     * @return a list of venues associated with the specified user
     * @throws RuntimeException if no user is found with the given ID
     */
    public List<Venue> getUserBookings(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getVenues();
    }

}
