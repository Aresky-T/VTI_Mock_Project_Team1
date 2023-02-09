package com.food_recipe.controller;

import com.food_recipe.dto.RecipeDTO;
import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.Recipe;
import com.food_recipe.service.IRecipeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
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

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping()
    public ResponseEntity<?> createRecipe(@RequestBody RecipeFormForCreating form) {
        if (recipeService.existRecipeByName(form.getName())){
            return new ResponseEntity<>("This recipe already exists!", HttpStatus.OK);
        }
        return new ResponseEntity<>(recipeService.createRecipe(form).getId(), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> getAllRecipes(
            Pageable pageable,
            RecipeFilter filter,
            @RequestParam(required = false)
            String search) {
        Page<Recipe> entities = recipeService.getAllRecipes(pageable, filter, search);
        List<RecipeDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<RecipeDTO>>(){}.getType());
        Page<RecipeDTO> dtoPage = new PageImpl<>(dtos, pageable, entities.getTotalElements());
        return new ResponseEntity<>(dtoPage, HttpStatus.OK);
    }

    @GetMapping("/search-by-name")
    ResponseEntity<?> findByRecipeName(
            @RequestParam(name = "name") String name) {
        if (!name.isEmpty()) {
            List<Recipe> entity = recipeService.findByNameLike("%" + name + "%");
            List<RecipeDTO> dto = modelMapper.map(entity, new TypeToken<List<RecipeDTO>>(){}.getType());
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
        return new ResponseEntity<>("Please enter a string for search by recipe name!", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable(name = "id") Integer id) {
        Recipe entity = recipeService.getRecipeById(id);
        RecipeDTO dto = modelMapper.map(entity, RecipeDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    
}
