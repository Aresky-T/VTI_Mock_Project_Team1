package com.food_recipe.dto;

import lombok.Data;

@Data
public class IngredientCreatingFromDTO {

    private String name;

    private String unit;

    private Float amount;

    private Integer RecipeId;
}
