package com.food_recipe.controller;

import com.food_recipe.dto.RecipeExchangeFormForCreating;
import com.food_recipe.service.RecipeExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/exchange")
public class RecipeExchangeController {

    @Autowired
    private RecipeExchangeService recipeExchangeService;

    @PostMapping
    public ResponseEntity<String> createExchange (@RequestBody RecipeExchangeFormForCreating data) {
        return new ResponseEntity<>(recipeExchangeService.createExchange(data), HttpStatus.OK);
    }
}
