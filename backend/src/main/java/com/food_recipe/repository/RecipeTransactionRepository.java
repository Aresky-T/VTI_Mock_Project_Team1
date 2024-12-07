package com.food_recipe.repository;

import com.food_recipe.entity.recipe.transaction.RecipeTransaction;
import com.food_recipe.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeTransactionRepository extends JpaRepository<RecipeTransaction, Integer> {
    List<RecipeTransaction> findByUser(User user);
}
