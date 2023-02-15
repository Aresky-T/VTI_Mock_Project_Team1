package com.food_recipe.service;

import com.food_recipe.dto.VotingDTO;
import com.food_recipe.dto.VotingFormForUpdate;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.Voting;

public interface IVotingService {

    Voting createVoting (VotingDTO votingDTO);
    // ------------- Update voting ----------------------------

    void updateVoting(Recipe recipeId, VotingFormForUpdate form);

    // ------------- Delete voting ----------------------------

    void deleteVoting(Recipe recipeId);
}
