package com.food_recipe.service;

import com.food_recipe.dto.RecipeIngredientDTO;
import com.food_recipe.dto.RecipeIngredientFormCreating;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.RecipeIngredient;

import java.util.List;

public interface IRecipeIngredientService {

    void createRecipeIngredient(List<RecipeIngredientFormCreating> list);

    void updateRecipeIngredient(List<Integer> ids, List<RecipeIngredientDTO> list);

    void deleteRecipeIngredient(List<Integer> ids);
}
