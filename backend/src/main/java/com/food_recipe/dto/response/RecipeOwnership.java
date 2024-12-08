package com.food_recipe.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RecipeOwnership {
    Boolean isOwner;
    Boolean isCreator;

    public RecipeOwnership(boolean isOwner, boolean isCreator) {
        this.isOwner = isOwner;
        this.isCreator = isCreator;
    }
}
