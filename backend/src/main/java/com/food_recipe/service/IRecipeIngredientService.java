package com.food_recipe.service;

import com.food_recipe.dto.RecipeIngredientFormCreating;
import com.food_recipe.entity.RecipeIngredient;

import java.util.List;

public interface IRecipeIngredientService {

    List<RecipeIngredient> getAllById(List<Integer> ids);

    void createRecipeIngredient(List<RecipeIngredientFormCreating> list);
}
