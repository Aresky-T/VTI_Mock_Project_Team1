package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class VotingPK implements Serializable {
    private static final long serialVersionUID = 8907428815628634234L;
    private Integer userId;
    private Integer recipeId;
}
