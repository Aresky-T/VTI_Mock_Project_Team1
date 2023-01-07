package com.food_recipe.dto;

import com.food_recipe.entity.RecipeIngredient;
import lombok.Data;

@Data
public class RecipeIngredientDTO {

    private Integer id;

    private Integer recipes;

    private Integer ingredient;

    private Float amount;


    public RecipeIngredient toEntity() {
        return new RecipeIngredient(recipes, ingredient, amount);
    }


}