package com.food_recipe.service;

import com.food_recipe.dto.IngredientCreatingFromDTO;
import com.food_recipe.dto.IngredientDTO;
import com.food_recipe.entity.Ingredient;

import java.util.List;

public interface IIngredientService {

    List<Ingredient> getAllIngredients();

    void createIngredient(IngredientCreatingFromDTO form);

    void updateIngredient(Integer id, IngredientDTO form);

    void deleteIngredient(List<Integer> ids);

    Ingredient findIngredientByName(String name);

    boolean existsIngredientByName(String name);
}
