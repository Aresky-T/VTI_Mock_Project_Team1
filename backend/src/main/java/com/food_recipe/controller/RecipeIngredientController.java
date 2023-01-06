package com.food_recipe.controller;

import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.RecipeIngredientDTO;
import com.food_recipe.service.IRecipeIngredientService;
import com.food_recipe.service.IRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/recipeIngredient")
@Validated
public class RecipeIngredientController {

    @Autowired
    private IRecipeIngredientService recipeIngredientService;

    @PostMapping()
    public ResponseEntity<?> createRecipeIngredient(@RequestBody RecipeIngredientDTO form){
        // create Recipe
        recipeIngredientService.createRecipeIngredient(form);
        return new ResponseEntity<String>("Create Recipe successfully!", HttpStatus.OK);
    }
}
