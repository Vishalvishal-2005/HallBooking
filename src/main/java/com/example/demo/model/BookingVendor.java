package com.example.demo.model;

import jakarta.persistence.*;

@Entity

@Table(name = "vendor_bookings")
public class BookingVendor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // References User Entity

    private String customerName;
    private String email;
    private String phone;
    private String eventDate;
    private String eventLocation;

    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

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

    /**
     * Retrieves the name of the customer.
     *
     * @return the name of the customer as a {@code String}.
     * @throws IllegalStateException if the customer name has not been set.
     */
    public String getCustomerName() {
        return customerName;
    }

    /**
     * Sets the name of the customer.
     *
     * @param customerName the name of the customer to set
     * @throws IllegalArgumentException if the provided customerName is null or empty
     */
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    /**
     * Retrieves the email address associated with this object.
     *
     * @return the email address as a String.
     * @throws NullPointerException if the email address is not set (i.e., it is null).
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
     * Retrieves the phone number associated with this object.
     *
     * @return the phone number as a {@code String}.
     * @throws NullPointerException if the phone number is not initialized (i.e., it is {@code null}).
     */
    public String getPhone() {
        return phone;
    }

    /**
     * Sets the phone number for the object.
     *
     * @param phone the phone number to be set
     * @throws IllegalArgumentException if the phone number is null or empty
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * Retrieves the date of the event.
     *
     * @return a {@code String} representing the date of the event.
     * @throws NullPointerException if the event date is not set (i.e., it is {@code null}).
     */
    public String getEventDate() {
        return eventDate;
    }

    /**
     * Sets the date of the event.
     *
     * @param eventDate a String representing the date of the event in the desired format.
     * @throws IllegalArgumentException if the provided eventDate is null or empty.
     */
    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    /**
     * Retrieves the location of the event.
     *
     * @return a String representing the location of the event.
     * @throws NullPointerException if the event location is not set.
     */
    public String getEventLocation() {
        return eventLocation;
    }

    /**
     * Sets the location of the event.
     *
     * @param eventLocation a String representing the location of the event.
     * @throws IllegalArgumentException if the provided eventLocation is null or empty.
     */
    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    /**
     * Retrieves the vendor associated with this object.
     *
     * @return the {@link Vendor} instance representing the vendor.
     * @throws IllegalStateException if the vendor is not initialized or is null.
     */
    public Vendor getVendor() {
        return vendor;
    }

    /**
     * Sets the vendor for this object.
     *
     * @param vendor the Vendor object to be set
     * @throws IllegalArgumentException if the provided vendor is null
     */
    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }
}
