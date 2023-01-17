package com.food_recipe.dto;

import com.food_recipe.entity.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentFormCreating {
    private Integer userId;
    private Integer recipeId;
    private String comment;

    public Comment toEntity () {
        return new Comment(userId, recipeId, comment);
    }
}
