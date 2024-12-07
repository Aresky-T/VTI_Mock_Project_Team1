package com.food_recipe.service.point;

import com.food_recipe.entity.point.Point;
import com.food_recipe.entity.point.PointHistory;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;

import java.util.List;

public interface IPointService {

   List<PointHistory> getAllPointHistories(User user);

   void save(Point point);

   String createPoint(Integer userId);

   void createPoint(User user, Integer point);

   String updatePoint(Integer userId);

   void logRecipePurchase(User user, Recipe recipe);

   void logRecipePurchase(User user, Recipe recipe, Integer cost);

   void logRecipeSale(Recipe recipe, Integer earnedPoints);

   void logDailyLogin(User user, Integer earnedPoints);

   void logRegisterAccount(User user, Integer earnedPoints);
}
