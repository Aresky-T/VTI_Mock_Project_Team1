package com.food_recipe.controller;

import com.food_recipe.dto.RecipeDTO;
import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.Recipes;
import com.food_recipe.service.IRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/recipes")
@Validated
public class RecipeController {

    @Autowired
    private IRecipeService recipeService;

    @PostMapping()
    public ResponseEntity<?> createRecipe(@RequestBody RecipeFormForCreating form){
        // create Recipe
        recipeService.createRecipe(form);
        return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> getAllRecipes(
            Pageable pageable,
            RecipeFilter filter,
            @RequestParam(required = false)
            String search) {
        Page<Recipes> entities = recipeService.getAllRecipes(pageable, filter, search);
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }

    @GetMapping("/name/{value}")
    ResponseEntity<List<Recipes>> findByRecipeName(
           @PathVariable(name = "value") String name) {
        return ResponseEntity.ok().body(recipeService.findByName(name));

    }
}
