package com.food_recipe.repository;

import com.food_recipe.entity.point.PointHistory;
import com.food_recipe.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointHistoryRepository extends JpaRepository<PointHistory, Integer> {
    List<PointHistory> findByUser(User user);
}
