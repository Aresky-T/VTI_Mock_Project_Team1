package com.food_recipe.repository;

import com.food_recipe.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer>, JpaSpecificationExecutor<Ingredient> {


    String RECIPE_INGREDIENT = "recipe_ingredient";
    String INGREDIENT = "ingredient";

    public boolean existsByName(String name);

    public Ingredient findIngredientByNameLike(String name);

    public void deleteByIdIn(List<Integer> ids);

    @Query(value = "select r.id as recipe_id, i.*" + "from recipe r " +
            "inner join recipe_ingredient ri on r.id = ri.recipe_idinner " +
            "join ingredient i on i.id = ri.ingredient_idwhere r.id in (1,2);", nativeQuery = true )
    List<Ingredient> findAllByRecipeId(Integer recipeId);

    List<Ingredient> findAllByIdIn(Collection<Integer> recipeIds);
}
