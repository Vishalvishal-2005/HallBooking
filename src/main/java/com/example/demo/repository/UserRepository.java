package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Retrieves a User object based on the provided email address.
     *
     * @param email the email address of the user to be retrieved
     * @return the User object associated with the specified email
     * @throws IllegalArgumentException if the provided email is null or empty
     * @throws UserNotFoundException if no user is found with the specified email
     */
    User findByEmail(String email);
}
