package com.food_recipe.service;

import com.food_recipe.dto.RecipeIngredientDTO;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.repository.RecipeIngredientRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
@Service
public class RecipeIngredientService implements IRecipeIngredientService {

    private final RecipeIngredientRepository recipeIngredientRepository;

    public RecipeIngredientService(RecipeIngredientRepository recipeIngredientRepository) {
        this.recipeIngredientRepository = recipeIngredientRepository;
    }

    @Override
    public List<RecipeIngredient> getAll() {
        return recipeIngredientRepository.findAll();
    }

    @Override
    public void createRecipeIngredient(RecipeIngredientDTO form) {
        recipeIngredientRepository.save(form.toEntity());
    }

}
