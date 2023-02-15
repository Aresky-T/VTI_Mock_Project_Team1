package com.food_recipe.controller;

import com.food_recipe.dto.CommentDTO;
import com.food_recipe.dto.CommentFormCreating;
import com.food_recipe.dto.CommentFormForUpdate;
import com.food_recipe.entity.Comment;
import com.food_recipe.service.ICommentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/comment")
public class CommentController {
    @Autowired
    private ICommentService commentService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/recipe-id/{id}")
    public List<CommentDTO> getAllCommentsByRecipeId (@PathVariable Integer id) {
        List<Comment> entities = commentService.getCommentsByRecipeId(id);
        return modelMapper.map(entities,
                new TypeToken<List<CommentDTO>>() {}.getType()
        );
    }

    @GetMapping("/user-id/{id}")
    public List<CommentDTO> getAllCommentsByUserId (@PathVariable Integer id) {
        List<Comment> entities = commentService.getCommentsByUserId(id);
        return modelMapper.map(entities,
                new TypeToken<List<CommentDTO>>() {}.getType()
        );
    }

    @PostMapping
    public ResponseEntity<String> createComment (@RequestBody CommentFormCreating data) {
        return new ResponseEntity<>(commentService.createComment(data), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateComment(@RequestBody CommentFormForUpdate form) {
        commentService.updateComment(form);
        return new ResponseEntity<String>("Update Comment successfully!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteComment(@RequestParam Integer userId, @RequestParam Integer recipeId ) {
        commentService.deleteComment(userId, recipeId);
        return new ResponseEntity<String>("Delete Comment successfully!", HttpStatus.OK);
    }
}
