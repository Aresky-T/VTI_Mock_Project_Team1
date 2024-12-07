package com.food_recipe.dto.recipe.response;

import com.food_recipe.entity.recipe.Recipe;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RecipeResponse {
    private String code;
    private String name;
    private String imageUrl;

    public RecipeResponse(String code, String name, String imageUrl) {
        this.code = code;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public static RecipeResponse build(Recipe recipe){
        return new RecipeResponse(recipe.getCode(), recipe.getName(), recipe.getImageUrl());
    }
}
