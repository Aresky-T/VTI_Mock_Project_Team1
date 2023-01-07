package com.food_recipe.repository;

import com.food_recipe.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends
        JpaRepository<RecipeIngredient, Integer>,
        JpaSpecificationExecutor<RecipeIngredient> {

}
