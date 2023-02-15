//package com.food_recipe.service;
//
//import com.food_recipe.dto.PointDTO;
//import com.food_recipe.entity.Point;
//import com.food_recipe.repository.PointRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class PointService implements IPointService {
//
//    @Autowired
//    private PointRepository pointRepository;
//
//
//    @Override
//    public Point createPoint(PointDTO pointDTO) {
//        return pointRepository.save(pointDTO.toEntity());
//    }
//
//
//
//
////    @Override
////    public void updateVoting(Recipe recipeId, VotingFormForUpdate form) {
////        Voting voting = votingRepository.findByRecipeId(recipeId);
////        voting.setStars(form.getStars());
////        votingRepository.save(voting);
////    }
////
////
////    @Override
////    public void deleteVoting(Recipe recipeId) {
////        votingRepository.deleteByRecipeId(recipeId);
////    }
//
//}
