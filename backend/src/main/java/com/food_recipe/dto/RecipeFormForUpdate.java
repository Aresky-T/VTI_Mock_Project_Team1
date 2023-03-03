package com.food_recipe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeFormForUpdate {

    private Integer creatorId;

    private String name;

    private String imageUrl;

    private String description;

    private String processingSteps;

    private String note;

    private Integer point;


}
