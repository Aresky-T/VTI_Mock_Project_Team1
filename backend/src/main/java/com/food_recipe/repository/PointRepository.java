package com.food_recipe.repository;

import com.food_recipe.entity.point.Point;
import com.food_recipe.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PointRepository extends JpaRepository<Point, Integer>, JpaSpecificationExecutor<Point> {
    Point findByUserId(Integer userId);

    Optional<Point> findByUser(User user);

    boolean existsByUser(User user);
}
