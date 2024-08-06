package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    PasswordEncoder password=new BCryptPasswordEncoder();

    public User createUser(User user) {
        String encoded=this.password.encode(user.getPassword());
        user.setPassword(encoded);

        return userRepo.save(user);
    }

    public boolean validateUser(String email, String password) {
        Optional<User> userOpt = userRepo.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getPassword().equals(password);
        }
        return false;
    }
       public List<User> findAllUsers() {
        return userRepo.findAll();
    }
    public User getUserById(int id) {
        return userRepo.findById(id).orElse(null);
    }
    
    public User updateUser(User user) {
        return userRepo.save(user);
    }
}