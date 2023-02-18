package com.food_recipe.service;

import com.food_recipe.dto.VotingDTO;
import com.food_recipe.dto.VotingFormForUpdate;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.Voting;
import com.food_recipe.repository.VotingRepository;
import org.springframework.stereotype.Service;

@Service
public class VotingService implements IVotingService {

    private final VotingRepository votingRepository;

    public VotingService(VotingRepository votingRepository) {
        this.votingRepository = votingRepository;
    }


    @Override
    public Voting createVoting(VotingDTO voting) {
        return votingRepository.save(voting.toEntity());
    }

    @Override
    public void updateVoting(Recipe recipeId, VotingFormForUpdate form) {
        Voting voting = votingRepository.findByRecipeId(recipeId);
        voting.setStars(form.getStars());
        votingRepository.save(voting);
    }


    @Override
    public void deleteVoting(Recipe recipeId) {
        votingRepository.deleteByRecipeId(recipeId);
    }

}
