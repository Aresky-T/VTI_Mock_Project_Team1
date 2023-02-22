package com.food_recipe.repository;

import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.Voting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VotingRepository extends
        JpaRepository<Voting, Integer>,
        JpaSpecificationExecutor<Voting> {
    void deleteByRecipeIdAndUserId(Integer recipeId, Integer userId);

    Voting findByRecipeIdAndUserId(Integer recipeId, Integer userId);

    Boolean existsByUserIdAndRecipeId(Integer userId, Integer recipeId);

    @Query("SELECT AVG (V.stars) FROM Voting V WHERE V.recipe.id = ?1")
    Float getAverageStarsByRecipeId(Integer recipeId);

    @Query("SELECT COUNT(V.user) FROM Voting V WHERE V.recipe.id = ?1")
    Integer getAllUsersVotedForRecipe (Integer recipeId);
}
