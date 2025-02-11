package com.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserChatLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userInput;
    private String chatbotResponse;
    private LocalDateTime timestamp;

    // Getters and Setters
    /**
     * Retrieves the unique identifier of the object.
     *
     * @return the unique identifier (ID) as a {@code Long}.
     * @throws NullPointerException if the ID is not set (i.e., it is {@code null}).
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

    /**
     * Retrieves the user input stored in the instance variable.
     *
     * @return a String representing the user input.
     * @throws IllegalStateException if the user input has not been initialized.
     */
    public String getUserInput() {
        return userInput;
    }

    /**
     * Sets the user input for the application.
     *
     * @param userInput the input provided by the user, which will be stored
     *                  in the application. This parameter cannot be null.
     * @throws IllegalArgumentException if the provided userInput is null.
     */
    public void setUserInput(String userInput) {
        this.userInput = userInput;
    }

    /**
     * Retrieves the response from the chatbot.
     *
     * @return a {@code String} representing the chatbot's response.
     * @throws IllegalStateException if the chatbot response is not initialized or is null.
     */
    public String getChatbotResponse() {
        return chatbotResponse;
    }

    /**
     * Sets the response of the chatbot.
     *
     * @param chatbotResponse the response to be set for the chatbot
     * @throws IllegalArgumentException if the provided response is null or empty
     */
    public void setChatbotResponse(String chatbotResponse) {
        this.chatbotResponse = chatbotResponse;
    }

    /**
     * Retrieves the timestamp associated with this object.
     *
     * @return the timestamp as a {@link LocalDateTime} object.
     * @throws NullPointerException if the timestamp is null.
     */
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    /**
     * Sets the timestamp to the specified value.
     *
     * @param timestamp the LocalDateTime to set as the timestamp
     * @throws NullPointerException if the specified timestamp is null
     */
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
