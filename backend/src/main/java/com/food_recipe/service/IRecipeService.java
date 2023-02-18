package com.food_recipe.service;

import com.food_recipe.dto.CommentDTO;
import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.RecipeFormForUpdate;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IRecipeService {


    List<Recipe> findByNameLike(String name);

    Boolean existRecipeByName(String name);

    Recipe createRecipe(RecipeFormForCreating form);

    Page<Recipe> getAllRecipes(Pageable pageable, RecipeFilter filter, String search);

    Recipe getRecipeById(Integer id);

    void createRecipeIngredient(RecipeIngredient recipeIngredient);

    // ------------- Update recipe ----------------------------

    void updateRecipe(Integer id, RecipeFormForUpdate form);

    // ------------- Delete recipe ----------------------------

    void deleteRecipe(List<Integer> ids);

}


