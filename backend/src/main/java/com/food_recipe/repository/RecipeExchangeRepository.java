package com.food_recipe.repository;

import com.food_recipe.entity.Comment;
import com.food_recipe.entity.RecipeExchangeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeExchangeRepository extends
        JpaRepository<RecipeExchangeHistory, Integer>,
        JpaSpecificationExecutor<RecipeExchangeHistory> {

    public boolean existsByUserIdAndRecipeId(Integer userId, Integer recipeId);
}
