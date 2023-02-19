package com.food_recipe.service;

import com.food_recipe.entity.Point;
import com.food_recipe.entity.User;
import com.food_recipe.repository.PointRepository;
import com.food_recipe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PointService implements IPointService {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;

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

}
