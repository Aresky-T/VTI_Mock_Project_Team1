package com.food_recipe.controller;

import com.food_recipe.dto.comment.request.CreateCommentRequest;
import com.food_recipe.dto.comment.request.CreateSubCommentRequest;
import com.food_recipe.dto.comment.request.UpdateCommentRequest;
import com.food_recipe.dto.comment.response.RecipeCommentResponse;
import com.food_recipe.dto.comment.response.UserCommentResponse;
import com.food_recipe.entity.comment.Comment;
import com.food_recipe.entity.comment.ECommentLevel;
import com.food_recipe.entity.comment.ECommentSort;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import com.food_recipe.service.comment.ICommentService;
import com.food_recipe.service.recipe.IRecipeService;
import com.food_recipe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
    @Autowired
    private ICommentService commentService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IRecipeService recipeService;

    @GetMapping("/recipe-comment/count")
    public ResponseEntity<?> getRecipeCommentCount (
            @RequestParam Integer recipeId,
            @RequestParam(name = "type", required = false) ECommentLevel level
    ){
        Recipe recipe = recipeService.getRecipeById(recipeId);
        Long count = commentService.getCommentCountsBy(recipe, level);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/recipe-comment/recipe/{recipeId}")
    public ResponseEntity<List<RecipeCommentResponse>> getAllCommentsByRecipeId (
            @PathVariable("recipeId") Integer recipeId,
            @RequestParam("size") Integer size,
            @RequestParam("sort") ECommentSort sort,
            @RequestParam(value = "referenceCommentId", required = false) Long referenceCommentId
    ) {
        Recipe recipe = recipeService.getRecipeById(recipeId);
        List<Comment> comments;

        if(referenceCommentId != null){
            comments = commentService.getAllCommentsBy(recipe, sort, size, referenceCommentId);
        } else {
            comments = commentService.getAllCommentsBy(recipe, sort, size);
        }

        List<RecipeCommentResponse> dtos = comments.stream()
                .map(RecipeCommentResponse::build).collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/recipe-comment/reply/comment/{commentId}")
    public ResponseEntity<List<RecipeCommentResponse>> getAllSubCommentsBy (
            @PathVariable("commentId") Long commentId,
            @RequestParam("size") Integer size,
            @RequestParam(value = "referenceSubCommentId", required = false) Long referenceSubCommentId
    ) {
        List<Comment> comments = commentService.getAllSubCommentBy(commentId, size);

        if(referenceSubCommentId != null){
            comments = commentService.getAllSubCommentBy(commentId, size, referenceSubCommentId);
        } else {
            comments = commentService.getAllSubCommentBy(commentId, size);
        }

        List<RecipeCommentResponse> dtos = comments.stream()
                .map(RecipeCommentResponse::build)
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/recipe-comment/recipe/{recipeId}/for-logged-in-user")
    public ResponseEntity<List<RecipeCommentResponse>> getAllCommentsByRecipeId (
            @PathVariable("recipeId") Integer recipeId,
            @RequestParam("size") Integer size,
            @RequestParam("sort") ECommentSort sort,
            @RequestParam(value = "referenceCommentId", required = false) Long referenceCommentId,
            Authentication authentication
    ) {
        User user = userService.findUserByUsername(authentication.getName());
        Recipe recipe = recipeService.getRecipeById(recipeId);
        List<Comment> comments;

        if(referenceCommentId != null){
            comments = commentService.getAllCommentsBy(recipe, sort, size, referenceCommentId);
        } else {
            comments = commentService.getAllCommentsBy(recipe, sort, size);
        }

        final Function<Comment, RecipeCommentResponse> converter =
                (comment) -> RecipeCommentResponse.build(comment, comment.getUser().getId().equals(user.getId()));

        List<RecipeCommentResponse> dtos = comments.stream().map(converter).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/recipe-comment/reply/comment/{commentId}/for-logged-in-user")
    public ResponseEntity<List<RecipeCommentResponse>> getAllSubCommentsBy (
            @PathVariable("commentId") Long commentId,
            @RequestParam("size") Integer size,
            @RequestParam(value = "referenceSubCommentId", required = false) Long referenceSubCommentId,
            Authentication authentication
    ) {
        User user = userService.findUserByUsername(authentication.getName());
        List<Comment> comments;

        if(referenceSubCommentId != null){
            comments = commentService.getAllSubCommentBy(commentId, size, referenceSubCommentId);
        } else {
            comments = commentService.getAllSubCommentBy(commentId, size);
        }

        final Function<Comment, RecipeCommentResponse> converter =
                (comment) -> RecipeCommentResponse.build(comment, comment.getUser().getId().equals(user.getId()));

        List<RecipeCommentResponse> dtos = comments.stream()
                .map(converter)
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user-comment")
    public ResponseEntity<Page<UserCommentResponse>> getAllCommentsByUser (
            @RequestParam("page") Integer page,
            @RequestParam("size") Integer size,
            @RequestParam("sort") ECommentSort sort,
            Authentication authentication
    ) {
        User user = userService.findUserByUsername(authentication.getName());
        Page<UserCommentResponse> dtos = commentService.getAllCommentsBy(user, page, size, sort)
                .map(UserCommentResponse::build);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/recipe-comment")
    public ResponseEntity<RecipeCommentResponse> createRecipeComment (
            Authentication authentication,
            @RequestBody CreateCommentRequest form
    ) {
        String username = authentication.getName();
        User user = userService.findUserByUsername(username);

        Recipe recipe = recipeService.getRecipeById(form.getRecipeId());
        Comment comment = commentService.createComment(user, recipe, form.getMessage());

        RecipeCommentResponse dto = RecipeCommentResponse.build(comment, Boolean.TRUE);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/recipe-comment/reply")
    public ResponseEntity<RecipeCommentResponse> createRecipeComment (
            Authentication authentication,
            @RequestBody CreateSubCommentRequest request
    ) {
        String username = authentication.getName();
        User user = userService.findUserByUsername(username);

        Long parentCommentId = request.getParentCommentId();
        String message = request.getMessage();

        Comment comment = commentService.createSubComment(user, parentCommentId, message);
        RecipeCommentResponse dto = RecipeCommentResponse.build(comment, Boolean.TRUE);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PatchMapping("/recipe-comment")
    public ResponseEntity<RecipeCommentResponse> updateRecipeComment(
            @RequestBody UpdateCommentRequest request,
            Authentication authentication
    ) {
        User user = userService.findUserByUsername(authentication.getName());
        Comment comment = commentService.getCommentById(request.getCommentId());
        commentService.onCheckCommentAccess(user, comment);
        Comment updatedComment = commentService.updateComment(comment, request.getMessage());
        return new ResponseEntity<>(RecipeCommentResponse.build(updatedComment, Boolean.TRUE), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping
    public ResponseEntity<?> deleteComment(@RequestParam Long commentId, Authentication authentication) {
        User user = userService.findUserByUsername(authentication.getName());
        commentService.deleteCommentsBy(user, commentId);
        return new ResponseEntity<String>("Delete Comment successfully!", HttpStatus.OK);
    }
}
