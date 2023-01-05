package com.food_recipe.dto.filter;

public class RecipeFilter {

    private int minTotalRecipe;

    private int maxTotalRecipe;

    public RecipeFilter() {
    }

    public int getMinTotalRecipe() {
        return minTotalRecipe;
    }

    public void setMinTotalRecipe(int minTotalRecipe) {
        this.minTotalRecipe = minTotalRecipe;
    }

    public int getMaxTotalRecipe() {
        return maxTotalRecipe;
    }

    public void setMaxTotalRecipe(int maxTotalRecipe) {
        this.maxTotalRecipe = maxTotalRecipe;
    }
}
