package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/images")
public class FileUploadController {

    private final String uploadDir = "C:/uploads/";

    @PostMapping("/upload")
    /**
     * Uploads an image file to the server.
     *
     * This method handles the uploading of an image file provided in the request.
     * It checks if the file is empty and returns a bad request response if so.
     * If the file is valid, it attempts to save the file to a specified directory,
     * creating the directory if it does not exist. A unique filename is generated
     * based on the current timestamp and the original filename. Upon successful
     * upload, it returns the URL of the uploaded image.
     *
     * @param file the image file to be uploaded, must not be null
     * @return a ResponseEntity containing the URL of the uploaded image if successful,
     *         or an error message if the upload fails or if no file is uploaded
     *
     * @throws IllegalArgumentException if the provided file is null
     * @throws IOException if an I/O error occurs during file writing
     */
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file uploaded");
        }
        try {
            // Ensure the directory exists
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs(); // Create the directory if it doesn't exist
            }

            // Generate unique filename
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, file.getBytes());

            // Return correct image URL
            String imageUrl = "http://localhost:3060/uploads/" + fileName;
            return ResponseEntity.ok(imageUrl);

        } catch (IOException e) {
            e.printStackTrace(); // Print error in logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }
}

