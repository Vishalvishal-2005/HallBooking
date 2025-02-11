package com.example.demo.model;

import java.util.Map;

public class DialogflowRequest {
    private QueryResult queryResult;

    // Getter and Setter
    /**
     * Retrieves the current query result.
     *
     * @return the {@link QueryResult} object representing the result of the query.
     * @throws IllegalStateException if the query result is not available or has not been initialized.
     */
    public QueryResult getQueryResult() {
        return queryResult;
    }

    /**
     * Sets the query result for this object.
     *
     * @param queryResult the {@link QueryResult} object to be set
     * @throws IllegalArgumentException if the provided {@code queryResult} is null
     */
    public void setQueryResult(QueryResult queryResult) {
        this.queryResult = queryResult;
    }

    public static class QueryResult {
        private Map<String, Object> parameters;

        // Getter and Setter
        /**
         * Retrieves the parameters associated with this object.
         *
         * @return a map containing the parameters, where the keys are of type {@code String}
         *         and the values are of type {@code Object}.
         *
         * @throws IllegalStateException if the parameters are not initialized or are in an invalid state.
         */
        public Map<String, Object> getParameters() {
            return parameters;
        }

        /**
         * Sets the parameters for this object.
         *
         * @param parameters a map containing the parameters to be set. The keys should be of type {@code String}
         *                   and the values should be of type {@code Object}. This map cannot be {@code null}.
         * @throws IllegalArgumentException if the provided parameters map is {@code null} or contains
         *                                  invalid key-value pairs.
         */
        public void setParameters(Map<String, Object> parameters) {
            this.parameters = parameters;
        }

        /**
         * Retrieves the query text.
         *
         * <p>This method is intended to return a string representation of the query text.
         * However, it is currently unimplemented and will throw an
         * {@link UnsupportedOperationException} when invoked.</p>
         *
         * @return the query text as a {@link String}
         * @throws UnsupportedOperationException if the method is called before it is implemented
         */
        public String getQueryText() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'getQueryText'");
        }
    }
}
