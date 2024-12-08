package com.food_recipe.dto.request;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.ingredient.Ingredient;
import com.food_recipe.entity.recipe.step.Step;
import com.food_recipe.utils.FieldUtil;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
public class UpdateRecipeRequest {
    @NotNull(message = "Required recipe id!")
    private Integer id;
    private String name;
    private String description;
    private MultipartFile imageFile;
    private String note;
    private Integer point;
    private List<IngredientRequest> ingredients;
    private List<StepRequest> steps;

    @Data
    @NoArgsConstructor
    public static class IngredientRequest {
        private Integer id;

        @NotBlank(message = "The name of ingredient cannot be blank!")
        private String name;

        private Float amount;

        @NotBlank(message = "The unit of each ingredient cannot be blank!")
        private String unit;

        public Ingredient buildIngredient(Recipe recipe) {
            return Ingredient.builder()
                    .recipe(recipe)
                    .name(name)
                    .amount(amount)
                    .unit(unit)
                    .build();
        }

        public void updateForIngredient(Ingredient ingredient) {
            FieldUtil.updateIfValueNotNull(ingredient::setName, name);
            FieldUtil.updateIfValueNotNull(ingredient::setAmount, amount);
            FieldUtil.updateIfValueNotNull(ingredient::setUnit, unit);
        }
    }

    @Data
    @NoArgsConstructor
    public static class StepRequest {
        private Integer id;

        @Min(value = 1, message = "The step number must be greater than or equal 1!")
        private Integer stepNumber;

        @NotBlank(message = "The duration of each step cannot be blank!")
        private String duration;

        @NotBlank(message = "The name of each step cannot be blank!")
        private String name;

        @NotBlank(message = "The description of each step cannot be blank!")
        private String description;

        private String imageUrl;
        private MultipartFile imageFile;

        public Step buildStep(Recipe recipe) {
            return Step.builder()
                    .recipe(recipe)
                    .stepNumber(stepNumber)
                    .name(name)
                    .description(description)
                    .duration(duration)
                    .build();
        }

        public void updateForStep(Step step){
            FieldUtil.updateIfValueNotNull(step::setStepNumber, stepNumber);
            FieldUtil.updateIfValueNotNull(step::setName, name);
            FieldUtil.updateIfValueNotNull(step::setDescription, description);
            FieldUtil.updateIfValueNotNull(step::setDuration, duration);
        }
    }
}
