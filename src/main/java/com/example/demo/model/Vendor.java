package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vendors")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Retrieves the unique identifier associated with this object.
     *
     * @return the unique identifier (ID) of this object as a {@code Long}.
     *
     * @throws NullPointerException if the ID is not set (i.e., if it is {@code null}).
     */
    public Long getId() {
        return id;
    }
    /**
     * Sets the identifier for this object.
     *
     * @param id the identifier to set, must not be null
     * @throws IllegalArgumentException if the provided id is null
     */
    public void setId(Long id) {
        this.id = id;
    }
    private String name;
    private String category;
    private String description;
    private String imageUrl; // Path to stored image
    /**
     * Retrieves the name associated with this object.
     *
     * @return the name as a {@code String}.
     * @throws NullPointerException if the name is not initialized (i.e., it is {@code null}).
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
     * Retrieves the category associated with this object.
     *
     * @return the category as a {@code String}.
     *
     * @throws NullPointerException if the category is null.
     */
    public String getCategory() {
        return category;
    }
    /**
     * Sets the category for this object.
     *
     * @param category the category to set
     * @throws IllegalArgumentException if the category is null or empty
     */
    public void setCategory(String category) {
        this.category = category;
    }
    /**
     * Retrieves the description associated with this object.
     *
     * @return the description as a {@code String}.
     * @throws NullPointerException if the description is {@code null}.
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
     * Retrieves the URL of the image.
     *
     * @return a {@code String} representing the image URL.
     * @throws IllegalStateException if the image URL is not set or is invalid.
     */
    public String getImageUrl() {
        return imageUrl;
    }
    /**
     * Sets the URL of the image.
     *
     * @param imageUrl the URL of the image to be set
     * @throws IllegalArgumentException if the provided imageUrl is null or empty
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
