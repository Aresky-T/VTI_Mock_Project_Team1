package com.food_recipe.dto.response;

import com.food_recipe.entity.user.UserGender;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class RecipeDetailsResponse {
    private Integer id;

    private String code;

    private String name;

    private String description;

    private String imageUrl;

    private String note;

    private Integer point;

    private Integer views;

    private UserDTO creator;

    private Date createDate;

    private List<StepDTO> steps;

    private List<IngredientDTO> ingredients;

    private List<CommentDTO> comments;

    @Data
    @NoArgsConstructor
    public static class StepDTO {
        private Integer stepNumber;
        private String name;
        private String description;
        private String duration;
        private String imageUrl;
    }

    @Data
    @NoArgsConstructor
    static class IngredientDTO {
        private String name;
        private Float amount;
        private String unit;
    }

    @Data
    @NoArgsConstructor
    static class UserDTO {
        private String fullName;
        private String avatarUrl;
        private UserGender gender;
    }

    @Data
    @NoArgsConstructor
    static class CommentDTO {
        private UserDTO user;
        private String comment;
        private Date createDate;
        private Date updateDate;
    }
}

