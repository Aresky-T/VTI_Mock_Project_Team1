package com.food_recipe.dto.response;

import com.food_recipe.entity.user.UserGender;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class RecipeDetailsForOwner {
    private Integer id;

    private String code;

    private String name;

    private String description;

    private String imageUrl;

    private String note;

    private Integer point;

    private Integer views;

    private UserDTO creator;

    private String createDate;

    private String updateDate;

    private VotingStatisticDTO votingStatistic;

    private List<IngredientDTO> ingredients;

    private List<StepDTO> steps;

    private List<CommentDTO> comments;

    @Data
    @NoArgsConstructor
    private static class StepDTO {
        private Integer id;
        private Integer stepNumber;
        private String name;
        private String description;
        private String duration;
        private String imageUrl;
    }

    @Data
    @NoArgsConstructor
    private static class IngredientDTO {
        private Integer id;
        private String name;
        private Float amount;
        private String unit;
    }

    @Data
    @NoArgsConstructor
    private static class UserDTO {
        private String fullName;
        private String avatarUrl;
        private UserGender gender;
    }

    @Data
    @NoArgsConstructor
    private static class CommentDTO {
        private UserDTO user;
        private String comment;
        private Date createDate;
        private Date updateDate;
    }

    @Data
    @NoArgsConstructor
    private static class VotingStatisticDTO {
        private Integer voteCount;
        private Double totalStars;
    }
}
