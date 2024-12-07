package com.food_recipe.controller;

import com.food_recipe.dto.response.RecipeOwnerResponse;
import com.food_recipe.dto.response.RecipeOwnership;
import com.food_recipe.entity.comment.EUserRole;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import com.food_recipe.exception.CommonException;
import com.food_recipe.service.recipe.IRecipeService;
import com.food_recipe.service.recipe_owner.IRecipeOwnerService;
import com.food_recipe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/recipe-owner")
public class RecipeOwnerController {

    @Autowired
    private IRecipeOwnerService recipeOwnerService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IRecipeService recipeService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/all")
    public ResponseEntity<List<RecipeOwnerResponse>> getAllRecipeOwners(Authentication authentication, @RequestParam Integer recipeId){
        User user = userService.findUserByUsername(authentication.getName());
        Recipe recipe = recipeService.getRecipeById(recipeId);
        if(!recipe.getCreator().getId().equals(user.getId())){
            throw new CommonException("Recipe access denied!");
        }

        List<RecipeOwnerResponse> owners = recipeOwnerService.getAllForRecipe(recipe)
                .stream()
                .map(RecipeOwnerResponse::toDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(owners, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/ownership")
    public ResponseEntity<RecipeOwnership> checkRecipeOwnership(Authentication authentication, @RequestParam Integer recipeId){
        User user = userService.findUserByUsername(authentication.getName());
        Recipe recipe = recipeService.getRecipeById(recipeId);
        RecipeOwnership ownership = recipeOwnerService.getRecipeOwnershipForUser(user, recipe);
        return new ResponseEntity<>(ownership, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/ownership")
    public ResponseEntity<?> disableRecipeOwnership(Authentication auth, @RequestParam Integer recipeId){
        User user = userService.findUserByUsername(auth.getName());
        Recipe recipe = recipeService.getRecipeById(recipeId);
        recipeOwnerService.disableRecipeOwnershipForUser(user, recipe);

        user.getComments().stream().filter(cmt -> cmt.getRecipe().getId().equals(recipeId))
                .forEach(cmt -> cmt.setUserRole(EUserRole.NORMAL));

        userService.save(user);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
