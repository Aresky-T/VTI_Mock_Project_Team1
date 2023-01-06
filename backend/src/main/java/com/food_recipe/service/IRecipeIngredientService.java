package com.food_recipe.service;

import com.food_recipe.dto.IngredientDTO;
import com.food_recipe.dto.RecipeIngredientDTO;

public interface IRecipeIngredientService {

    void createRecipeIngredient(RecipeIngredientDTO form);
}
