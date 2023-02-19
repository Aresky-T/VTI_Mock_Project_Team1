package com.food_recipe.dto;

import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.RecipeExchangeHistory;
import com.food_recipe.entity.User;
import lombok.Data;


@Data
public class RecipeExchangeFormForCreating {

    private User userId;

    private Recipe recipeId;

    public RecipeExchangeHistory toEntity() {
        return new RecipeExchangeHistory(userId, recipeId);
    }
}
