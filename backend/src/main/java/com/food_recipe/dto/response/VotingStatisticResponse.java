package com.food_recipe.dto.response;

import com.food_recipe.entity.voting.VotingStatistic;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VotingStatisticResponse {
    private Integer voteCount;
    private Double averageVote;

    public VotingStatisticResponse(VotingStatistic statistic){
        this.voteCount = statistic.getVoteCount();
        this.averageVote = statistic.getAverageVote();
    }
}
