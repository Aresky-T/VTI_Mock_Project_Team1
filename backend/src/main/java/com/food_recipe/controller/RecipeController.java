package com.food_recipe.controller;

import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.dto.recipe.response.RecipeDTO;
import com.food_recipe.dto.request.CreateRecipeRequest;
import com.food_recipe.dto.request.UpdateRecipeRequest;
import com.food_recipe.dto.response.*;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.user.User;
import com.food_recipe.exception.CommonException;
import com.food_recipe.service.recipe.IRecipeService;
import com.food_recipe.service.recipe_owner.IRecipeOwnerService;
import com.food_recipe.service.user.IUserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
    private IRecipeOwnerService recipeOwnerService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping()
    public ResponseEntity<?> createRecipe(
            Authentication authentication,
            @ModelAttribute @Validated CreateRecipeRequest form)
    {
        String name = authentication.getName();
        if(!userService.existsUserByUsername(name)){
            throw CommonException.INVALID_USERNAME;
        }
        User user = userService.findUserByUsername(name);
        Recipe recipe = recipeService.createRecipe(user, form);
        CreateRecipeResponse dto = new CreateRecipeResponse(recipe);
        return new ResponseEntity<>(dto, HttpStatus.OK);
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

    @GetMapping("/one/check-exists")
    public ResponseEntity<Boolean> checkRecipeExists(@RequestParam Integer recipeId){
        boolean isExists = recipeService.existRecipeById(recipeId);
        return new ResponseEntity<>(isExists, HttpStatus.OK);
    }

    @GetMapping("/one/details")
    public ResponseEntity<RecipeDetails> getRecipeDetails(@RequestParam Integer recipeId){
        Recipe recipe = recipeService.getRecipeById(recipeId);
        RecipeDetails dto = modelMapper.map(recipe, RecipeDetails.class);

        if(recipe.getPoint() > 0){
            dto.setSteps(Collections.emptyList());
        }

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/one/details-for-owner")
    public ResponseEntity<RecipeDetailsForOwner> getRecipeDetailsForOwner(
            Authentication authentication,
            @RequestParam Integer recipeId
    ){
        User user = userService.findUserByUsername(authentication.getName());
        Integer ownerId = user.getId();
        Recipe recipe = recipeService.getRecipeByRecipeIdAndOwnerId(recipeId, ownerId);
        RecipeDetailsForOwner dto = modelMapper.map(recipe, RecipeDetailsForOwner.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/one/details-for-creator")
    public ResponseEntity<RecipeDetailsForUpdateResponse> getRecipeDetailsForUpdate(
            Authentication authentication,
            @RequestParam Integer recipeId
    ){
        User user = userService.findUserByUsername(authentication.getName());
        Recipe recipe = recipeService.getRecipeByRecipeIdAndCreatorId(recipeId, user.getId());
        return new ResponseEntity<>(RecipeDetailsForUpdateResponse.toDto(recipe), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/all/created")
    public ResponseEntity<List<CreatedRecipeResponse>> getAllCreatedRecipes(Authentication authentication){
        User user = userService.findUserByUsername(authentication.getName());
        List<Recipe> recipes = recipeService.getAllRecipesByCreator(user);
        List<CreatedRecipeResponse> recipeDTOList = recipes.stream()
                .map(CreatedRecipeResponse::toDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(recipeDTOList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/all/purchased")
    public ResponseEntity<List<RecipeDTO>> getAllPurchasedRecipes(Authentication authentication){
        User user = userService.findUserByUsername(authentication.getName());
        List<RecipeOwner> recipeOwners = recipeOwnerService.getAllByOwnerAndIsCreator(user, false);
        List<RecipeDTO> recipeDTOList = recipeOwners.stream()
                .map(RecipeOwner::getRecipe)
                .map(recipe -> modelMapper.map(recipe, RecipeDTO.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(recipeDTOList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping
    public ResponseEntity<RecipeDetailsForUpdateResponse> updateRecipe(
            Authentication authentication,
            @ModelAttribute @Validated UpdateRecipeRequest request
    ){
        User creator = userService.findUserByUsername(authentication.getName());
        Integer recipeId = request.getId();
        Integer creatorId = creator.getId();
        recipeService.checkExistRecipeByIdAndCreatorId(recipeId, creatorId);
        Recipe updatedRecipe =  recipeService.updateRecipe(recipeId, request);
        return new ResponseEntity<>(RecipeDetailsForUpdateResponse.toDto(updatedRecipe), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping
    public ResponseEntity<?> deleteRecipeById (Authentication auth, @RequestParam(name = "recipeId") Integer recipeId) {
        User creator = userService.findUserByUsername(auth.getName());
        recipeService.deleteRecipeById(recipeId, creator.getId());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
