//package com.food_recipe.service.food_group;
//
//import com.food_recipe.dto.request.CreateFoodGroupDTO;
//import com.food_recipe.entity.food.FoodGroup;
//import com.food_recipe.exception.CommonException;
//import com.food_recipe.repository.FoodGroupRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//
//@Service
//public class FoodGroupServiceImp implements IFoodGroupService {
//    private final FoodGroupRepository foodGroupRepository;
//
//    public FoodGroupServiceImp(FoodGroupRepository foodGroupRepository){
//        this.foodGroupRepository = foodGroupRepository;
//    }
//
//    @Override
//    public FoodGroup save(FoodGroup foodGroup) {
//        return foodGroupRepository.save(foodGroup);
//    }
//
//    @Override
//    public FoodGroup create(CreateFoodGroupDTO dto) {
//        if(checkExistsByName(dto.getName())){
//            throw CommonException.RECIPE_NAME_ALREADY_EXISTS;
//        }
//        return foodGroupRepository.save(dto.toFoodGroupEntity());
//    }
//
//    @Override
//    public FoodGroup findById(Integer groupId) {
//        return findOne(groupId).orElseThrow(() -> CommonException.INVALID_RECIPE_ID);
//    }
//
//    @Override
//    public FoodGroup findByName(Integer groupName) {
//        return findOne(groupName).orElseThrow(() -> CommonException.INVALID_RECIPE_NAME);
//    }
//
//    @Override
//    public List<FoodGroup> findByNameLike(String str) {
//        return findAllByNameLike(str);
//    }
//
//    @Override
//    public Boolean checkExistsById(Integer groupId) {
//        return foodGroupRepository.existsById(groupId);
//    }
//
//    @Override
//    public Boolean checkExistsByName(String groupName) {
//        return foodGroupRepository.existsByName(groupName);
//    }
//
//    @Override
//    public FoodGroup update(Map<String, Object> fields) {
//        return null;
//    }
//
//    @Override
//    public void deleteById(Integer groupId) {
//
//    }
//
//    @Override
//    public void deleteByName(String groupName) {
//
//    }
//
//    private Optional<FoodGroup> findOne(Integer id){
//        return foodGroupRepository.findById(id);
//    }
//
//    private Optional<FoodGroup> findOne(String name){
//        return foodGroupRepository.findByName(name);
//    }
//
//    private List<FoodGroup> findAllByNameLike(String str){
//        return foodGroupRepository.findByNameLike("%" + str + "%");
//    }
//}
