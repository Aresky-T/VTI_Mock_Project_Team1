//package com.food_recipe.dto.request;
//
//import com.food_recipe.entity.food.ERegionType;
//import com.food_recipe.entity.food.FoodRegion;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//public class CreateFoodRegionDTO {
//    private String name;
//    private String description;
//    private ERegionType type;
//    private String famousFor;
//    private String imageUrl;
//
//    public FoodRegion toFoodRegionEntity(){
//        return FoodRegion.builder()
//                .name(name)
//                .description(description)
//                .type(type)
//                .famousFor(famousFor)
//                .imageUrl(imageUrl)
//                .build();
//    }
//}
