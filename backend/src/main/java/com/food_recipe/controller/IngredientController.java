package com.food_recipe.controller;

import com.food_recipe.dto.IngredientCreatingFromDTO;
import com.food_recipe.dto.IngredientDTO;
import com.food_recipe.entity.Ingredient;
import com.food_recipe.service.IIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/ingredient")
@Validated
public class IngredientController {

    @Autowired
    private IIngredientService ingredientService;

    @GetMapping()
    public List<Ingredient> getAll() {
        return ingredientService.getAllIngredients();
    }

    @PostMapping()
    public ResponseEntity<?> createIngredient(@RequestBody IngredientCreatingFromDTO form) {
        // create Recipe
        ingredientService.createIngredient(form);
        return new ResponseEntity<String>("Create Ingredient successfully!", HttpStatus.OK);
    }

    @GetMapping(value = "/exists/{name}")
    public ResponseEntity<?> existsByName(@PathVariable(name = "name") String name) {
        // get entity
        boolean result = ingredientService.existsIngredientByName(name);

        // return result
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/name/{value}")
    ResponseEntity<Ingredient> findIngredientByName(
            @PathVariable(name = "value") String name) {
        return new ResponseEntity<>(ingredientService.findIngredientByName(name), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateIngredient(@PathVariable(name = "id") Integer id, @RequestBody IngredientDTO form) {
        ingredientService.updateIngredient(id, form);
        return new ResponseEntity<String>("Update Ingredient successfully!", HttpStatus.OK);
    }

    @DeleteMapping(value = "/{ids}")
    public ResponseEntity<?> deleteIngredient(@PathVariable(name = "ids") List<Integer> ids) {
        ingredientService.deleteIngredient(ids);
        return new ResponseEntity<String>("Delete Ingredient successfully!", HttpStatus.OK);
    }
}
