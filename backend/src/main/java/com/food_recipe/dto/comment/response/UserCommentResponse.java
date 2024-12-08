package com.food_recipe.dto.comment.response;

import com.food_recipe.dto.recipe.response.RecipeResponse;
import com.food_recipe.entity.comment.Comment;
import com.food_recipe.utils.DateUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCommentResponse {
    private Long id;
    private String message;
    private String level;
    private String userRole;
    private Integer subCommentCount;
    private String createDate;
    private String updateDate;
    private RecipeResponse recipe;

    public static UserCommentResponse build(Comment comment){
        return UserCommentResponse.builder()
                .id(comment.getId())
                .message(comment.getMessage())
                .level(comment.getLevel().name())
                .userRole(comment.getUserRole().name())
                .subCommentCount(comment.getSubCommentCount())
                .createDate(DateUtil.formatDateTime(comment.getCreateDate()))
                .updateDate(DateUtil.formatDateTime(comment.getUpdateDate()))
                .recipe(RecipeResponse.build(comment.getRecipe()))
                .build();
    }
}
