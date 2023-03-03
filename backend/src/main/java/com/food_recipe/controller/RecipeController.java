package com.food_recipe.controller;

import com.food_recipe.dto.*;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.RecipeExchangeHistory;
import com.food_recipe.entity.User;
import com.food_recipe.service.IRecipeExchangeService;
import com.food_recipe.service.IRecipeService;
import com.food_recipe.service.IUserService;
import com.food_recipe.service.RecipeExchangeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    private IUserService userService;

    @Autowired
    private IRecipeExchangeService recipeExchangeService;

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
    @GetMapping("/get-list-for-creator/{id}")
    ResponseEntity<?> getListForCreator(@PathVariable(name = "id") Integer creatorId){
        List<Recipe> recipes = recipeService.getListForCreator(creatorId);
        List<RecipeDTO> dtos = modelMapper.map(recipes, new TypeToken<List<RecipeDTO>>(){}.getType());
        return  new ResponseEntity<>(dtos, HttpStatus.OK);
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

    @GetMapping("/before-login/{id}")
    public ResponseEntity<?> findRecipeById(@PathVariable(name = "id") Integer id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if(recipe.getPoint() == 0) {
            RecipeDTO dto = modelMapper.map(recipe, RecipeDTO.class);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }else{
            RecipeHalfDTO dto = modelMapper.map(recipe, RecipeHalfDTO.class);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
    }

    @GetMapping("/after-login/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable(name = "id") Integer id, Authentication authentication) {

        Recipe recipe = recipeService.getRecipeById(id);
        String username = authentication.getName();
        User user = userService.findUserByUsername(username);

        RecipeDTO dto = modelMapper.map(recipe, RecipeDTO.class);
        if(recipeExchangeService.isExistsExchange(user.getId(), id) == true) {
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }else if(recipe.getCreator().getId() == user.getId()){
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Bạn phải giao dịch Recipe, thì mới xem được Recipe", HttpStatus.OK);
        }


    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateRecipe(@PathVariable(name = "id") Integer id, @RequestBody RecipeFormForUpdate form) {
        var response = recipeService.updateRecipe(id, form);
        return new ResponseEntity<String>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{ids}")
    public ResponseEntity<?> deleteRecipe(@PathVariable(name = "ids") List<Integer> ids) {
        recipeService.deleteRecipe(ids);
        return new ResponseEntity<String>("Delete Recipe successfully!", HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete-by-id")
    public ResponseEntity<?> deleteRecipeById (@RequestParam(name = "recipeId") Integer recipeId,
                                               @RequestParam(name = "creatorId") Integer creatorId) {
        var response = recipeService.deleteRecipeById(recipeId, creatorId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
