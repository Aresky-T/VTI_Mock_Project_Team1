package com.food_recipe.service;

import com.food_recipe.dto.RecipeIngredientFormCreating;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.repository.RecipeIngredientRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public List<RecipeIngredient> getAllById(List<Integer> ids) {
        return recipeIngredientRepository.findAllById(ids);
    }

    @Override
    public void createRecipeIngredient(List<RecipeIngredientFormCreating> obj) {
        List<RecipeIngredient> list = new ArrayList<>();

        for (RecipeIngredientFormCreating r: obj) {
            RecipeIngredient recipeIngredient = r.toEntity();
            list.add(recipeIngredient);
        }
        recipeIngredientRepository.saveAll(list);
    }

}
