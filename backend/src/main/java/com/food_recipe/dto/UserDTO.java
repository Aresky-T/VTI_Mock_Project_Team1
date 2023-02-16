package com.food_recipe.dto;

import java.time.LocalDate;

import com.food_recipe.entity.UserGender;
import com.food_recipe.entity.UserStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private String username;
    private String email;
    private String avatarUrl;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private UserGender gender;
    private String phone;
    private UserStatus status;

    private PointDTO point;

    @Data
    @NoArgsConstructor
    static class PointDTO {
        private Integer point;
    }
}
