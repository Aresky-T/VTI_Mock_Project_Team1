package com.food_recipe.entity.point;

import lombok.Getter;

@Getter
public enum EPointActivityType {
    EARN_POINTS("Earn points"),
    LOSE_POINTS("Lose points");

    private final String description;

    EPointActivityType(String description){
        this.description = description;
    }
}
