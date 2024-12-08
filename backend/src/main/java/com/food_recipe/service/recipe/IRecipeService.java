package com.food_recipe.service.recipe;

import com.food_recipe.dto.recipe.request.RecipeFormForCreating;
import com.food_recipe.dto.recipe.request.RecipeFormForUpdate;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.dto.request.CreateRecipeRequest;
import com.food_recipe.dto.request.UpdateRecipeRequest;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IRecipeService {

    List<Recipe> getListForCreator(Integer creatorId);

    List<Recipe> findByNameLike(String name);

    Recipe createRecipe(RecipeFormForCreating form);

    Recipe createRecipe(User user, CreateRecipeRequest form);

    Page<Recipe> getAllRecipes(Pageable pageable, RecipeFilter filter, String search);

    List<Recipe> getAllRecipesByCreator(User creator);

    Recipe getRecipeById(Integer id);

    Recipe getRecipeByRecipeIdAndCreatorId(Integer recipeId, Integer creatorId);

    Recipe getRecipeByRecipeIdAndOwnerId(Integer recipeId, Integer ownerId);

    // ------------- Update recipe ----------------------------

    String updateRecipe(Integer id, RecipeFormForUpdate form);

    Recipe updateRecipe(Integer id, UpdateRecipeRequest form);

    // ------------- Delete recipe ----------------------------

    void deleteRecipe(List<Integer> ids);

    void deleteRecipeById(Integer recipeId, Integer creatorId);

    // ------------- Check recipe ----------------------------
    Boolean existRecipeById(Integer recipeId);

    Boolean existRecipeByName(String name);

    void checkExistRecipeById(Integer recipeId);

    void checkExistRecipeByIdAndCreatorId(Integer recipeId, Integer creatorId);
}

