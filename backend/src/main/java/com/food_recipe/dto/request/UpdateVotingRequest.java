package com.food_recipe.dto.request;

import com.food_recipe.entity.voting.Voting;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class UpdateVotingRequest {
    @NotNull(message = "Required recipeId!")
    private Integer recipeId;

    @NotNull(message = "Required stars!")
    @Min(value = 1, message = "Stars must be greater than or equal 0!")
    @Max(value = 5, message = "Stars must be less than or equal 0!")
    private Integer stars;

    public Voting toEntity () {
        return Voting.builder()
                .stars(stars)
                .build();
    }
}
