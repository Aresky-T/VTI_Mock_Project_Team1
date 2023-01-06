package com.food_recipe.dto;

import com.food_recipe.entity.Recipe_Ingredient;

public class Recipe_IngredientDTO {

    private Integer recipe_id;

    private Integer ingredient_id;

    private Float amount;

    public Recipe_Ingredient toEntity () {
        return new Recipe_Ingredient(recipe_id, ingredient_id, amount);
    }

    public Integer getRecipe_id() {
        return recipe_id;
    }

    public Integer getIngredient_id() {
        return ingredient_id;
    }

    public Float getAmount() {
        return amount;
    }
}
