package com.food_recipe.controller;

import com.food_recipe.dto.response.RecipeTransactionResponse;
import com.food_recipe.entity.comment.EUserRole;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.transaction.RecipeTransaction;
import com.food_recipe.entity.user.User;
import com.food_recipe.service.recipe.IRecipeService;
import com.food_recipe.service.recipe_transaction.IRecipeTransactionService;
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
@RequestMapping("/api/v1/recipe-transaction")
public class RecipeTransactionController {

    @Autowired
    private IRecipeTransactionService recipeTransactionService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IRecipeService recipeService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<?> createTransaction(Authentication auth, @RequestParam Integer recipeId){
        User user = userService.findUserByUsername(auth.getName());
        Recipe recipe = recipeService.getRecipeById(recipeId);
        recipeTransactionService.createTransaction(recipe, user);
        user.getComments().stream().filter(cmt -> cmt.getRecipe().getId().equals(recipeId))
                .forEach(cmt -> cmt.setUserRole(EUserRole.OWNER));
        userService.save(user);
        return new ResponseEntity<>("Congratulations! You have successfully purchased the recipe. It's now yours to explore and enjoy. Happy cooking!", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/all/user")
    public ResponseEntity<List<RecipeTransactionResponse>> getAllTransactions(Authentication authentication){
        User user = userService.findUserByUsername(authentication.getName());
        List<RecipeTransaction> transactions = recipeTransactionService.getAllTransactions(user);
        List<RecipeTransactionResponse> dtos = transactions.stream().map(RecipeTransactionResponse::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
