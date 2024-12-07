package com.food_recipe.entity.recipe.owner;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Embeddable
public class RecipeOwnerPK implements Serializable {

    @Column(name = "recipe_id")
    private Integer recipeId;

    @Column(name = "owner_id")
    private Integer ownerId;

    public RecipeOwnerPK(Integer recipeId, Integer ownerId){
        this.recipeId = recipeId;
        this.ownerId = ownerId;
    }

    public static RecipeOwnerPK build(Integer recipeId, Integer ownerId){
        return new RecipeOwnerPK(recipeId, ownerId);
    }
}
