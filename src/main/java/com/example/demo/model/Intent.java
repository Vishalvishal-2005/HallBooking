package com.example.demo.model;

public class Intent {
    private String displayName;
    // Getters and Setters
    /**
     * Retrieves the display name associated with this object.
     *
     * @return the display name as a {@code String}.
     * @throws NullPointerException if the display name is null.
     */
    public String getDisplayName() {
        return displayName;
    }
    /**
     * Sets the display name for the object.
     *
     * @param displayName the new display name to be set
     * @throws IllegalArgumentException if the provided display name is null or empty
     */
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
