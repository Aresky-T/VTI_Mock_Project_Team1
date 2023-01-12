package com.food_recipe.dto;

import com.food_recipe.entity.Ingredient;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class IngredientDTO {

    private String name;

    private String unit;

    private Float amount;

    public Ingredient toEntity(){
        Ingredient ingredient = new Ingredient();
        ingredient.setName(name);
        ingredient.setUnit(unit);
        return ingredient;
    }

}
