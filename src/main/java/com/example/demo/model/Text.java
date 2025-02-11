package com.example.demo.model;

import java.util.List;

public class Text {
    private List<String> text;

    // Constructor
    public Text(List<String> text) {
        this.text = text;
    }

    // Getter and Setter
    /**
     * Retrieves the list of text strings.
     *
     * @return a List of Strings representing the text.
     *
     * @throws NullPointerException if the text list is null.
     */
    public List<String> getText() {
        return text;
    }

    /**
     * Sets the text for this object.
     *
     * @param text a List of Strings representing the text to be set
     * @throws IllegalArgumentException if the provided list is null
     */
    public void setText(List<String> text) {
        this.text = text;
    }
}
