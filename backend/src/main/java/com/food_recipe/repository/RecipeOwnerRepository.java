package com.food_recipe.repository;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.recipe.owner.RecipeOwnerPK;
import com.food_recipe.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeOwnerRepository extends JpaRepository<RecipeOwner, RecipeOwnerPK> {
    Optional<RecipeOwner> findByRecipe_IdAndOwner_Id(Integer recipeId, Integer ownerId);

    boolean existsByRecipe_IdAndOwner_Id(Integer recipeId, Integer ownerId);

    List<RecipeOwner> findByOwner(User owner);

    List<RecipeOwner> findByRecipe(Recipe recipe);

    List<RecipeOwner> findByOwnerAndIsCreator(User owner, Boolean isCreator);
}
