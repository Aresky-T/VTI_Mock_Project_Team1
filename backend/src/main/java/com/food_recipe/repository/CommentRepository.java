package com.food_recipe.repository;

import com.food_recipe.entity.comment.Comment;

import com.food_recipe.entity.comment.ECommentLevel;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends
        JpaRepository<Comment, Long>,
        JpaSpecificationExecutor<Comment> {

    boolean existsByUserIdAndRecipeId(Integer userId, Integer recipeId);

    List<Comment> findCommentByRecipeId(Integer id);

    List<Comment> findCommentByUserId(Integer id);

    List<Comment> findByRecipe(Recipe recipe);

    Comment findCommentByUserIdAndRecipeId(Integer userId, Integer recipeId);

    void deleteByUserIdAndRecipeId(Integer userId, Integer recipeId);

    List<Comment> findAllByUserIdAndRecipeId(Integer userId, Integer recipeId);

    List<Comment> findAllByRecipeIdAndLevel(Integer recipeId, ECommentLevel level);

    List<Comment> findAllByRecipe(Recipe recipe);

    List<Comment> findAllByRecipeId(Integer recipeId);

    List<Comment> findAllByUserIdAndLevel(Integer userId, ECommentLevel level);

    List<Comment> findAllByUser(User user);

    Long countByRecipeId(Integer recipeId);

    Long countByRecipeIdAndLevel(Integer recipeId, ECommentLevel level);

    Long countByUserId(Integer userId);

    Long countByUserIdAndLevel(Integer userId, ECommentLevel level);
}
