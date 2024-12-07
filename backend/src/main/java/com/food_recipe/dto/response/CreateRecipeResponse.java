package com.food_recipe.dto.response;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.ingredient.Ingredient;
import com.food_recipe.entity.recipe.step.Step;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class CreateRecipeResponse {
    private Integer id;
    private String name;
    private String description;
    private String imageUrl;
    private String note;
    private Integer point;
    private Integer views;
    private List<IngredientResponse> ingredients;
    private List<StepResponse> steps;

    public CreateRecipeResponse(Recipe recipe){
        this.id = recipe.getId();
        this.name = recipe.getName();
        this.description = recipe.getDescription();
        this.imageUrl = recipe.getImageUrl();
        this.note = recipe.getNote();
        this.point = recipe.getPoint();
        this.views = recipe.getViews();
        this.ingredients = recipe.getIngredients().stream().map(IngredientResponse::new).collect(Collectors.toList());
        this.steps = recipe.getSteps().stream().map(StepResponse::new).collect(Collectors.toList());
    }

    @Data
    @NoArgsConstructor
    public static class IngredientResponse {
        private String name;
        private Float amount;
        private String unit;

        public IngredientResponse(Ingredient ingredient){
            this.name = ingredient.getName();
            this.amount = ingredient.getAmount();
            this.unit = ingredient.getUnit();
        }
    }

    @Data
    @NoArgsConstructor
    public static class StepResponse {
        private Integer stepNumber;
        private String name;
        private String description;
        private String duration;
        private String imageUrl;

        public StepResponse(Step step){
            this.stepNumber = step.getStepNumber();
            this.name = step.getName();
            this.description = step.getDescription();
            this.duration = step.getDuration();
            this.imageUrl = step.getImageUrl();
        }
    }
}
