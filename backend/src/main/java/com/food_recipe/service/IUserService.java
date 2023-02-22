package com.food_recipe.service;


import com.food_recipe.dto.ChangePublicProfileDTO;
import com.food_recipe.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IUserService extends UserDetailsService {


    User findUserByUsername(String username);

    boolean existsUserByEmail(String email);

    void createUser(User user);

    boolean existsUserByUsername(String username);

    void activeUser(String token);

    User findUserByEmail(String email);

    void sendConfirmUserRegistrationViaEmail(String email);

    void resetPasswordViaEmail(String email);

    void resetPassword(String token, String newPassword);

    void sendResetPasswordViaEmail(String email);

    User ChangePublicProfileDTO(String username, ChangePublicProfileDTO dto);

    User updateUserAvatar(Integer userId, String avatar);

    void forgotPassword(String email);

    String deleteAvatarForUser(Integer userId);
}
