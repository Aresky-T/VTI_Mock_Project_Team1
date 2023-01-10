package com.food_recipe.service;

import com.food_recipe.dto.RecipeIngredientDTO;
import com.food_recipe.entity.RecipeIngredient;

import java.util.List;

public interface IRecipeIngredientService {

    List<RecipeIngredient> getAll();

    void createRecipeIngredient(RecipeIngredientDTO list);
}
