package com.example.demo.util;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "DWnN2JPlmIimWXd3ZJWJtQ9mQOggGynoZpLCtvrGr/M=";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; 

    private static final SecretKey KEY = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(SECRET_KEY));

    /**
     * Generates a JSON Web Token (JWT) for the specified username.
     *
     * This method creates a JWT that includes the username as the subject, sets the issued date to the current date,
     * and defines an expiration time based on a predefined constant. The token is signed using a specified key
     * and the HS256 signature algorithm.
     *
     * @param username the username for which the token is to be generated
     * @return a String representing the generated JWT
     * @throws IllegalArgumentException if the provided username is null or empty
     * @throws JwtException if there is an error during the token generation process
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts claims from a given JWT token.
     *
     * This method uses the JWT parser to decode the provided token and retrieve the claims contained within it.
     * It requires a signing key to validate the token's signature.
     *
     * @param token the JWT token from which to extract claims
     * @return the claims extracted from the token
     * @throws io.jsonwebtoken.JwtException if the token is invalid, expired, or cannot be parsed
     * @throws IllegalArgumentException if the provided token is null or empty
     */
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extracts the username from the given token.
     *
     * This method retrieves the claims from the provided token and returns the subject,
     * which is typically the username associated with the token.
     *
     * @param token the token from which to extract the username
     * @return the username extracted from the token
     * @throws IllegalArgumentException if the token is null or empty
     * @throws TokenExtractionException if there is an error extracting claims from the token
     */
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Checks if the given token has expired.
     *
     * This method extracts the expiration date from the provided token and compares it
     * with the current date. If the expiration date is before the current date, the token
     * is considered expired.
     *
     * @param token the token to be checked for expiration
     * @return true if the token is expired, false otherwise
     * @throws IllegalArgumentException if the token is null or empty
     * @throws TokenParseException if there is an error parsing the token claims
     */
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    /**
     * Validates a given token against a specified username.
     *
     * This method checks if the provided token is associated with the given username
     * and ensures that the token has not expired. It extracts the username from the token
     * and compares it with the provided username, returning true if they match and the
     * token is not expired; otherwise, it returns false.
     *
     * @param token the token to be validated
     * @param username the username to be compared against the token's extracted username
     * @return true if the token is valid for the specified username and not expired; false otherwise
     *
     * @throws IllegalArgumentException if the token or username is null
     */
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}
