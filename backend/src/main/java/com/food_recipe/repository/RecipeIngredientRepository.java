package com.food_recipe.repository;

import com.food_recipe.entity.Ingredient;
import com.food_recipe.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Integer>, JpaSpecificationExecutor<RecipeIngredient> {
}
