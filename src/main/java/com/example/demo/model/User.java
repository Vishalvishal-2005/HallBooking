package com.example.demo.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean success = false; // Default value

    /**
     * Checks if the operation was successful.
     *
     * @return {@code true} if the operation was successful, {@code false} otherwise.
     *
     * @throws IllegalStateException if the method is called before the operation is completed.
     */
    public boolean isSuccess() {
        return success;
    }
    /**
     * Sets the success status of the operation.
     *
     * @param success a boolean value indicating the success status.
     *
     * @throws IllegalArgumentException if the success parameter is null.
     */
    public void setSuccess(boolean success) {
        this.success = success;
    }
    @ManyToMany
    @JoinTable(
        name = "user_venue",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), // Specify a single column name
        inverseJoinColumns = @JoinColumn(name = "venue_id", referencedColumnName = "id")
    )
    private List<Venue> venues;
    
    // Getters and Setters
    /**
     * Retrieves the unique identifier associated with this object.
     *
     * @return the unique identifier (ID) as a {@link Long} object.
     *
     * @throws IllegalStateException if the ID is not set or is invalid.
     */
    public Long getId() {
        return id;
    }
    /**
     * Sets the identifier for this object.
     *
     * @param id the unique identifier to be set
     * @throws IllegalArgumentException if the provided id is null
     */
    public void setId(Long id) {
        this.id = id;
    }
    /**
     * Retrieves the username associated with this instance.
     *
     * @return the username as a {@code String}.
     * @throws NullPointerException if the username is null.
     */
    public String getUsername() {
        return username;
    }
    /**
     * Sets the username for the current instance.
     *
     * @param username the username to be set
     * @throws IllegalArgumentException if the username is null or empty
     */
    public void setUsername(String username) {
        this.username = username;
    }
    /**
     * Retrieves the email address associated with this object.
     *
     * @return the email address as a {@code String}.
     * @throws NullPointerException if the email address is not set (i.e., it is {@code null}).
     */
    public String getEmail() {
        return email;
    }
    /**
     * Sets the email address for the user.
     *
     * @param email the email address to be set
     * @throws IllegalArgumentException if the email is null or empty
     */
    public void setEmail(String email) {
        this.email = email;
    }
    /**
     * Retrieves the password associated with this instance.
     *
     * @return the password as a {@code String}.
     * @throws IllegalStateException if the password has not been set or is null.
     */
    public String getPassword() {
        return password;
    }
    /**
     * Sets the password for the user.
     *
     * @param password the new password to be set
     * @throws IllegalArgumentException if the password is null or empty
     */
    public void setPassword(String password) {
        this.password = password;
    }
    /**
     * Retrieves a list of venues.
     *
     * @return a List of Venue objects representing the available venues.
     *
     * @throws NullPointerException if the list of venues is null.
     */
    public List<Venue> getVenues() {
        return venues;
    }
    /**
     * Sets the list of venues for this object.
     *
     * @param venues a List of Venue objects to be set
     * @throws IllegalArgumentException if the venues list is null
     */
    public void setVenues(List<Venue> venues) {
        this.venues = venues;
    }
}
