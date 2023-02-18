package com.food_recipe.service;

import com.food_recipe.dto.CommentDTO;
import com.food_recipe.dto.RecipeIngredientDTO;
import com.food_recipe.dto.RecipeIngredientFormCreating;
import com.food_recipe.entity.Comment;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.RecipeIngredient;
import com.food_recipe.repository.RecipeIngredientRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
@Service
public class RecipeIngredientService implements IRecipeIngredientService {

    private final RecipeIngredientRepository recipeIngredientRepository;

    public RecipeIngredientService(RecipeIngredientRepository recipeIngredientRepository) {
        this.recipeIngredientRepository = recipeIngredientRepository;
    }


    @Override
    public void createRecipeIngredient(List<RecipeIngredientFormCreating> obj) {
        List<RecipeIngredient> list = new ArrayList<>();

        for (RecipeIngredientFormCreating r: obj) {
            RecipeIngredient recipeIngredient = r.toEntity();
            list.add(recipeIngredient);
        }
        recipeIngredientRepository.saveAll(list);
    }

//    @Override
//    public void updateRecipeIngredient(Integer id, RecipeIngredientDTO form) {
//        RecipeIngredient recipeIngredient = recipeIngredientRepository.findById(id).orElse(null);
//            recipeIngredient.setName(form.getName());
//            recipeIngredient.setAmount(form.getAmount());
//            recipeIngredient.setUnit(form.getUnit());
//        recipeIngredientRepository.save(recipeIngredient);
//    }

    @Override
    public void deleteRecipeIngredient(List<Integer> ids) {
        recipeIngredientRepository.deleteAllByIdInBatch(ids);
    }

    @Override
    public void updateRecipeIngredient(List<Integer> ids, List<RecipeIngredientDTO> list) {
        List<RecipeIngredient> ingredients = new ArrayList<>();
        var ingredient = recipeIngredientRepository.findAllById(ids);
        for (RecipeIngredient recipeIngredient : ingredient) {
            for (RecipeIngredientDTO dto : list) {
                if(recipeIngredient.getId().equals(dto.getId())) {
                    recipeIngredient.setName(dto.getName());
                    recipeIngredient.setAmount(dto.getAmount());
                    recipeIngredient.setUnit(dto.getUnit());
                    ingredients.add(recipeIngredient);
                }
            }
        }
        recipeIngredientRepository.saveAll(ingredients);
    }
}