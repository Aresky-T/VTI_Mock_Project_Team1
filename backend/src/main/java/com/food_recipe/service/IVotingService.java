package com.food_recipe.service;

import com.food_recipe.dto.VotingDTO;
import com.food_recipe.dto.VotingFormForUpdate;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.Voting;

public interface IVotingService {

    Voting createVoting (VotingDTO votingDTO);
    // ------------- Update voting ----------------------------

    String updateVoting(VotingDTO votingDTO);

    // ------------- Delete voting ----------------------------

    void deleteVoting(Integer recipeId, Integer userId);

    Integer getStars (Integer userId, Integer recipeId);

    Float getAverageStarsForRecipe (Integer recipeId);

    Integer getAllUsersVotedForRecipe (Integer recipeId);

}
