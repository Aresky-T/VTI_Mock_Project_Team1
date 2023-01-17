package com.food_recipe.controller;

import com.food_recipe.dto.RecipeIngredientFormCreating;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.service.IRecipeIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/recipe-ingredient")
@Validated
public class RecipeIngredientController {

    @Autowired
    private IRecipeIngredientService recipeIngredientService;

    @PostMapping()
    public ResponseEntity<?> createRecipeIngredient(@RequestBody List<RecipeIngredientFormCreating> data) {
        recipeIngredientService.createRecipeIngredient(data);
        return new ResponseEntity<>("Add List Ingredients successfully!", HttpStatus.OK);
    }
}
