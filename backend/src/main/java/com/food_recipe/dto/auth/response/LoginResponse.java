package com.food_recipe.dto.auth.response;

import com.food_recipe.entity.user.User;
import com.food_recipe.entity.user.UserGender;
import com.food_recipe.entity.user.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private UserStatus status;
    private UserGender gender;
    private String phone;

    public static LoginResponse build(User user, String token) {
        return LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatarUrl(user.getAvatarUrl())
                .status(user.getStatus())
                .gender(user.getGender())
                .phone(user.getPhone())
                .build();
    }
}
