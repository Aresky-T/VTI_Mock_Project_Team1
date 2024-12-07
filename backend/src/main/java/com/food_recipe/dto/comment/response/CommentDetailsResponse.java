package com.food_recipe.dto.comment.response;

import com.food_recipe.dto.user.response.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetailsResponse {
    private Long id;
    private String message;
    private String level;
    private String userRole;
    private Integer subCommentCount;
    private Boolean isMine;
    private String createDate;
    private String updateDate;
    private UserResponse user;
}
