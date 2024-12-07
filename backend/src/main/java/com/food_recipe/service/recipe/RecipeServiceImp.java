package com.food_recipe.service.recipe;

import com.food_recipe.dto.recipe.request.RecipeFormForCreating;
import com.food_recipe.dto.recipe.request.RecipeFormForUpdate;
import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.dto.request.CreateRecipeRequest;
import com.food_recipe.dto.request.UpdateRecipeRequest;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.ingredient.Ingredient;
import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.recipe.step.Step;
import com.food_recipe.entity.user.User;
import com.food_recipe.exception.CommonException;
import com.food_recipe.repository.*;
import com.food_recipe.service.cloudinary.ICloudinaryService;
import com.food_recipe.service.recipe_owner.IRecipeOwnerService;
import com.food_recipe.specification.RecipeSpecificationBuilder;
import com.food_recipe.utils.FieldUtil;
import com.food_recipe.utils.RandomUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolationException;

@Slf4j
@Service
public class RecipeServiceImp implements IRecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    // @Autowired
    // private StepRepository stepRepository;

    // @Autowired
    // private RecipeIngredientRepository recipeIngredientRepository;

    @Autowired
    private IRecipeOwnerService recipeOwnerService;

    @Autowired
    private ICloudinaryService cloudinaryService;

    @Override
    public List<Recipe> getListForCreator(Integer creatorId){
        List<Recipe> recipes = recipeRepository.findAll();
        List<Recipe> newList = new ArrayList<>();
        for (Recipe recipe: recipes) {
            if(recipe.getCreator().getId().equals(creatorId)){
                newList.add(recipe);
            }
        }
        return  newList;
    }

    @Override
    public List<Recipe> findByNameLike(String name) {
        return recipeRepository.findAllByNameLike(name);
    }

    @Override
    public Recipe createRecipe(RecipeFormForCreating form) {
        return recipeRepository.save(form.toEntity());
    }

    @Transactional
    @Override
    public Recipe createRecipe(User user, CreateRecipeRequest form) {
        if(existRecipeByName(form.getName())){
            throw CommonException.RECIPE_NAME_ALREADY_EXISTS;
        }

        Recipe recipe = form.toRecipeEntity();
        recipe.setCreator(user);

        String randomCode = RandomUtil.randomString(10);
        recipe.setCode(randomCode);

        String folderName = buildFolderNameOnCloud(user.getUsername(), randomCode);
        // upload image file for recipe
        cloudinaryService.uploadImage(form.getImageFile(), folderName)
                .ifPresentOrElse(res -> recipe.setImageUrl((String) res.get("secure_url")), () -> recipe.setImageUrl(""));

        // handle ingredient list
        List<Ingredient> ingredients = form.getIngredients()
                .stream()
                .map(CreateRecipeRequest.IngredientRequest::toIngredientEntity)
                .peek(ing -> ing.setRecipe(recipe))
                .collect(Collectors.toList());

        recipe.setIngredients(ingredients);

        // handle step list
        List<Step> steps = form.getSteps().stream().map(dto -> {
            Step step = dto.toStepEntity();
            step.setRecipe(recipe);
            // upload image file  to cloudinary for each step of new recipe
            cloudinaryService.uploadImage(dto.getImageFile(), folderName)
                    .ifPresent(res -> step.setImageUrl(cloudinaryService.getSecureUrlFromResult(res)));
            return step;
        }).collect(Collectors.toList());
        recipe.setSteps(steps);

        // handle owner list
        List<RecipeOwner> owners = List.of(RecipeOwner.buildEntity(recipe, user, true));
        recipe.setOwners(owners);
        
        return recipeRepository.save(recipe);
    }

    @Override
    public Page<Recipe> getAllRecipes(Pageable pageable, RecipeFilter filter, String search) {

        RecipeSpecificationBuilder specificationBuilder = new RecipeSpecificationBuilder(filter, search);

        return recipeRepository.findAll(specificationBuilder.build(), pageable);
    }

    @Override
    public List<Recipe> getAllRecipesByCreator(User creator) {
        return recipeRepository.findByCreator(creator);
    }

    public Recipe getRecipeById(Integer id) {
        Optional<Recipe> optional = recipeRepository.findById(id);
        if(optional.isEmpty()){
            throw CommonException.INVALID_RECIPE_ID;
        }
        return optional.get();
    }

    @Override
    public Recipe getRecipeByRecipeIdAndCreatorId(Integer recipeId, Integer creatorId) {
        if(!recipeRepository.existsById(recipeId)){
            throw CommonException.INVALID_RECIPE_ID;
        }

        return recipeRepository.findByIdAndCreator_Id(recipeId, creatorId)
                .orElseThrow(() -> CommonException.INVALID_CREATOR_ID);
    }

    @Override
    public Recipe getRecipeByRecipeIdAndOwnerId(Integer recipeId, Integer ownerId) {
        if(!recipeRepository.existsById(recipeId)){
            throw CommonException.INVALID_RECIPE_ID;
        }

        if(!recipeOwnerService.checkRecipeOwnershipForUser(ownerId, recipeId)){
            throw CommonException.INVALID_RECIPE_OWNER;
        }

        return getRecipeById(recipeId);
    }

    // public void createRecipeIngredient(Ingredient recipeIngredient) {
    //     recipeIngredientRepository.save(recipeIngredient);
    // }

    @Override
    @Transactional
    public String updateRecipe(Integer id, RecipeFormForUpdate form) {
        Recipe recipe = recipeRepository.findById(id).get();
        try {
            if(form.getCreatorId() == null){
                return "creatorId is null, update failed;";
            }
    
            if (recipe.getCreator().getId() == form.getCreatorId()) {
                recipe.setName(form.getName());
                recipe.setDescription(form.getDescription());
                recipe.setImageUrl(form.getImageUrl());
                recipe.setNote(form.getNote());
                recipe.setPoint(form.getPoint());
                recipeRepository.save(recipe);
    
                return "success";
            }
    
            return "Failed";
        } catch (ConstraintViolationException e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @Transactional
    @Override
    public Recipe updateRecipe(Integer id, UpdateRecipeRequest form) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> CommonException.INVALID_RECIPE_ID);

        FieldUtil.updateIfValueNotNull(recipe::setName, form.getName());
        FieldUtil.updateIfValueNotNull(recipe::setDescription, form.getDescription());
        FieldUtil.updateIfValueNotNull(recipe::setNote, form.getNote());
        FieldUtil.updateIfValueNotNull(recipe::setPoint, form.getPoint());

        String cloudFolderName = buildFolderNameOnCloud(recipe.getCreator().getUsername(), recipe.getCode());

        String recipeUrl = cloudinaryService.getSecureUrlFromResult(cloudinaryService.uploadImage(form.getImageFile(), cloudFolderName));
        FieldUtil.updateIfValueNotNull(recipe::setImageUrl, recipeUrl);

        // Update ingredients
        List<UpdateRecipeRequest.IngredientRequest> inputIngredients = form.getIngredients();
        if(inputIngredients != null && !inputIngredients.isEmpty()){
            Map<Integer, Ingredient> ingredientMap = recipe.getIngredients()
                    .stream()
                    .collect(Collectors.toMap(Ingredient::getId, Function.identity()));

            // Delete ingredients that are not in the input list
            recipe.getIngredients().removeIf(ingredient -> inputIngredients
                    .stream()
                    .filter(inputIngredient -> inputIngredient.getId() != null)
                    .noneMatch(inputIngredient -> inputIngredient.getId().equals(ingredient.getId())));

            // Update ingredient list
            inputIngredients.forEach(item -> Optional.ofNullable(item.getId())
                    .ifPresentOrElse(
                            (ingredientId) ->  item.updateForIngredient(ingredientMap.get(ingredientId)),
                            () -> recipe.getIngredients().add(item.buildIngredient(recipe))
                    ));
        }

        // Update steps
        List<UpdateRecipeRequest.StepRequest> inputSteps = form.getSteps();
        if(inputSteps != null && !inputSteps.isEmpty()){
            Map<Integer,Step> stepMap = recipe.getSteps()
                    .stream()
                    .collect(Collectors.toMap(Step::getId, Function.identity()));

            // Delete steps that are not in the input list
            recipe.getSteps().removeIf(step -> inputSteps.stream()
                    .filter(inputStep -> inputStep.getId() != null)
                    .noneMatch(inputStep -> inputStep.getId().equals(step.getId())));

            inputSteps.forEach(inputStep -> {
                // Upload image file if exist in input data
                String newImageUrl = Optional.ofNullable(inputStep.getImageFile())
                        .map(file -> cloudinaryService.getSecureUrlFromResult(cloudinaryService.uploadImage(file, cloudFolderName)))
                        .orElse(inputStep.getImageUrl());

                // Update step list
                Optional.ofNullable(inputStep.getId())
                        .ifPresentOrElse(
                                (stepId) -> {
                                    Step step = stepMap.get(stepId);
                                    FieldUtil.updateIfValueNullable(step::setImageUrl, newImageUrl);
                                    inputStep.updateForStep(step);
                                },
                                () -> {
                                    Step step = inputStep.buildStep(recipe);
                                    FieldUtil.updateIfValueNullable(step::setImageUrl, newImageUrl);
                                    recipe.getSteps().add(step);
                                }
                        );
            });
        }

        return recipeRepository.save(recipe);
    }

    @Override
    public void deleteRecipe(List<Integer> ids) {
        recipeRepository.deleteAllByIdInBatch(ids);
    }

    @Override
    @Transactional
    public void deleteRecipeById (Integer recipeId, Integer creatorId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> CommonException.INVALID_RECIPE_CREATOR);

        if (!recipe.getCreator().getId().equals(creatorId)){
            throw CommonException.INVALID_RECIPE_CREATOR;
        }

        recipeRepository.delete(recipe);
    }

    @Override
    public Boolean existRecipeById(Integer recipeId) {
        return recipeRepository.existsById(recipeId);
    }

    @Override
    public Boolean existRecipeByName(String name) {
        return recipeRepository.existsByName(name);
    }

    @Override
    public void checkExistRecipeById(Integer recipeId) {
        if(!recipeRepository.existsById(recipeId)){
            throw CommonException.INVALID_RECIPE_ID;
        }
    }

    @Override
    public void checkExistRecipeByIdAndCreatorId(Integer recipeId, Integer creatorId) {
        if(!recipeRepository.existsByIdAndCreator_Id(recipeId, creatorId)){
            throw new CommonException("Recipe not found or insufficient permission to update!");
        }
    }

    private String buildFolderNameOnCloud(String creatorName, String recipeCode){
        return "recipe_app" + "/" + creatorName + "/recipes/" + recipeCode;
    }

//    private <T, D> void updateList(
//            List<T> list,
//            List<D> data,
//            Function<T, Integer> getter1,
//            Function<D, Integer> getter2,
//            BiConsumer<T, D> updateFunction,
//            Function<D, T> buildFunction
//    ){
//        Map<Integer, T> currentMap = list.stream()
//                .collect(Collectors.toMap(getter1, Function.identity()));
//
//        list.removeIf(item -> data.stream()
//                .filter(input -> getter2.apply(input) != null)
//                .noneMatch(input -> getter2.apply(input).equals(getter1.apply(item))));
//
//        data.forEach(item -> {
//            if(getter2.apply(item) == null){
//                list.add(buildFunction.apply(item));
//            } else {
//                updateFunction.accept(currentMap.get(getter2.apply(item)), item);
//            }
//        });
//    }
}
