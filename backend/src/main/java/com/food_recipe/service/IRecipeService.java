package com.food_recipe.service;

import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.Recipe_Ingredient;
import com.food_recipe.entity.Recipes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IRecipeService{


    List<Recipes> findByName(String name);

    void createRecipe(RecipeFormForCreating form);

    Page<Recipes> getAllRecipes(Pageable pageable, RecipeFilter filter, String search);

    Recipes getRecipeById(Integer id);

    void createRecipeIngredient(Recipe_Ingredient recipeIngredient);
}


