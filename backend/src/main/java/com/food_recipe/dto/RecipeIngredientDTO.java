package com.food_recipe.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeIngredientDTO {

    private Integer id;

    private String name;

    private Float amount;

    private String unit;

    public RecipeIngredientDTO() {
    }

    public RecipeIngredientDTO(String name, Float amount, String unit) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
}
