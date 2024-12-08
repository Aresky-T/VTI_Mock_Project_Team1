package com.food_recipe.dto.comment.response;

import com.food_recipe.dto.user.response.UserResponse;
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
public class RecipeCommentResponse {
    private Long id;
    private String message;
    private String level;
    private String userRole;
    private Integer subCommentCount;
    private Boolean isMine;
    private String createDate;
    private String updateDate;
    private UserResponse user;

    public static RecipeCommentResponse build(Comment comment){
        return build(comment, Boolean.FALSE);
    }

    public static RecipeCommentResponse build(Comment comment, Boolean isMine){
        return RecipeCommentResponse.builder()
                .id(comment.getId())
                .message(comment.getMessage())
                .level(comment.getLevel().name())
                .userRole(comment.getUserRole().name())
                .subCommentCount(comment.getSubCommentCount())
                .isMine(isMine)
                .createDate(DateUtil.formatDateTime(comment.getCreateDate()))
                .updateDate(DateUtil.formatDateTime(comment.getUpdateDate()))
                .user(UserResponse.build(comment.getUser()))
                .build();
    }
}
