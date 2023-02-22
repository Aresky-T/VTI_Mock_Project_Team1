package com.food_recipe.controller;

import com.food_recipe.dto.CommentDTO;
import com.food_recipe.dto.RecipeFormForCreating;
import com.food_recipe.dto.VotingDTO;
import com.food_recipe.dto.VotingFormForUpdate;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.Voting;
import com.food_recipe.service.IVotingService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/voting")
public class VotingController {
    @Autowired
    private IVotingService votingService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<?> getStars (@RequestParam Integer userId, @RequestParam Integer recipeId){
        Integer stars = votingService.getStars(userId, recipeId);
        if(stars == null){
            return new ResponseEntity<>("You have never rated this recipe before!", HttpStatus.OK);
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
    public ResponseEntity<?> createVoting (@RequestBody VotingDTO voting) {
        Voting obj = votingService.createVoting(voting);
        if (obj == null) {
            return new ResponseEntity<>("Failed", HttpStatus.OK);
        }
        VotingDTO dto = modelMapper.map(obj, VotingDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateVoting(@RequestBody VotingDTO voting) {
        String response = votingService.updateVoting(voting);
        return new ResponseEntity<String>(response, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteVoting(@RequestParam(name = "recipeId") Integer recipeId,
                                          @RequestParam(name = "userId") Integer userId) {
        votingService.deleteVoting(recipeId, userId);
        return new ResponseEntity<String>("Delete Voting successfully!", HttpStatus.OK);
    }
}
