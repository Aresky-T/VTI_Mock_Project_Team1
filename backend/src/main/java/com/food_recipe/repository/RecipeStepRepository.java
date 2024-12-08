package com.food_recipe.repository;

import com.food_recipe.entity.recipe.step.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeStepRepository extends JpaRepository<Step, Integer> {
}