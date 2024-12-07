package com.food_recipe.dto.response;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.utils.DateUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatedRecipeResponse {
    private Integer id;
    private String code;
    private String name;
    private String imageUrl;
    private Integer point;
    private Integer views;
    private String createDate;

    public static CreatedRecipeResponse toDTO(Recipe recipe){
        return CreatedRecipeResponse.builder()
                .id(recipe.getId())
                .code(recipe.getCode())
                .name(recipe.getName())
                .imageUrl(recipe.getImageUrl())
                .point(recipe.getPoint())
                .views(recipe.getViews())
                .createDate(DateUtil.formatDateTime(recipe.getCreateDate()))
                .build();
    }
}
