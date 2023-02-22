package com.food_recipe.controller;

import com.food_recipe.dto.CommentDTO;
import com.food_recipe.dto.RecipeExchangeDTO;
import com.food_recipe.dto.RecipeExchangeFormForCreating;
import com.food_recipe.entity.Comment;
import com.food_recipe.entity.RecipeExchangeHistory;
import com.food_recipe.service.RecipeExchangeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/exchange")
public class RecipeExchangeController {

    @Autowired
    private RecipeExchangeService recipeExchangeService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<String> createExchange (@RequestBody RecipeExchangeFormForCreating data) {
        return new ResponseEntity<>(recipeExchangeService.createExchange(data), HttpStatus.OK);
    }

    @GetMapping("/recipe/{recipeId}")
    public List<RecipeExchangeDTO> getAllRecipeExchangeByRecipeId (@PathVariable Integer recipeId) {
        List<RecipeExchangeHistory> entities = recipeExchangeService.getRecipeExchangeByRecipeId(recipeId);
        return modelMapper.map(entities,
                new TypeToken<List<CommentDTO>>() {}.getType()
        );
    }

    @GetMapping("/user/{recipeId}")
    public List<RecipeExchangeDTO> getAllRecipeExchangeByUserId (@PathVariable Integer userId) {
        List<RecipeExchangeHistory> entities = recipeExchangeService.getRecipeExchangeByUserId(userId);
        return modelMapper.map(entities,
                new TypeToken<List<CommentDTO>>() {}.getType()
        );
    }
}
