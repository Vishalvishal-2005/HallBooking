package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    private Long venueId;
    private String name;
    private int totalMembers;
    private String arrival;
    private String departure;
    private String event;
    private String phone;
    private String date;
    private String venueName;
    private Double venuePrice;
    private String venueImage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // Remove `user_id` field and keep the relationship

    // Getters and Setters
    
    /**
     * Retrieves the unique identifier associated with this object.
     *
     * @return the unique identifier (ID) as a {@code Long}.
     *
     * @throws IllegalStateException if the ID has not been initialized or is not available.
     */
    public Long getId() {
        return id;
    }
    /**
     * Sets the identifier for this object.
     *
     * @param id the identifier to be set, which should be a non-null Long value.
     * @throws IllegalArgumentException if the provided id is null.
     */
    public void setId(Long id) {
        this.id = id;
    }
    /**
     * Retrieves the unique identifier for the venue.
     *
     * @return the venue ID as a {@code Long}.
     *         Returns {@code null} if the venue ID has not been set.
     *
     * @throws IllegalStateException if the venue ID is not initialized and cannot be retrieved.
     */
    public Long getVenueId() {
        return venueId;
    }
    /**
     * Sets the ID of the venue.
     *
     * @param venueId the ID of the venue to set. It can be null, in which case the venue ID will be cleared.
     *
     * @throws IllegalArgumentException if the venueId is negative. Venue IDs should be non-negative.
     */
    public void setVenueId(Long venueId) {
        this.venueId = venueId;
    }
    /**
     * Retrieves the name associated with this object.
     *
     * @return the name as a {@code String}.
     * @throws NullPointerException if the name is null.
     */
    public String getName() {
        return name;
    }
    /**
     * Sets the name of the object.
     *
     * @param name the name to be set; must not be null or empty
     * @throws IllegalArgumentException if the provided name is null or empty
     */
    public void setName(String name) {
        this.name = name;
    }
    /**
     * Retrieves the total number of members.
     *
     * @return the total number of members as an integer.
     * @throws IllegalStateException if the total members count is not properly initialized.
     */
    public int getTotalMembers() {
        return totalMembers;
    }
    /**
     * Sets the total number of members.
     *
     * @param totalMembers the total number of members to set
     * @throws IllegalArgumentException if totalMembers is negative
     */
    public void setTotalMembers(int totalMembers) {
        this.totalMembers = totalMembers;
    }
    /**
     * Retrieves the arrival information.
     *
     * @return a String representing the arrival information.
     * @throws NullPointerException if the arrival information is not set (i.e., it is null).
     */
    public String getArrival() {
        return arrival;
    }
    /**
     * Sets the arrival time.
     *
     * @param arrival a String representing the arrival time to be set.
     * @throws IllegalArgumentException if the arrival time is null or empty.
     */
    public void setArrival(String arrival) {
        this.arrival = arrival;
    }
    /**
     * Retrieves the departure information.
     *
     * @return a String representing the departure information.
     * @throws IllegalStateException if the departure information is not set.
     */
    public String getDeparture() {
        return departure;
    }
    /**
     * Sets the departure location.
     *
     * @param departure the departure location to set
     * @throws IllegalArgumentException if the departure location is null or empty
     */
    public void setDeparture(String departure) {
        this.departure = departure;
    }
    /**
     * Retrieves the event associated with this object.
     *
     * @return the event as a {@code String}.
     * @throws NullPointerException if the event is null.
     */
    public String getEvent() {
        return event;
    }
    /**
     * Sets the event to the specified value.
     *
     * @param event the event to be set
     * @throws IllegalArgumentException if the event is null or empty
     */
    public void setEvent(String event) {
        this.event = event;
    }
    /**
     * Retrieves the phone number associated with this object.
     *
     * @return the phone number as a {@code String}.
     * @throws NullPointerException if the phone number is not set (i.e., it is {@code null}).
     */
    public String getPhone() {
        return phone;
    }
    /**
     * Sets the phone number for this instance.
     *
     * @param phone the phone number to set
     * @throws IllegalArgumentException if the phone number is null or empty
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }
    /**
     * Retrieves the current date as a String.
     *
     * @return a String representation of the current date.
     * @throws NullPointerException if the date is not initialized.
     */
    public String getDate() {
        return date;
    }
    /**
     * Sets the date for this object.
     *
     * @param date a String representing the date to be set.
     *             The format of the date should be in accordance with the expected format
     *             used by this class. If the format is invalid, an exception may be thrown.
     * @throws IllegalArgumentException if the provided date string is null or
     *                                  does not conform to the expected date format.
     */
    public void setDate(String date) {
        this.date = date;
    }
    /**
     * Retrieves the name of the venue.
     *
     * @return the name of the venue as a {@code String}.
     * @throws IllegalStateException if the venue name is not set or is null.
     */
    public String getVenueName() {
        return venueName;
    }
    /**
     * Sets the name of the venue.
     *
     * @param venueName the name of the venue to be set
     * @throws IllegalArgumentException if the venueName is null or empty
     */
    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }
    /**
     * Retrieves the price of the venue.
     *
     * @return the price of the venue as a {@code Double}.
     *         Returns {@code null} if the venue price has not been set.
     *
     * @throws IllegalStateException if the venue price is not available
     *         due to an error in retrieving the value.
     */
    public Double getVenuePrice() {
        return venuePrice;
    }
    /**
     * Sets the price of the venue.
     *
     * @param venuePrice the price to set for the venue. This value should be a positive number.
     * @throws IllegalArgumentException if the provided venuePrice is null or negative.
     */
    public void setVenuePrice(Double venuePrice) {
        this.venuePrice = venuePrice;
    }
    /**
     * Retrieves the image associated with the venue.
     *
     * @return a {@code String} representing the venue image.
     *         This may return {@code null} if no image is associated with the venue.
     *
     * @throws IllegalStateException if the venue image is not properly initialized.
     */
    public String getVenueImage() {
        return venueImage;
    }
    /**
     * Sets the image for the venue.
     *
     * @param venueImage a {@code String} representing the URL or path of the venue image.
     * @throws IllegalArgumentException if the provided {@code venueImage} is null or empty.
     */
    public void setVenueImage(String venueImage) {
        this.venueImage = venueImage;
    }
    /**
     * Retrieves the user associated with this instance.
     *
     * @return the User object representing the current user.
     * @throws IllegalStateException if the user has not been initialized or is null.
     */
    public User getUser() {
        return user;
    }
    /**
     * Sets the user for this instance.
     *
     * @param user the User object to be set
     * @throws IllegalArgumentException if the provided user is null
     */
    public void setUser(User user) {
        this.user = user;
    }
}
