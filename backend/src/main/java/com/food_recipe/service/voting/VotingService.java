package com.food_recipe.service.voting;

import com.food_recipe.dto.request.CreateVotingRequest;
import com.food_recipe.dto.request.UpdateVotingRequest;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.voting.Voting;
import com.food_recipe.entity.voting.VotingPK;
import com.food_recipe.entity.voting.VotingStatistic;
import com.food_recipe.exception.CommonException;
import com.food_recipe.repository.VotingRepository;
import com.food_recipe.repository.VotingStatisticRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class VotingService implements IVotingService {

    private final VotingRepository votingRepository;

    private final VotingStatisticRepository statisticRepository;

    public VotingService(VotingRepository votingRepository, VotingStatisticRepository statisticRepository) {
        this.votingRepository = votingRepository;
        this.statisticRepository = statisticRepository;
    }

    @Override
    public Integer getStars (Integer userId, Integer recipeId) {
        if(Boolean.FALSE.equals(votingRepository.existsByUserIdAndRecipeId(userId, recipeId))) {
            return null;
        }
        Voting voting = votingRepository.findByRecipeIdAndUserId(recipeId, userId);
        return voting.getStars();
    }

    @Override
    public Float getAverageStarsForRecipe(Integer recipeId) {
        return votingRepository.getAverageStarsByRecipeId(recipeId);
    }

    @Override
    public Integer getAllUsersVotedForRecipe(Integer recipeId) {
        return votingRepository.getAllUsersVotedForRecipe(recipeId);
    }


    @Override
    @Transactional
    public VotingStatistic createVoting(User user, Recipe recipe, CreateVotingRequest form) {
        int userId = user.getId();
        int recipeId = recipe.getId();
        if(votingRepository.existsByUserIdAndRecipeId(userId, recipeId)) {
            throw new CommonException("You have voted before!");
        }

        // save voting entity
        Voting voting = form.toEntity();
        voting.setUser(user);
        voting.setRecipe(recipe);
        voting.setId(VotingPK.builder().userId(userId).recipeId(recipeId).build());
        votingRepository.save(voting);

        // update statistic entity
        final VotingStatistic statistic;
        if(!statisticRepository.existsByRecipe(recipe)){
            statistic = statisticRepository.save(new VotingStatistic(recipe));
        } else {
            statistic = recipe.getVotingStatistic();
        }

        statistic.addVote(form.getStars());
        return statisticRepository.save(statistic);
    }

    @Override
    @Transactional
    public VotingStatistic updateVoting(User user, Recipe recipe, UpdateVotingRequest form) {
        int userId = user.getId();
        int recipeId = recipe.getId();
        if(!votingRepository.existsByUserIdAndRecipeId(userId, recipeId)){
            throw new CommonException("You've never voted before!");
        }


        Voting voting = votingRepository.findByRecipeIdAndUserId(recipeId, userId);
        int currentStars = voting.getStars();
        int newStars = form.getStars();

        voting.setStars(newStars);
        votingRepository.save(voting);

        // update statistic entity
        final VotingStatistic statistic = statisticRepository.findByRecipe(recipe);
        statistic.updateVote(currentStars, newStars);
        return statisticRepository.save(statistic);
    }


    @Override
    public void deleteVoting(Integer recipeId, Integer userId) {
        votingRepository.deleteByRecipeIdAndUserId(recipeId, userId);
    }

}
