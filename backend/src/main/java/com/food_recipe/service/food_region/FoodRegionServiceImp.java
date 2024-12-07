//package com.food_recipe.service.food_region;
//
//import com.food_recipe.dto.request.CreateFoodRegionDTO;
//import com.food_recipe.entity.food.FoodRegion;
//import com.food_recipe.exception.CommonException;
//import com.food_recipe.repository.FoodRegionRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class FoodRegionServiceImp implements IFoodRegionService {
//
//    private final FoodRegionRepository foodRegionRepository;
//
//    public FoodRegionServiceImp(FoodRegionRepository foodRegionRepository){
//        this.foodRegionRepository = foodRegionRepository;
//    }
//
//    @Override
//    public FoodRegion save(FoodRegion foodRegion) {
//        return foodRegionRepository.save(foodRegion);
//    }
//
//    @Override
//    public FoodRegion create(CreateFoodRegionDTO dto) {
//        if(checkExistsByName(dto.getName())){
//            throw CommonException.RECIPE_NAME_ALREADY_EXISTS;
//        }
//
//        FoodRegion region = dto.toFoodRegionEntity();
//        return foodRegionRepository.save(region);
//    }
//
//    @Override
//    public FoodRegion findById(Integer regionId) {
//        return foodRegionRepository.findById(regionId).orElseThrow(() -> CommonException.INVALID_REGION_ID);
//    }
//
//    @Override
//    public FoodRegion findByName(String regionName) {
//        return foodRegionRepository.findByName(regionName).orElseThrow(() -> CommonException.INVALID_REGION_NAME);
//    }
//
//    @Override
//    public List<FoodRegion> findByNameLike(String str) {
//        return List.of();
//    }
//
//    @Override
//    public Boolean checkExistsById(Integer regionId) {
//        return foodRegionRepository.existsById(regionId);
//    }
//
//    @Override
//    public Boolean checkExistsByName(String regionName) {
//        return foodRegionRepository.existsByName(regionName);
//    }
//
//    @Override
//    public FoodRegion update(Map<String, Object> fields) {
//        return null;
//    }
//
//    @Override
//    public void deleteById(Integer regionId) {
//        if(!checkExistsById(regionId)){
//            throw CommonException.REGION_DOES_NOT_EXISTS;
//        }
//
//        foodRegionRepository.deleteById(regionId);
//    }
//
//    @Override
//    public void deleteByName(String regionName) {
//        if(!checkExistsByName(regionName)){
//            throw CommonException.REGION_DOES_NOT_EXISTS;
//        }
//
//        foodRegionRepository.deleteByName(regionName);
//    }
//}
