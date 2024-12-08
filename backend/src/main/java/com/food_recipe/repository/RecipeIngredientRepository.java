package com.food_recipe.repository;

import com.food_recipe.entity.recipe.ingredient.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeIngredientRepository extends
        JpaRepository<Ingredient, Integer>,
        JpaSpecificationExecutor<Ingredient> {

    List<Ingredient> findAllByIdIn(List<Integer> ids);

}
