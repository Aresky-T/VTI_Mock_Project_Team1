package com.food_recipe.repository;

import com.food_recipe.entity.Recipes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipes, Integer>, JpaSpecificationExecutor<Recipes> {


    List<Recipes> findByNameLike(String name);
}
