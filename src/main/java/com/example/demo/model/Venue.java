package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 255)
    private String description;
    private String location;
    private String price;
    private Double rating; // or use int if you prefer
    @Column(length = 855)

    private String img;
    /**
     * Retrieves the image associated with this object.
     *
     * @return a {@code String} representing the image.
     *         This may return {@code null} if no image is set.
     *
     * @throws IllegalStateException if the image cannot be retrieved due to an internal error.
     */
    public String getImg() {
        return img;
    }
    /**
     * Sets the image for this object.
     *
     * @param img the image to be set, represented as a String.
     * @throws IllegalArgumentException if the provided image string is null or empty.
     */
    public void setImg(String img) {
        this.img = img;
    }
    /**
     * Retrieves the unique identifier for this object.
     *
     * @return the unique identifier as a {@code Long}.
     * @throws IllegalStateException if the identifier has not been set.
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
     * Retrieves the description associated with this object.
     *
     * @return the description as a {@code String}.
     * @throws NullPointerException if the description is null.
     */
    public String getDescription() {
        return description;
    }
    /**
     * Sets the description for this object.
     *
     * @param description the description to be set
     * @throws IllegalArgumentException if the provided description is null or empty
     */
    public void setDescription(String description) {
        this.description = description;
    }
    /**
     * Retrieves the location of the object.
     *
     * @return a {@code String} representing the location.
     * @throws NullPointerException if the location is not initialized (i.e., it is {@code null}).
     */
    public String getLocation() {
        return location;
    }
    /**
     * Sets the location for the object.
     *
     * @param location the new location to be set. This should not be null or empty.
     * @throws IllegalArgumentException if the provided location is null or empty.
     */
    public void setLocation(String location) {
        this.location = location;
    }
    /**
     * Retrieves the price of the item.
     *
     * @return a {@code String} representing the price of the item.
     * @throws IllegalStateException if the price has not been set or is invalid.
     */
    public String getPrice() {
        return price;
    }
    /**
     * Sets the price of the item.
     *
     * @param price a String representing the price to be set.
     *              It should be a valid numeric value.
     * @throws NumberFormatException if the provided price is not a valid number.
     */
    public void setPrice(String price) {
        this.price = price;
    }
    /**
     * Retrieves the current rating.
     *
     * @return the current rating as a {@code Double}.
     *         Returns {@code null} if the rating has not been set.
     *
     * @throws IllegalStateException if the rating cannot be retrieved due to an internal error.
     */
    public Double getRating() {
        return rating;
    }
    /**
     * Sets the rating for this object.
     *
     * @param rating the rating to set, which should be a {@code Double} value.
     *               If the rating is {@code null}, it will be set to {@code null}.
     *
     * @throws IllegalArgumentException if the rating is less than 0.0 or greater than 5.0.
     */
    public void setRating(Double rating) {
        this.rating = rating;
    }

    // Getters and setters
}
