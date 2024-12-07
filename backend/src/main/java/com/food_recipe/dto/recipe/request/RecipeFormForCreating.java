
package com.food_recipe.dto.recipe.request;

import com.food_recipe.entity.recipe.Recipe;
import lombok.Data;

@Data
public class RecipeFormForCreating {

    private String name;
    private String description;
    private String imageUrl;
    private String processingSteps;
    private String note;
    private Integer point;
    private Integer creator;

    public Recipe toEntity() {
        return Recipe.builder()
                .name(name)
                .description(description)
                .imageUrl(imageUrl)
                .note(note)
                .point(point)
                .build();
    }
}
