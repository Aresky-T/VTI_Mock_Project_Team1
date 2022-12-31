package com.food_recipe.service;


import com.food_recipe.dto.ChangePublicProfileDTO;
import com.food_recipe.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IUserService extends UserDetailsService {

    boolean existsUserByEmail(String email);

    boolean existsUserByUserName(String userName);

    void createUser(User user);

    void activeUser(String token);

    User findUserByEmail(String email);


    User findUserByUserName(String username);

    void sendConfirmUserRegistrationViaEmail(String email);

    void resetPasswordViaEmail(String email);

    void resetPassword(String token, String newPassword);

    void sendResetPasswordViaEmail(String email);


    void ChangePublicProfileDTO(String username, ChangePublicProfileDTO dto);


}
