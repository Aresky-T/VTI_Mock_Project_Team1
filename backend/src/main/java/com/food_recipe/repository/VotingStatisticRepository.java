package com.food_recipe.repository;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.voting.VotingStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VotingStatisticRepository extends JpaRepository<VotingStatistic, Integer> {
    boolean existsByRecipe(Recipe recipe);

    VotingStatistic findByRecipe(Recipe recipe);
}
