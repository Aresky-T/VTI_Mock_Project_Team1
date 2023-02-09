package com.food_recipe.dto;

import com.food_recipe.entity.RecipeIngredient;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RecipeIngredientFormCreating {
    private Integer recipeId;
    private String name;
    private Float amount;
    private String unit;

    public RecipeIngredient toEntity () {
        return new RecipeIngredient(recipeId, name, amount, unit);
    }
}
