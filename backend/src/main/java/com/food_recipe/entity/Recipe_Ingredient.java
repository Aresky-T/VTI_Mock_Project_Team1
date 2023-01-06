package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "`Recipe_Ingredient`")
public class Recipe_Ingredient implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "`recipe_id`", referencedColumnName = "id")
    private Recipes recipe;

    @ManyToOne
    @JoinColumn(name = "`ingredient_id`", referencedColumnName = "id")
    private Ingredient ingredient;

    @Column(name = "`amount`", nullable = false)
    private Float amount;


    public Recipe_Ingredient(Integer recipe_id, Integer ingredient_id, Float amount) {
        ingredient = new Ingredient();
        recipe = new Recipes();
        this.ingredient.setId(ingredient_id);
        this.recipe.setId(recipe_id);
        this.amount = amount;
    }

    public Recipe_Ingredient() {

    }
}