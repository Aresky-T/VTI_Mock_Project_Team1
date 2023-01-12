package com.food_recipe.service;


import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.RecipeIngredientDTO;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.Ingredient;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.entity.Recipes;
import com.food_recipe.repository.IngredientRepository;
import com.food_recipe.repository.RecipeIngredientRepository;
import com.food_recipe.repository.RecipeRepository;
import com.food_recipe.specification.RecipeSpecificationBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Component
@Transactional
@Service
public class RecipeService implements IRecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;

    private final IngredientRepository ingredientRepository;

    public RecipeService(RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.ingredientRepository = ingredientRepository;
    }


    @Override
    public List<Recipes> findByName(String name) {
        return null;
    }

    @Override
    public Recipes createRecipe(RecipeFormForCreating form) {
        // Lưu công thwucs vào DB
        Recipes recipes = form.toEntity();
        recipes =  recipeRepository.save(recipes);

        List<RecipeIngredient> recipeIngredients = new ArrayList<>();
        // for lấy id nguyên liệu đã tồn tại -> tạo ra bảng công thức nguyên liệu -> lưu vào DB
        for (Map.Entry<Integer, Float> entry : form.getIngredientIds().entrySet()){
            Ingredient ingredient = ingredientRepository.findById(entry.getKey()).orElse(null);
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setRecipe(recipes);
            recipeIngredient.setAmount(entry.getValue());
            recipeIngredient.setIngredient(ingredient);
            recipeIngredients.add(recipeIngredient);
        }

        recipes.setIngredients( recipeIngredientRepository.saveAll(recipeIngredients));
        return recipes;
    }


    @Override
    public Page<Recipes> getAllRecipes(Pageable pageable, RecipeFilter filter, String search) {

        RecipeSpecificationBuilder specificationBuilder = new RecipeSpecificationBuilder(filter, search);

        return recipeRepository.findAll(specificationBuilder.build(), pageable);
    }

    public Recipes getRecipeById(Integer id) {
        return recipeRepository.findById(id).get();
    }

    public void createRecipeIngredient(RecipeIngredient recipeIngredient) {
        recipeIngredientRepository.save(recipeIngredient);
    }

}
