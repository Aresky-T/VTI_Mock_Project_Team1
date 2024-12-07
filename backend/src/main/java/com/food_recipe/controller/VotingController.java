package com.food_recipe.controller;

import com.food_recipe.dto.request.CreateVotingRequest;
import com.food_recipe.dto.request.UpdateVotingRequest;
import com.food_recipe.dto.response.VotingStatisticResponse;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.voting.VotingStatistic;
import com.food_recipe.exception.CommonException;
import com.food_recipe.service.recipe.IRecipeService;
import com.food_recipe.service.user.IUserService;
import com.food_recipe.service.voting.IVotingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/voting")
public class VotingController {
    @Autowired
    private IVotingService votingService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IRecipeService recipeService;

    @GetMapping
    public ResponseEntity<?> getStars (@RequestParam Integer userId, @RequestParam Integer recipeId){
        Integer stars = votingService.getStars(userId, recipeId);
        if(stars == null){
            throw new CommonException("You have never rated this recipe before!");
        }
        return new ResponseEntity<>(votingService.getStars(userId, recipeId), HttpStatus.OK);
    }

    @GetMapping("/average-stars/{recipeId}")
    public ResponseEntity<?> getAverageStars(@PathVariable(name = "recipeId") Integer recipeId){
        return new ResponseEntity<>(votingService.getAverageStarsForRecipe(recipeId), HttpStatus.OK);
    }

    @GetMapping("/all-users-voted/{recipeId}")
    public ResponseEntity<?> getAllUsersVotedForRecipe(@PathVariable(name = "recipeId") Integer recipe){
        return new ResponseEntity<>(votingService.getAllUsersVotedForRecipe(recipe), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VotingStatisticResponse> createVoting (Authentication authentication, @RequestBody CreateVotingRequest form) {
        User user = userService.findUserByUsername(authentication.getName());
        Recipe recipe = recipeService.getRecipeById(form.getRecipeId());
        VotingStatistic statistic = votingService.createVoting(user, recipe, form);
        return new ResponseEntity<>(new VotingStatisticResponse(statistic), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<VotingStatisticResponse> updateVoting(Authentication authentication, @RequestBody UpdateVotingRequest form) {
        User user = userService.findUserByUsername(authentication.getName());
        Recipe recipe = recipeService.getRecipeById(form.getRecipeId());
        VotingStatistic statistic = votingService.updateVoting(user, recipe, form);
        return new ResponseEntity<>(new VotingStatisticResponse(statistic), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteVoting(@RequestParam(name = "recipeId") Integer recipeId,
                                          @RequestParam(name = "userId") Integer userId) {
        votingService.deleteVoting(recipeId, userId);
        return new ResponseEntity<String>("Delete Voting successfully!", HttpStatus.OK);
    }
}
