package com.food_recipe.dto;

import com.food_recipe.entity.RecipeExchangeHistory;
import lombok.Data;


@Data
public class RecipeExchangeFormForCreating {

    private Integer userId;

    private Integer recipeId;

    public RecipeExchangeHistory toEntity() {
        return new RecipeExchangeHistory(userId, recipeId);
    }
}
