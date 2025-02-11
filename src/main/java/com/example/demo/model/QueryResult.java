package com.example.demo.model;

public class QueryResult {
    private Intent intent;
    private String queryText;
    private Parameters parameters;
    private boolean allRequiredParamsPresent;
    private String fulfillmentText;

    /**
     * Retrieves the current intent associated with this component.
     *
     * @return the current {@link Intent} object, which contains information about
     *         the activity that started this component and any additional data.
     *
     * @throws IllegalStateException if the intent is null or if the component
     *         is not in a valid state to retrieve the intent.
     */
    public Intent getIntent() {
        return intent;
    }

    /**
     * Sets the intent for this object.
     *
     * @param intent the Intent to be set
     * @throws IllegalArgumentException if the provided intent is null
     */
    public void setIntent(Intent intent) {
        this.intent = intent;
    }

    /**
     * Retrieves the query text associated with this object.
     *
     * @return the query text as a {@code String}.
     * @throws IllegalStateException if the query text is not initialized or is null.
     */
    public String getQueryText() {
        return queryText;
    }

    /**
     * Sets the query text for this object.
     *
     * @param queryText the query text to set
     * @throws IllegalArgumentException if the provided queryText is null or empty
     */
    public void setQueryText(String queryText) {
        this.queryText = queryText;
    }

    /**
     * Retrieves the current parameters.
     *
     * @return the current {@link Parameters} object containing the parameters.
     * @throws IllegalStateException if the parameters are not initialized or are in an invalid state.
     */
    public Parameters getParameters() {
        return parameters;
    }

    /**
     * Sets the parameters for this object.
     *
     * @param parameters the Parameters object to be set
     * @throws IllegalArgumentException if the provided parameters are null
     */
    public void setParameters(Parameters parameters) {
        this.parameters = parameters;
    }

    /**
     * Checks if all required parameters are present.
     *
     * @return {@code true} if all required parameters are present; {@code false} otherwise.
     *
     * @throws IllegalStateException if the method is called when the state of the object is invalid
     *         (e.g., if the parameters have not been initialized properly).
     */
    public boolean isAllRequiredParamsPresent() {
        return allRequiredParamsPresent;
    }

    /**
     * Sets the value of the allRequiredParamsPresent flag.
     *
     * @param allRequiredParamsPresent a boolean indicating whether all required parameters are present.
     *
     * @throws IllegalArgumentException if the provided value is not a valid boolean (though this method accepts only boolean values).
     *
     * <p>This method updates the internal state of the object to reflect whether all required parameters are present.
     * It is important to ensure that this method is called with a valid boolean value to maintain the integrity of the object's state.</p>
     */
    public void setAllRequiredParamsPresent(boolean allRequiredParamsPresent) {
        this.allRequiredParamsPresent = allRequiredParamsPresent;
    }

    /**
     * Retrieves the fulfillment text.
     *
     * This method returns the fulfillment text associated with the current object.
     *
     * @return a {@code String} representing the fulfillment text.
     * @throws NullPointerException if the fulfillment text is null.
     */
    public String getFulfillmentText() {
        return fulfillmentText;
    }

    /**
     * Sets the fulfillment text for the current instance.
     *
     * This method assigns the provided fulfillment text to the instance variable
     * `fulfillmentText`. The fulfillment text is typically used in response
     * generation for chatbots or similar applications.
     *
     * @param fulfillmentText the text to be set as fulfillment text
     * @throws IllegalArgumentException if the provided fulfillmentText is null or empty
     */
    public void setFulfillmentText(String fulfillmentText) {
        this.fulfillmentText = fulfillmentText;
    }
}
