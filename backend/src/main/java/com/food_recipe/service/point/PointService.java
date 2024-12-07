package com.food_recipe.service.point;

import com.food_recipe.entity.point.Point;
import com.food_recipe.entity.point.PointHistory;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import com.food_recipe.repository.PointHistoryRepository;
import com.food_recipe.repository.PointRepository;
import com.food_recipe.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PointService implements IPointService {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private PointHistoryRepository pointHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<PointHistory> getAllPointHistories(User user) {
        return pointHistoryRepository.findByUser(user);
    }

    @Transactional
    @Override
    public void save(Point point) {
        pointRepository.save(point);
    }

    @Override
    public String createPoint(Integer userId) {
        boolean userExist = userRepository.existsById(userId);
        if (!userExist) {
            return "User is not exist";
        } else {
            User user = userRepository.findById(userId).get();
            if (user.getPoint() != null && user.getPoint().getPoint() > 0) {
                return "Can not create point!";
            }
            Point point = new Point();
            point.setPoint(10);
            point.setUser(user);
            pointRepository.save(point);
            return "Good job, account created successfully, you get 10 points!";
        }
    }

    @Transactional
    @Override
    public void createPoint(User user, Integer point) {
        if(!pointRepository.existsByUser(user)){
            pointRepository.save(Point.buildEntity(user, point));
        }
    }

    // @Override
    public String updatePoint(Integer userId){
        boolean userExist = userRepository.existsById(userId);
        if (!userExist) {
            return "User is not exist";
        } else {
            User user = userRepository.findById(userId).get();
            if (user.getPoint() == null) {
                return "Can not update point!";
            }
            Point point = pointRepository.findByUserId(userId);
            point.setPoint(point.getPoint() + 1);
            pointRepository.save(point);
            return "Well done, you have added 1 points!";
        }
    }

    @Transactional
    @Override
    public void logRecipePurchase(User user, Recipe recipe) {
        Integer cost = recipe.getPoint();
        logRecipePurchase(user, recipe, cost);
    }

    @Transactional
    @Override
    public void logRecipePurchase(User user, Recipe recipe, Integer cost) {
        pointHistoryRepository.save(PointHistory.buildForRecipePurchase(user, recipe, cost));
    }

    @Transactional
    @Override
    public void logRecipeSale(Recipe recipe, Integer earnedPoints) {
        pointHistoryRepository.save(PointHistory.buildForRecipeSale(recipe, earnedPoints));
    }

    @Transactional
    @Override
    public void logDailyLogin(User user, Integer earnedPoints) {
        pointHistoryRepository.save(PointHistory.buildForDailyLogin(user, earnedPoints));
    }

    @Transactional
    @Override
    public void logRegisterAccount(User user, Integer earnedPoints) {
        pointHistoryRepository.save(PointHistory.buildForRegisterAccount(user, earnedPoints));
    }
}
