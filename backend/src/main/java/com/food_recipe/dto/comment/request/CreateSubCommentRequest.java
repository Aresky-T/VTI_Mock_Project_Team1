package com.food_recipe.dto.comment.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateSubCommentRequest {
    private Long parentCommentId;
    private String message;
}
