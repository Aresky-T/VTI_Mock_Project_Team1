package com.food_recipe.dto.response;

import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.user.UserGender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeOwnerResponse {
    private String fullName;
    private String avatarUrl;
    private UserGender gender;
    private Boolean isCreator;

    public static RecipeOwnerResponse toDTO(RecipeOwner recipeOwner){
        User owner = recipeOwner.getOwner();
        return RecipeOwnerResponse.builder()
                .fullName(owner.getFullName())
                .avatarUrl(owner.getAvatarUrl())
                .gender(owner.getGender())
                .isCreator(recipeOwner.getIsCreator())
                .build();
    }

    public static RecipeOwnerResponse toDTO(User owner, Boolean isCreator){
        return RecipeOwnerResponse.builder()
                .fullName(owner.getFullName())
                .avatarUrl(owner.getAvatarUrl())
                .gender(owner.getGender())
                .isCreator(isCreator)
                .build();
    }
}
