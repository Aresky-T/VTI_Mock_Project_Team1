package com.food_recipe.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class CommentDTO {
    private UserDTO user;
    private Integer recipeId;
    private String comment;
    private Date createDate;
    private Date updateDate;

    @Data
    @NoArgsConstructor
    static class UserDTO {
        private Integer id;
        private String avatarUrl;
        private String fullName;
    }
}
