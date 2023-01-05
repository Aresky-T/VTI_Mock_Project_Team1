package com.food_recipe.service;



import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.Recipes;
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

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }


    @Override
    public List<Recipes> findByName(String name) {
        return null;
    }

    @Override
    public void createRecipe(RecipeFormForCreating form) {
        recipeRepository.save(form.toEntity());
    }


    @Override
    public Page<Recipes> getAllRecipes(Pageable pageable, RecipeFilter filter, String search) {

        RecipeSpecificationBuilder specificationBuilder = new RecipeSpecificationBuilder(filter, search);

        return recipeRepository.findAll(specificationBuilder.build(), pageable);
    }



}