package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class RecipeExchangeHistoryPK implements Serializable {

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "recipe_id", nullable = false)
    private Integer recipeId;
}
