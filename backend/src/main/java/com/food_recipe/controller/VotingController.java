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


    @PostMapping
    public ResponseEntity<?> createVoting (@RequestBody VotingDTO voting) {
        Voting obj = votingService.createVoting(voting);
        VotingDTO dto = modelMapper.map(obj, VotingDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping(value = "/{recipeId}")
    public ResponseEntity<?> updateVoting(@PathVariable(name = "recipeId")Recipe recipe, VotingFormForUpdate form) {
        votingService.updateVoting(recipe, form);
        return new ResponseEntity<String>("Update Voting successfully!", HttpStatus.OK);
    }

    @DeleteMapping(value = "/{recipeId}")
    public ResponseEntity<?> deleteVoting(@PathVariable(name = "recipeId") Recipe recipeId) {
        votingService.deleteVoting(recipeId);
        return new ResponseEntity<String>("Delete Voting successfully!", HttpStatus.OK);
    }
}
