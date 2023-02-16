package com.food_recipe.controller;

import com.food_recipe.dto.*;
import com.food_recipe.service.IRecipeIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
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

    @PutMapping(value = "/{ids}")
    public ResponseEntity<?> updateRecipe(@RequestBody List<RecipeIngredientDTO> list) {
        List<Integer> ids = new ArrayList<>();
        for (RecipeIngredientDTO dto : list) {
            ids.add(dto.getId());
        }
        recipeIngredientService.updateRecipeIngredient(ids, list);
        return new ResponseEntity<String>("Update RecipeIngredient successfully!", HttpStatus.OK);
    }

    @DeleteMapping(value = "/{ids}")
    public ResponseEntity<?> deleteRecipe(@PathVariable(name = "ids") List<Integer> ids) {
        recipeIngredientService.deleteRecipeIngredient(ids);
        return new ResponseEntity<String>("Delete RecipeIngredient successfully!", HttpStatus.OK);
    }

    
}
