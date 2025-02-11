package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Bookings;
import com.example.demo.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/{userId}/venues/{venueId}")
    public ResponseEntity<String> bookVenueForUser(
            @PathVariable("userId") Long userId, 
            @PathVariable("venueId") Long venueId, 
            @RequestBody Bookings booking) {
        
        bookingService.bookVenueForUser(userId, venueId, booking);
        return ResponseEntity.ok("Venue booked successfully");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Bookings>> getUserBookings(@PathVariable("userId") Long userId) {
        List<Bookings> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Bookings>> getAllBookings() {
        List<Bookings> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
}
