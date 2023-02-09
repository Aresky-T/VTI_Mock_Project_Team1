package com.food_recipe.service;

import com.food_recipe.dto.CommentFormCreating;
import com.food_recipe.entity.Comment;
import com.food_recipe.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Component
@Service
public class CommentService implements ICommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Comment> getCommentsByRecipeId(Integer recipeId) {
        return commentRepository.findCommentByRecipeId(recipeId);
    }

    @Override
    public List<Comment> getCommentsByUserId(Integer userid) {
        return commentRepository.findCommentByUserId(userid);
    }

    @Override
    public boolean isExistsComment(Integer userId, Integer recipeId) {
         return commentRepository.existsByUserIdAndRecipeId(userId, recipeId);
    }

    @Override
    public String createComment(CommentFormCreating obj) {
        try {
            if (isExistsComment(obj.getUserId(), obj.getRecipeId())){
                return "This comment already existed!";
            } else {
                commentRepository.save(obj.toEntity());
                return "Comment successfully!";
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return "An error has occurred!";
        }
    }
}
