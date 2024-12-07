package com.food_recipe.service.recipe_transaction;

import com.food_recipe.entity.point.Point;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.transaction.RecipeTransaction;
import com.food_recipe.entity.user.User;
import com.food_recipe.exception.CommonException;
import com.food_recipe.repository.RecipeTransactionRepository;
import com.food_recipe.service.point.IPointService;
import com.food_recipe.service.recipe_owner.IRecipeOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeTransactionServiceImp implements IRecipeTransactionService {

    @Autowired
    private IRecipeOwnerService recipeOwnerService;

    @Autowired
    private RecipeTransactionRepository transactionRepository;

    @Autowired
    private IPointService pointService;

    @Override
    public List<RecipeTransaction> getAllTransactions(User user) {
        return transactionRepository.findByUser(user);
    }

    @Transactional
    @Override
    public void createTransaction(Recipe recipe, User user) {
        // check recipe creator for user
        if(recipe.getCreator().getId().equals(user.getId())){
            throw new CommonException("You cannot perform a transaction on your own recipe!");
        }

        // check recipe ownership for user
        if(recipeOwnerService.checkRecipeOwnershipForUser(user, recipe)){
            throw new CommonException("You already own this recipe and cannot perform this transaction again!");
        }

        Integer transactionCost = recipe.getPoint();
        Point userPoint = Optional.ofNullable(user.getPoint()).orElse(Point.buildEntity(user));

        // check user point
        if(transactionCost > 0 && userPoint.getPoint() < transactionCost){
            throw new CommonException("You need at least " + transactionCost + " points to perform this transaction!");
        }

        // Add new transaction
        RecipeTransaction newTransaction = RecipeTransaction.buildEntity(user, recipe, transactionCost);
        transactionRepository.save(newTransaction);

        // Update user point and creator point
        Point creatorPoint = Optional.ofNullable(recipe.getCreator().getPoint()).orElse(Point.buildEntity(recipe.getCreator()));
        if(transactionCost > 0){
            userPoint.setPoint(userPoint.getPoint() - transactionCost);
            creatorPoint.setPoint(creatorPoint.getPoint() + transactionCost);

            pointService.save(userPoint);
            pointService.save(creatorPoint);

            // Log user point changed history
            pointService.logRecipePurchase(user, recipe, transactionCost);
            pointService.logRecipeSale(recipe, transactionCost);
        }

        // Add recipe ownership for user
        recipeOwnerService.enableRecipeOwnershipForUser(user, recipe);
    }

    @Override
    public void deleteTransaction(Integer transactionId, User user) {

    }

    @Override
    public void deleteAllTransactionsForUser(User user) {

    }
}
