package com.food_recipe.dto;

import com.food_recipe.entity.Voting;
import lombok.Data;

@Data
public class VotingDTO {

    private Integer userId;
    private Integer recipeId;
    private Integer stars;

    public Voting toEntity () {
        return new Voting(userId, recipeId, stars);
    }

}
