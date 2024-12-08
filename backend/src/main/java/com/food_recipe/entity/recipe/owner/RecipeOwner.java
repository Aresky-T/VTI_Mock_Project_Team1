package com.food_recipe.entity.recipe.owner;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`recipe_owner`")
public class RecipeOwner implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private RecipeOwnerPK id;

    @ManyToOne
    @MapsId("recipeId")
    @JsonBackReference
    @JoinColumn(name = "`recipe_id`", nullable = false, referencedColumnName = "`id`")
    private Recipe recipe;

    @ManyToOne
    @MapsId("ownerId")
    @JsonBackReference
    @JoinColumn(name = "`owner_id`", nullable = false, referencedColumnName = "`id`")
    private User owner;

    @Column(name = "`is_creator`", nullable = false)
    private Boolean isCreator;

    public static RecipeOwner buildEntity(Recipe recipe, User owner){
        return RecipeOwner.builder()
                .id(RecipeOwnerPK.build(recipe.getId(), owner.getId()))
                .recipe(recipe)
                .owner(owner)
                .isCreator(recipe.getCreator().getId().equals(owner.getId()))
                .build();
    }

    public static RecipeOwner buildEntity(Recipe recipe, User owner, Boolean isCreator){
        return RecipeOwner.builder()
                .id(RecipeOwnerPK.build(recipe.getId(), owner.getId()))
                .recipe(recipe)
                .owner(owner)
                .isCreator(isCreator)
                .build();
    }
}
