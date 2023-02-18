package com.food_recipe.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class CommentFormForUpdate {

    private Integer userId;

    private Integer recipeId;

    private String comment;


}
