package com.food_recipe.repository;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer>, JpaSpecificationExecutor<Recipe> {

    List<Recipe> findAllByNameLike(String name);

    boolean existsByName(String name);

    Optional<Recipe> findByIdAndCreator_Id(Integer recipeId, Integer creatorId);

    boolean existsByIdAndCreator_Id(Integer recipeId, Integer creatorId);

    List<Recipe> findByCreator(User creator);
}
