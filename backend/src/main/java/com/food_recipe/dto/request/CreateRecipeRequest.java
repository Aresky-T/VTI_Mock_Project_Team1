package com.food_recipe.dto.request;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.ingredient.Ingredient;
import com.food_recipe.entity.recipe.step.Step;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class CreateRecipeRequest {
    @NotNull(message = "Required recipe name!")
    @NotEmpty(message = "Recipe name cannot be empty!")
    private String name;

    @NotNull(message = "Required recipe name!")
    @NotEmpty(message = "Recipe name cannot be empty!")
    private String description;

    @NotNull(message = "Required imageFile for recipe!")
    private MultipartFile imageFile;

    private String note;

    private Integer point;

    @NotNull(message = "Required ingredient list!")
    @Size(min = 1, message = "Recipe must have at least one ingredient or more!")
    private List<IngredientRequest> ingredients;

    @NotNull(message = "Required steps!")
    @Size(min = 1, message = "Recipe must have at least one step or more!")
    private List<StepRequest> steps;

    public Recipe toRecipeEntity() {
        return Recipe.builder()
                .name(name)
                .description(description)
                .note(note)
                .point(point)
                .views(0)
                .steps(steps.stream().map(StepRequest::toStepEntity).collect(Collectors.toList()))
                .ingredients(ingredients.stream().map(IngredientRequest::toIngredientEntity).collect(Collectors.toList()))
                .build();
    }

    @Data
    @NoArgsConstructor
    public static class IngredientRequest {

        @NotNull(message = "Required name for each ingredient!")
        @NotBlank(message = "The name of ingredient cannot be blank!")
        private String name;

        @NotNull(message = "Required amount for each ingredient!")
        private Float amount;

        @NotNull(message = "Required ingredient unit!")
        @NotBlank(message = "The unit of each ingredient cannot be blank!")
        private String unit;

        public Ingredient toIngredientEntity() {
            return Ingredient.builder()
                    .name(name)
                    .amount(amount)
                    .unit(unit)
                    .build();
        }
    }

    @Data
    @NoArgsConstructor
    public static class StepRequest {

        @NotNull(message = "Required stepNumber for each step!")
        @Min(value = 1, message = "The step number must be greater than or equal 1!")
        private Integer stepNumber;

        @NotNull(message = "Required duration for each step!")
        @NotBlank(message = "The duration of each step cannot be blank!")
        private String duration;

        @NotNull(message = "Required name for each step!")
        @NotBlank(message = "The name of each step cannot be blank!")
        private String name;

        @NotNull(message = "Required description for each step!")
        @NotBlank(message = "The description of each step cannot be blank!")
        private String description;

        @NotNull(message = "Required imageFile for each step!")
        private MultipartFile imageFile;

        public Step toStepEntity() {
            return Step.builder()
                    .stepNumber(stepNumber)
                    .name(name)
                    .description(description)
                    .duration(duration)
                    .build();
        }
    }
}
