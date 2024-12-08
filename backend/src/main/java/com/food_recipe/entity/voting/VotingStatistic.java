package com.food_recipe.entity.voting;

import com.food_recipe.entity.recipe.Recipe;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "voting_statistic")
public class VotingStatistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "vote_count", nullable = false)
    private Integer voteCount = 0;

    @Column(name = "total_stars", nullable = false)
    private Double totalStars = 0.0;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "recipe_id", nullable = false, unique = true)
    private Recipe recipe;

    public VotingStatistic(Recipe recipe){
        this.recipe = recipe;
    }

    public void addVote(double star){
        if(star < 1 || star > 5){
            throw new IllegalArgumentException("Star must be between 1 and 5!");
        }

        this.voteCount++;
        this.totalStars += star;
    }

    public void updateVote (double oldStar, double newStar){
        if(oldStar < 1 || oldStar > 5 || newStar < 1 || newStar > 5){
            throw new IllegalArgumentException("Star must be between 1 and 5!");
        }

        if(newStar == oldStar) return;
        this.totalStars += (newStar - oldStar);
    }

    public void clear(){
        this.totalStars = 0.0;
        this.voteCount = 0;
    }

    public Double getAverageVote(){
        return voteCount > 0 ? (double) totalStars / voteCount : 0.0;
    }
}
