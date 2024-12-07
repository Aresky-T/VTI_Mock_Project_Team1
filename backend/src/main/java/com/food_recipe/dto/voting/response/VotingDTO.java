package com.food_recipe.dto.voting.response;

import com.food_recipe.entity.voting.Voting;
import com.food_recipe.entity.voting.VotingPK;
import lombok.Data;

@Data
public class VotingDTO {

    private Integer userId;
    private Integer recipeId;
    private Integer stars;

    public Voting toEntity () {
        return Voting.builder()
                .id(VotingPK.builder().userId(userId).recipeId(recipeId).build())
                .stars(stars)
                .build();
    }

}
