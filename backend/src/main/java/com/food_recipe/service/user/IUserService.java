package com.food_recipe.service.user;


import com.food_recipe.dto.user.request.ChangePublicProfileDTO;
import com.food_recipe.entity.user.User;

public interface IUserService {


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

    void updateUserAvatar(User user, String newAvatar);

    void forgotPassword(String email);

    String deleteAvatarForUser(User user);

    void checkEmailExists(String email);

    void checkUsernameExists(String username);

    void save(User user);
}
