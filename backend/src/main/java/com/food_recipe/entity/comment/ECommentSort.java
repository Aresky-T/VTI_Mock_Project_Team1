package com.food_recipe.entity.comment;

import lombok.Getter;

@Getter
public enum ECommentSort {
    NEWEST("The newest comment list"),
    OLDEST("The oldest comment list"),
    MOST_LIKED("The most liked comment list"),
    MOST_REPLIED("The most replied comment list");

    private final String description;

    ECommentSort(String description){
        this.description = description;
    }
}
