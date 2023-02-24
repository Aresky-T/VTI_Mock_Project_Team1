package com.food_recipe.service;


import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.RecipeFormForUpdate;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.RecipeExchangeHistory;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.entity.Recipe;
import com.food_recipe.repository.RecipeExchangeRepository;
import com.food_recipe.repository.RecipeIngredientRepository;
import com.food_recipe.repository.RecipeRepository;
import com.food_recipe.specification.RecipeSpecificationBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Component
@Transactional
@Service
public class RecipeService implements IRecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeExchangeRepository recipeExchangeRepository;

    public RecipeService(RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, RecipeExchangeRepository recipeExchangeRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeExchangeRepository = recipeExchangeRepository;
    }


    @Override
    public List<Recipe> findByNameLike(String name) {
        return recipeRepository.findAllByNameLike(name);
    }

    @Override
    public Boolean existRecipeByName(String name) {
        return recipeRepository.existsByName(name);
    }

    @Override
    public Recipe createRecipe(RecipeFormForCreating form) {
        return recipeRepository.save(form.toEntity());
    }


    @Override
    public Page<Recipe> getAllRecipes(Pageable pageable, RecipeFilter filter, String search) {

        RecipeSpecificationBuilder specificationBuilder = new RecipeSpecificationBuilder(filter, search);

        return recipeRepository.findAll(specificationBuilder.build(), pageable);
    }

    public Recipe getRecipeById(Integer id) {
        return recipeRepository.findById(id).get();
    }

    @Override
    public RecipeExchangeHistory findByUserId(Integer userId) {
        return recipeExchangeRepository.findByUserId(userId);
    }

    public void createRecipeIngredient(RecipeIngredient recipeIngredient) {
        recipeIngredientRepository.save(recipeIngredient);
    }

    @Override
    public void updateRecipe(Integer id, RecipeFormForUpdate form) {
        Recipe recipe = recipeRepository.findById(id).get();
        recipe.setName(form.getName());
        recipe.setDescription(form.getDescription());
        recipe.setImageUrl(form.getImageUrl());
        recipe.setProcessingSteps(form.getProcessingSteps());
        recipe.setNote(form.getNote());
        recipe.setPoint(form.getPoint());
        recipeRepository.save(recipe);
    }

    @Override
    public void deleteRecipe(List<Integer> ids) {
        recipeRepository.deleteAllByIdInBatch(ids);
    }

}
