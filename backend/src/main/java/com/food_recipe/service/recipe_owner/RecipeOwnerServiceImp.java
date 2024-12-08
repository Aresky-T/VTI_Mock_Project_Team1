package com.food_recipe.service.recipe_owner;

import com.food_recipe.dto.response.RecipeOwnership;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.recipe.owner.RecipeOwnerPK;
import com.food_recipe.entity.user.User;
import com.food_recipe.exception.CommonException;
import com.food_recipe.repository.RecipeOwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeOwnerServiceImp implements IRecipeOwnerService {
    @Autowired
    private RecipeOwnerRepository recipeOwnerRepository;

    @Override
    public List<Recipe> getRecipeListForOwner(User owner) {
        return recipeOwnerRepository.findByOwner(owner)
                .stream()
                .map(RecipeOwner::getRecipe)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getOwnerListForRecipe(Recipe recipe) {
        return recipeOwnerRepository.findByRecipe(recipe)
                .stream()
                .map(RecipeOwner::getOwner)
                .collect(Collectors.toList());
    }

    @Override
    public List<RecipeOwner> getAllForRecipe(Recipe recipe) {
        return recipeOwnerRepository.findByRecipe(recipe);
    }

    @Override
    public List<RecipeOwner> getAllByOwnerAndIsCreator(User owner, Boolean isCreator) {
        return recipeOwnerRepository.findByOwnerAndIsCreator(owner, isCreator);
    }

    @Override
    public RecipeOwner getRecipeOwner(User owner, Recipe recipe) {
        return recipeOwnerRepository.findById(RecipeOwnerPK.build(recipe.getId(), owner.getId())).orElse(null);
    }

    @Transactional
    @Override
    public RecipeOwnership getRecipeOwnershipForUser(User owner, Recipe recipe) {
        boolean isCreator = recipe.getCreator().getId().equals(owner.getId());
        boolean isOwner = checkRecipeOwnershipForUser(owner, recipe);

        if(isCreator && !isOwner){
            enableRecipeOwnershipForUser(owner, recipe);
        }

        return Optional.ofNullable(getRecipeOwner(owner, recipe))
                .map(ownership -> new RecipeOwnership(true, ownership.getIsCreator()))
                .orElse(new RecipeOwnership(false, false));
    }

    @Override
    public Boolean checkRecipeOwnershipForUser(User owner, Recipe recipe) {
        return checkRecipeOwnershipForUser(owner.getId(), recipe.getId());
    }

    @Override
    public Boolean checkRecipeOwnershipForUser(Integer ownerId, Integer recipeId) {
        return recipeOwnerRepository.existsById(RecipeOwnerPK.build(recipeId, ownerId));
    }

    @Transactional
    @Override
    public void enableRecipeOwnershipForUser(User owner, Recipe recipe) {
        if(checkRecipeOwnershipForUser(owner, recipe)){
            throw new CommonException("You already own this recipe!");
        }
        recipeOwnerRepository.save(RecipeOwner.buildEntity(recipe, owner));
    }

    @Transactional
    @Override
    public void disableRecipeOwnershipForUser(User owner, Recipe recipe) {
        if (!checkRecipeOwnershipForUser(owner, recipe)){
            throw new CommonException("You have never owned this recipe!");
        }
        recipeOwnerRepository.deleteById(RecipeOwnerPK.build(recipe.getId(), owner.getId()));
    }


}
