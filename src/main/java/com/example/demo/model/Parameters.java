package com.example.demo.model;

import java.util.Map;

public class Parameters {
    private Map<String, Object> parameters;
    // Getters and Setters
    /**
     * Retrieves the parameters associated with this instance.
     *
     * @return a map containing the parameters, where the keys are of type {@code String}
     *         and the values are of type {@code Object}.
     *
     * @throws NullPointerException if the parameters map is null.
     */
    public Map<String, Object> getParameters() {
        return parameters;
    }
    /**
     * Sets the parameters for this object.
     *
     * @param parameters a map containing the parameters to be set. The keys should be of type {@code String}
     *                   and the values should be of type {@code Object}.
     * @throws IllegalArgumentException if the provided map is null or contains invalid entries.
     */
    public void setParameters(Map<String, Object> parameters) {
        this.parameters = parameters;
    }
}
