package com.food_recipe.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VotingPK implements Serializable {
    private static final long serialVersionUID = 8907428815628634234L;
    private Integer userId;
    private Integer recipeId;
}
