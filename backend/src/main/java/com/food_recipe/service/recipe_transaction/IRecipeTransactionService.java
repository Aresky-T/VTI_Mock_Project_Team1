package com.food_recipe.service.recipe_transaction;

import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.recipe.transaction.RecipeTransaction;
import com.food_recipe.entity.user.User;

import java.util.List;

public interface IRecipeTransactionService {
    List<RecipeTransaction> getAllTransactions(User user);
    void createTransaction(Recipe recipe, User user);
    void deleteTransaction(Integer transactionId, User user);
    void deleteAllTransactionsForUser(User user);
}
