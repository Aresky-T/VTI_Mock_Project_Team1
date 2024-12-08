package com.food_recipe.controller;

import com.food_recipe.dto.auth.request.LoginRequest;
import com.food_recipe.dto.auth.response.LoginResponse;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.user.UserStatus;
import com.food_recipe.exception.CommonException;
import com.food_recipe.service.user.IUserService;
import com.food_recipe.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private IUserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/token/valid")
    public ResponseEntity<Boolean> checkExpiration(Authentication authentication){
        return ResponseEntity.ok(true);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Validated @RequestBody LoginRequest request){
        String username = request.getUsername();
        String password = request.getPassword();
        if(!userService.existsUserByUsername(username)){
            throw new CommonException("Invalid username!");
        };

        User user = userService.findUserByUsername(username);
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new CommonException("Invalid password!");
        }

        if(!user.getStatus().equals(UserStatus.ACTIVE)){
            throw new CommonException("Account has not been activated!");
        }

        String token = JwtUtil.generateToken(username);
        LoginResponse response = LoginResponse.build(user, token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
