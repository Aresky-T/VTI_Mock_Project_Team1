package com.food_recipe.repository;

import com.food_recipe.entity.Point;
import com.food_recipe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends JpaRepository<Point, Integer>, JpaSpecificationExecutor<Point> {

    Point findByUserId(Integer userId);
}
