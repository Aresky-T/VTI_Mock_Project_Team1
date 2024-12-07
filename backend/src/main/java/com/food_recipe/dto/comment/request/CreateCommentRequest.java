package com.food_recipe.dto.comment.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateCommentRequest {
    private Integer recipeId;
    private String message;
}
