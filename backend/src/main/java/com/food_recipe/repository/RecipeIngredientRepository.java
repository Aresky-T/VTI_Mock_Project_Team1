package com.food_recipe.repository;

import com.food_recipe.entity.Recipe_Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends
        JpaRepository<Recipe_Ingredient, Integer>,
        JpaSpecificationExecutor<Recipe_Ingredient> {

}
