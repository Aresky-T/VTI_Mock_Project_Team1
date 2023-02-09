package com.food_recipe.repository;

import com.food_recipe.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends
        JpaRepository<Comment, Integer>,
        JpaSpecificationExecutor<Comment> {

    public boolean existsByUserIdAndRecipeId(Integer userId, Integer recipeId);

    public List<Comment> findCommentByRecipeId(Integer id);

    public List<Comment> findCommentByUserId(Integer id);
}
