package com.example.demo.model;

public class FulfillmentMessage {
    private Text text;
    // Getters and Setters
    /**
     * Retrieves the text associated with this object.
     *
     * @return the {@link Text} object representing the text.
     * @throws IllegalStateException if the text has not been initialized.
     */
    public Text getText() {
        return text;
    }
    /**
     * Sets the text for this object.
     *
     * @param text the Text object to be set
     * @throws IllegalArgumentException if the provided text is null
     */
    public void setText(Text text) {
        this.text = text;
    }
}
