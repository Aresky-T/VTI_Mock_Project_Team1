package com.food_recipe.service;

import com.food_recipe.dto.CommentFormCreating;
import com.food_recipe.dto.RecipeExchangeDTO;
import com.food_recipe.dto.RecipeExchangeFormForCreating;
import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.RecipeExchangeHistory;
import com.food_recipe.entity.User;
import com.food_recipe.repository.RecipeExchangeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RecipeExchangeService implements IRecipeExchangeService{

    @Autowired
    private RecipeExchangeRepository recipeExchangeRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public String createExchange(RecipeExchangeFormForCreating obj) {
        try {
            if (isExistsExchange(obj.getUserId(), obj.getRecipeId())){
                return "This exchange already existed!";
            } else {
                recipeExchangeRepository.save(obj.toEntity());
                return "Create Exchange successfully!";
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return "An error has occurred!";
        }
    }

    private boolean isExistsExchange(User userId, Recipe recipeId) {
        recipeExchangeRepository.existsByUserIdAndRecipeId(userId, recipeId);
    }
}
