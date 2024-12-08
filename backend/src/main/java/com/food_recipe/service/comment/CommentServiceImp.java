package com.food_recipe.service.comment;

import com.food_recipe.entity.comment.Comment;
import com.food_recipe.entity.comment.ECommentLevel;
import com.food_recipe.entity.comment.ECommentSort;
import com.food_recipe.entity.comment.EUserRole;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import com.food_recipe.exception.CommonException;
import com.food_recipe.repository.CommentRepository;
import com.food_recipe.service.recipe_owner.IRecipeOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class CommentServiceImp implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IRecipeOwnerService recipeOwnerService;

    @Transactional
    @Override
    public Comment createComment(User user, Recipe recipe, String message) {
        onCheckUserNotNull(user);
        onCheckRecipeNotNull(recipe);
        ECommentLevel level = ECommentLevel.TOP;
        EUserRole userRole = Optional.ofNullable(recipeOwnerService.getRecipeOwner(user, recipe))
                .map(recipeOwner -> recipeOwner.getIsCreator() ? EUserRole.CREATOR : EUserRole.OWNER)
                .orElse(EUserRole.NORMAL);

        Comment comment = Comment.builder()
                .message(message)
                .user(user)
                .recipe(recipe)
                .level(level)
                .userRole(userRole)
                .subCommentCount(0)
                .build();

        return commentRepository.save(comment);
    }

    @Transactional
    @Override
    public Comment createSubComment(User user, long parentCommentId, String message) {
        // check valid user
        onCheckUserNotNull(user);
        // get parent comment
        Comment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new CommonException("Parent comment not found!"));
        // determine comment level from parent comment
        ECommentLevel level = onDetermineLevelFromParentComment.apply(parentComment);
        // get recipe
        Recipe recipe = parentComment.getRecipe();
        // determine user role from recipe owner
        EUserRole userRole = Optional.ofNullable(recipeOwnerService.getRecipeOwner(user, recipe))
                .map(recipeOwner -> recipeOwner.getIsCreator() ? EUserRole.CREATOR : EUserRole.OWNER)
                .orElse(EUserRole.NORMAL);

        // build new comment entity
        Comment newComment = Comment.builder()
                .message(message)
                .user(user)
                .recipe(recipe)
                .parentComment(parentComment)
                .level(level)
                .userRole(userRole)
                .subCommentCount(0)
                .build();

        Comment savedComment = commentRepository.save(newComment);
        parentComment.setSubCommentCount(parentComment.getSubCommentCount() + 1);
        commentRepository.save(parentComment);
        return savedComment;

        // update subCommentCount for parent comment
        // parentComment.getSubComments().add(newComment);
        // parentComment.setSubCommentCount(parentComment.getSubCommentCount() + 1);

        // save new comment and update parent comment
        // only update parent comment
        // return commentRepository.save(parentComment);
    }

    @Override
    public Page<Comment> getAllCommentsBy(User user, int page, int size, ECommentSort sortType) {
        Specification<Comment> specification = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("user").get("id"), user.getId());

        Pageable pageable = buildPageable(page, size, sortType);
        return commentRepository.findAll(specification, pageable);
    }

    @Override
    public Page<Comment> getAllCommentsBy(User user, int page, int size, ECommentSort sortType, ECommentLevel levelType) {
        Specification<Comment> specification = (root, query, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("user").get("id"), user.getId()),
                        criteriaBuilder.equal(root.get("level").get("id"), levelType)
                );

        Pageable pageable = buildPageable(page, size, sortType);
        return commentRepository.findAll(specification, pageable);
    }

    @Override
    public List<Comment> getAllCommentsBy(Recipe recipe, ECommentSort sortType, int size) {
        Specification<Comment> specification = (root, query, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("recipe").get("id"), recipe.getId()),
                        criteriaBuilder.equal(root.get("level"), ECommentLevel.TOP)
                );

        Pageable pageable = buildPageable(0, size, sortType);
        return commentRepository.findAll(specification, pageable).getContent();
    }

    @Override
    public List<Comment> getAllCommentsBy(Recipe recipe, ECommentSort sortType, int size, long referenceCommentId) {
        onCheckExistCommentById(referenceCommentId, "Invalid referenceCommentId");
        Specification<Comment> specification = (root, query, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("recipe").get("id"), recipe.getId()),
                        criteriaBuilder.equal(root.get("level"), ECommentLevel.TOP)
                );

        switch (sortType){
            case NEWEST:
                specification = specification.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.lessThan(root.get("id"), referenceCommentId));
                break;
            case OLDEST:
                specification = specification.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.greaterThan(root.get("id"), referenceCommentId));
                break;
            case MOST_REPLIED:
                Comment refComment = getCommentById(referenceCommentId);
                specification = specification.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.and(
                                criteriaBuilder.notEqual(root.get("id"), referenceCommentId),
                                criteriaBuilder.or(
                                        criteriaBuilder.lessThan(root.get("subCommentCount"), refComment.getSubCommentCount()),
                                        criteriaBuilder.and(
                                                criteriaBuilder.equal(root.get("subCommentCount"),refComment.getSubCommentCount()),
                                                criteriaBuilder.lessThan(root.get("createDate"), refComment.getCreateDate())
                                        )
                                ))
                );
                break;
            default:
        }

        Pageable pageable = buildPageable(0, size, sortType);
        return commentRepository.findAll(specification, pageable).getContent();
    }

    @Override
    public List<Comment> getAllSubCommentBy(long commentId, int size) {
        onCheckExistCommentById(commentId);
        Specification<Comment> specification = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("parentComment").get("id"), commentId);

        Pageable pageable = buildPageable(0, size, ECommentSort.NEWEST);
        return commentRepository.findAll(specification, pageable).getContent();
    }

    @Override
    public List<Comment> getAllSubCommentBy(long commentId, int size, long referenceCommentId) {
        onCheckExistCommentById(commentId);
        onCheckExistCommentById(referenceCommentId, "Invalid referenceCommentId!");

        Specification<Comment> specification = (root, query, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("parentComment").get("id"), commentId),
                        criteriaBuilder.lessThan(root.get("id"), referenceCommentId)
                );

        Pageable pageable = buildPageable(0, size, ECommentSort.NEWEST);
        return commentRepository.findAll(specification, pageable).getContent();
    }

    @Override
    public Long getCommentCountsBy(Recipe recipe, ECommentLevel level) {
        if(level == null){
            return commentRepository.countByRecipeId(recipe.getId());
        }

        return commentRepository.countByRecipeIdAndLevel(recipe.getId(), level);
    }

    @Override
    public Long getCommentCountsBy(User user, ECommentLevel level) {
        if(level == null){
            return commentRepository.countByUserId(user.getId());
        }

        return commentRepository.countByUserIdAndLevel(user.getId(), level);
    }

    @Override
    public Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new CommonException("Comment not found!"));
    }

    @Override
    public Comment getParentCommentBy(Comment comment) {
        return comment.getParentComment();
    }

    @Override
    public Comment getParentCommentBy(long commentId) {
        return getCommentById(commentId).getParentComment();
    }

    @Transactional
    @Override
    public Comment updateComment(Comment comment, String message) {
        comment.setMessage(message);
        return commentRepository.save(comment);
    }

    @Transactional
    @Override
    public void deleteCommentsBy(User user, Long commentId) {
        Comment comment = getCommentById(commentId);
        onCheckCommentAccess(user, comment);

        Optional.ofNullable(comment.getParentComment())
                .ifPresent(parentComment -> {
                    Integer currentSubCommentCount = parentComment.getSubCommentCount();
                    parentComment.setSubCommentCount(Math.max(currentSubCommentCount - 1, 0));
                    commentRepository.save(parentComment);
                });

        commentRepository.delete(comment);
    }

    @Override
    public void onCheckCommentAccess(User user, Comment comment) {
        if(!comment.getUser().getId().equals(user.getId())){
            throw new CommonException("Permission denied: cannot access this comment!");
        }
    }

    @Override
    public Boolean isExistCommentById(Long commentId){
        return commentRepository.existsById(commentId);
    }

    @Override
    public Pageable buildPageable(int page, int size, ECommentSort sortType) {
        Sort sort = buildSortByECommentSort(sortType);
        return PageRequest.of(page, size, sort);
    }

    private Sort buildSortByECommentSort(ECommentSort commentSort){
        switch (commentSort){
            case NEWEST:
                return Sort.by(Sort.Direction.DESC, "createDate");
            case OLDEST:
                return Sort.by(Sort.Direction.ASC, "createDate");
            case MOST_REPLIED:
                return Sort.by(Sort.Direction.DESC, "subCommentCount")
                        .and(Sort.by(Sort.Direction.DESC, "createDate"));
            case MOST_LIKED:
                throw new CommonException("This sort type is under development!");
            default:
                throw new CommonException("Unknown comment sort type!");
        }
    }

    private void onCheckRecipeMatched(Comment comment, Recipe recipe){
        if(!isRecipeMatched(comment.getRecipe(), recipe)){
            throw new CommonException("The recipe you provided does not match the recipe of the current comment!");
        }
    }

    private boolean isRecipeMatched(Recipe recipe1, Recipe recipe2) {
        return recipe1.getId().equals(recipe2.getId());
    }

    private void onCheckExistCommentById(long commentId){
        if(!commentRepository.existsById(commentId)){
            throw new CommonException("Invalid commentId");
        }
    }

    private void onCheckExistCommentById(long commentId, String errorMessage){
        if(!commentRepository.existsById(commentId)){
            throw new CommonException(errorMessage);
        }
    }

    private void onCheckUserNotNull(User user){
        if(user == null){
            throw new CommonException("User cannot be null!");
        }
    }

    private void onCheckRecipeNotNull(Recipe recipe){
        if (recipe == null) {
            throw new CommonException("Recipe cannot be null!");
        }
    }

    private final Function<Comment, ECommentLevel> onDetermineLevelFromParentComment = (parentComment) -> {
        if(parentComment == null){
            return ECommentLevel.TOP;
        }

        switch(parentComment.getLevel()){
            case TOP:
                return ECommentLevel.MID;
            case MID:
            case LOW:
                return ECommentLevel.LOW;
            default:
                throw new CommonException("Unknown comment level: " + parentComment.getLevel().name());
        }
    };
}
