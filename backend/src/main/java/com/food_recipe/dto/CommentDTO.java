package com.food_recipe.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
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

    public CommentDTO(String comment, Date updateDate) {
        this.comment = comment;
        this.updateDate = updateDate;
    }
}
