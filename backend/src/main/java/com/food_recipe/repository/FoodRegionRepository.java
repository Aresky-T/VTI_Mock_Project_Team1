//package com.food_recipe.repository;
//
//import com.food_recipe.entity.food.FoodRegion;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.Optional;
//
//@Repository
//public interface FoodRegionRepository extends JpaRepository<FoodRegion, Integer> {
//    Optional<FoodRegion> findByNameLike(String name);
//
//    Optional<FoodRegion> findByName(String name);
//
//    boolean existsByName(String name);
//
//    long deleteByName(String name);
//}
