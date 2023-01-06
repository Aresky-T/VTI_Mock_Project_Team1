package com.food_recipe.dto;

import com.food_recipe.entity.Ingredient;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.entity.Recipes;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
public class RecipeIngredientDTO{

    private Integer id;

    private Integer recipes;

    private Integer ingredient;

    private Float amount;


    public RecipeIngredient toEntity() { return  new RecipeIngredient(recipes, ingredient, amount);
    }


}