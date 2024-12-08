//package com.food_recipe.service.food_group;
//
//import com.food_recipe.dto.request.CreateFoodGroupDTO;
//import com.food_recipe.entity.food.FoodGroup;
//
//import java.util.List;
//import java.util.Map;
//
//public interface IFoodGroupService {
//    FoodGroup save(FoodGroup foodGroup);
//    FoodGroup create(CreateFoodGroupDTO dto);
//    FoodGroup findById(Integer groupId);
//    FoodGroup findByName(Integer groupName);
//    List<FoodGroup> findByNameLike(String str);
//    Boolean checkExistsById(Integer groupId);
//    Boolean checkExistsByName(String groupName);
//    FoodGroup update(Map<String, Object> fields);
//    void deleteById(Integer groupId);
//    void deleteByName(String groupName);
//}
