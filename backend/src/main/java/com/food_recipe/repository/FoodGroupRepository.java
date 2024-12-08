//package com.food_recipe.repository;
//
//import com.food_recipe.entity.food.FoodGroup;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface FoodGroupRepository extends JpaRepository<FoodGroup, Integer> {
//    boolean existsByName(String name);
//
//    Optional<FoodGroup> findByName(String name);
//
//    List<FoodGroup> findByNameLike(String name);
//}
