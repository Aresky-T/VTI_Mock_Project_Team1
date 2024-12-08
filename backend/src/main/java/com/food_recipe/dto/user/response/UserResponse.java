package com.food_recipe.dto.user.response;

import com.food_recipe.entity.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse {
    private String fullName;
    private String avatarUrl;

    public UserResponse(String fullName, String avatarUrl) {
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
    }

    public static UserResponse build(User user){
        return new UserResponse(user.getFullName(), user.getAvatarUrl());
    }
}
