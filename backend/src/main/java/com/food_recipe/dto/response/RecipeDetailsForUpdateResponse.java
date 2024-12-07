package com.food_recipe.dto.response;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.ingredient.Ingredient;
import com.food_recipe.entity.recipe.step.Step;
import com.food_recipe.utils.DateUtil;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDetailsForUpdateResponse {
    private Integer id;

    private String code;

    private String name;

    private String description;

    private String imageUrl;

    private String note;

    private Integer point;

    private Integer views;

    private String createDate;

    private List<StepDTO> steps;

    private List<IngredientDTO> ingredients;

    public static RecipeDetailsForUpdateResponse toDto (Recipe recipe){
        return RecipeDetailsForUpdateResponse.builder()
                .id(recipe.getId())
                .code(recipe.getCode())
                .name(recipe.getName())
                .description(recipe.getDescription())
                .imageUrl(recipe.getImageUrl())
                .note(recipe.getNote())
                .point(recipe.getPoint())
                .views(recipe.getViews())
                .createDate(DateUtil.formatDateTime(recipe.getCreateDate()))
                .steps(recipe.getSteps().stream().map(StepDTO::new).collect(Collectors.toList()))
                .ingredients(recipe.getIngredients().stream().map(IngredientDTO::new).collect(Collectors.toList()))
                .build();
    }

    @Data
    @NoArgsConstructor
    private static class StepDTO {
        private Integer id;
        private Integer stepNumber;
        private String name;
        private String description;
        private String duration;
        private String imageUrl;

        public StepDTO(Step step){
            this.id = step.getId();
            this.stepNumber = step.getStepNumber();
            this.name = step.getName();
            this.description = step.getDescription();
            this.duration = step.getDuration();
            this.imageUrl = step.getImageUrl();
        }

        public static StepDTO toDto (Step step){
            return new StepDTO(step);
        };
    }

    @Data
    @NoArgsConstructor
    private static class IngredientDTO {
        private Integer id;
        private String name;
        private Float amount;
        private String unit;

        public IngredientDTO(Ingredient ingredient) {
            this.id = ingredient.getId();
            this.name = ingredient.getName();
            this.amount = ingredient.getAmount();
            this.unit = ingredient.getUnit();
        }

        public static IngredientDTO toDto(Ingredient ingredient){
            return new IngredientDTO(ingredient);
        }
    }
}
