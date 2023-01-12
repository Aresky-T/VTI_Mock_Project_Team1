package com.food_recipe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "`Recipe_Ingredient`")
public class RecipeIngredient implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    //    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "`recipe_id`")
    @JsonBackReference
    private Recipes recipe;

    //    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "`ingredient_id`")
    private Ingredient ingredient;

    @Column(name = "`amount`", nullable = false)
    private Float amount;

    public RecipeIngredient(Integer recipe_id, Integer ingredient_id, Float amount) {
        ingredient = new Ingredient();
        recipe = new Recipes();
        this.ingredient.setId(ingredient_id);
        this.recipe.setId(recipe_id);
        this.amount = amount;
    }

    public RecipeIngredient() {

    }

//    @Embeddable
//    public static class RecipeIngredientKey implements Serializable {
//        @Column(name = "`recipe_id`")
//        Integer recipeId;
//
//        @Column(name = "`ingredient_id`")
//        Integer ingredientId;
//    }
}