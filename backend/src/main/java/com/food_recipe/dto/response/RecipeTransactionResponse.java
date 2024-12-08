package com.food_recipe.dto.response;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.transaction.RecipeTransaction;
import com.food_recipe.utils.DateUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeTransactionResponse {
    private Integer id;
    private RecipeDTO recipe;
    private Integer cost;
    private String transactionDate;

    public static RecipeTransactionResponse toDTO(RecipeTransaction transaction){
        return RecipeTransactionResponse.builder()
                .id(transaction.getId())
                .cost(transaction.getCost())
                .transactionDate(DateUtil.formatDateTime(transaction.getTransactionDate()))
                .recipe(RecipeDTO.toDTO(transaction.getRecipe()))
                .build();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecipeDTO {
        private Integer id;
        private String code;
        private String name;
        private String imageUrl;

        public static RecipeDTO toDTO(Recipe recipe){
            return RecipeDTO.builder()
                    .id(recipe.getId())
                    .code(recipe.getCode())
                    .name(recipe.getName())
                    .imageUrl(recipe.getImageUrl())
                    .build();
        }
    }
}
