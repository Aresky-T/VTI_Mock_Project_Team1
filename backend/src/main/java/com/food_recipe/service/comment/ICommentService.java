package com.food_recipe.service.comment;

import com.food_recipe.entity.comment.Comment;
import com.food_recipe.entity.comment.ECommentLevel;
import com.food_recipe.entity.comment.ECommentSort;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICommentService {
    Comment createComment(User user, Recipe recipe, String message);

    Comment createSubComment(User user, long parentCommentId, String message);

    Page<Comment> getAllCommentsBy(User user, int page, int size, ECommentSort sortType);

    Page<Comment> getAllCommentsBy(User user, int page, int size, ECommentSort sortType, ECommentLevel levelType);

    List<Comment> getAllCommentsBy(Recipe recipe, ECommentSort sortType, int size);

    List<Comment> getAllCommentsBy(Recipe recipe, ECommentSort sortType, int size, long referenceCommentId);

    List<Comment> getAllSubCommentBy(long commentId, int size);

    List<Comment> getAllSubCommentBy(long commentId, int size, long referenceCommentId);

    Long getCommentCountsBy(Recipe recipe, ECommentLevel level);

    Long getCommentCountsBy(User user, ECommentLevel level);

    Comment getCommentById(Long commentId);

    Comment getParentCommentBy(Comment comment);

    Comment getParentCommentBy(long commentId);

    Comment updateComment(Comment comment, String message);

    void deleteCommentsBy(User user, Long commentId);

    void onCheckCommentAccess(User user, Comment comment);

    Boolean isExistCommentById(Long commentId);

    Pageable buildPageable(int page, int size, ECommentSort sort);
}
