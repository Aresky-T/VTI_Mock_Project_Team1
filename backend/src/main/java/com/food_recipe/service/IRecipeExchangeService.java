package com.food_recipe.service;

import com.food_recipe.dto.RecipeExchangeFormForCreating;
import com.food_recipe.entity.RecipeExchangeHistory;

import java.util.List;

public interface IRecipeExchangeService {

    String createExchange(RecipeExchangeFormForCreating data);

    boolean isExistsExchange(Integer userId, Integer recipeId);

    List<RecipeExchangeHistory> getRecipeExchangeByRecipeId(Integer recipeId);

    List<RecipeExchangeHistory> getRecipeExchangeByUserId(Integer userId);
}
