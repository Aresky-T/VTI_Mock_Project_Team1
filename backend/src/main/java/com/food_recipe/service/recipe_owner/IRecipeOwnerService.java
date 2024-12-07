package com.food_recipe.service.recipe_owner;

import com.food_recipe.dto.response.RecipeOwnership;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.user.User;

import java.util.List;

public interface IRecipeOwnerService {
    List<Recipe> getRecipeListForOwner(User owner);
    List<User> getOwnerListForRecipe(Recipe recipe);
    List<RecipeOwner> getAllForRecipe(Recipe recipe);
    List<RecipeOwner> getAllByOwnerAndIsCreator(User owner, Boolean isCreator);

    RecipeOwner getRecipeOwner(User owner, Recipe recipe);
    RecipeOwnership getRecipeOwnershipForUser(User owner, Recipe recipe);

    Boolean checkRecipeOwnershipForUser(User owner, Recipe recipe);
    Boolean checkRecipeOwnershipForUser(Integer ownerId, Integer recipeId);

    void enableRecipeOwnershipForUser(User owner, Recipe recipe);
    void disableRecipeOwnershipForUser(User owner, Recipe recipe);
}
