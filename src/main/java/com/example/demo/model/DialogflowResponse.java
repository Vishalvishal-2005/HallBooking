package com.example.demo.model;

import java.util.List;

public class DialogflowResponse {
    private List<FulfillmentMessage> fulfillmentMessages;

    // Constructor
    public DialogflowResponse(List<FulfillmentMessage> fulfillmentMessages) {
        this.fulfillmentMessages = fulfillmentMessages;
    }

    // Getter and Setter
    /**
     * Retrieves a list of fulfillment messages.
     *
     * @return a List of {@link FulfillmentMessage} objects representing the fulfillment messages.
     *
     * @throws NullPointerException if the fulfillmentMessages list is null.
     */
    public List<FulfillmentMessage> getFulfillmentMessages() {
        return fulfillmentMessages;
    }

    /**
     * Sets the fulfillment messages for this object.
     *
     * @param fulfillmentMessages a list of {@link FulfillmentMessage} objects to be set.
     * @throws IllegalArgumentException if the provided list is null.
     */
    public void setFulfillmentMessages(List<FulfillmentMessage> fulfillmentMessages) {
        this.fulfillmentMessages = fulfillmentMessages;
    }
}
