
package com.food_recipe.dto;

import com.food_recipe.entity.Recipe;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.Map;

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
        return new Recipe(name, description, imageUrl, processingSteps, note, point, creator);
    }
}
