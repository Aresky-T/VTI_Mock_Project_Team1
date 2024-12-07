package com.food_recipe.service.voting;

import com.food_recipe.dto.request.CreateVotingRequest;
import com.food_recipe.dto.request.UpdateVotingRequest;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.voting.VotingStatistic;

public interface IVotingService {

    VotingStatistic createVoting (User user, Recipe recipe, CreateVotingRequest form);
    // ------------- Update voting ----------------------------

    VotingStatistic updateVoting(User user, Recipe recipe, UpdateVotingRequest form);

    // ------------- Delete voting ----------------------------

    void deleteVoting(Integer recipeId, Integer userId);

    Integer getStars (Integer userId, Integer recipeId);

    Float getAverageStarsForRecipe (Integer recipeId);

    Integer getAllUsersVotedForRecipe (Integer recipeId);

}
