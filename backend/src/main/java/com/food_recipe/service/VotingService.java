package com.food_recipe.service;

import com.food_recipe.dto.VotingDTO;
import com.food_recipe.dto.VotingFormForUpdate;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.Voting;
import com.food_recipe.repository.VotingRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class VotingService implements IVotingService {

    private final VotingRepository votingRepository;

    public VotingService(VotingRepository votingRepository) {
        this.votingRepository = votingRepository;
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
    public Voting createVoting(VotingDTO voting) {
        if(Boolean.TRUE.equals(votingRepository.existsByUserIdAndRecipeId(voting.getUserId(), voting.getRecipeId()))) {
            return null;
        }
        return votingRepository.save(voting.toEntity());
    }

    @Override
    @Transactional
    public String updateVoting(VotingDTO votingDTO) {
        if(Boolean.FALSE.equals(votingRepository.existsByUserIdAndRecipeId(votingDTO.getUserId(), votingDTO.getRecipeId()))) {
            return "Failed";
        }
        Voting voting = votingRepository.findByRecipeIdAndUserId(votingDTO.getRecipeId(), votingDTO.getUserId());
        voting.setStars(votingDTO.getStars());
        votingRepository.save(voting);
        return "Success";
    }


    @Override
    public void deleteVoting(Integer recipeId, Integer userId) {
        votingRepository.deleteByRecipeIdAndUserId(recipeId, userId);
    }

}
