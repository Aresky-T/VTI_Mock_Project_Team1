package com.food_recipe.service;

import com.food_recipe.dto.CommentFormCreating;
import com.food_recipe.entity.Comment;

import java.util.List;

public interface ICommentService {

    // ------------- Get by Id --------------------------------

    List<Comment> getCommentsByRecipeId (Integer recipeId);

    List<Comment> getCommentsByUserId (Integer userid);

    // ------------- Check comment is exist ?-------------------

    boolean isExistsComment (Integer userId, Integer recipeId);

    // ------------- Create comment ----------------------------

    String createComment (CommentFormCreating obj);

    // ------------- Update comment ----------------------------
}
