package com.food_recipe.dto;

import com.food_recipe.entity.UserGender;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class RecipeHalfDTO {
    private Integer id;

    private String name;

    private String description;

    private String imageUrl;

    private Integer views;

    private Integer point;

    private RecipeDTO.UserDTO creator;

    private Date createDate;

    private List<RecipeDTO.CommentDTO> comments;

    @Data
    @NoArgsConstructor
    static class UserDTO {
        private Integer id;
        private String fullName;
        private String avatarUrl;
        private UserGender gender;
    }

    @Data
    @NoArgsConstructor
    static class CommentDTO {
        private com.food_recipe.dto.CommentDTO.UserDTO user;
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
}
