package com.food_recipe.dto.filter;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RecipeFilter {

    private int minTotalRecipe;

    private int maxTotalRecipe;

}
