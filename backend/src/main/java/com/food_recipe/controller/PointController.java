//package com.food_recipe.controller;
//
//import com.food_recipe.dto.PointDTO;
//import com.food_recipe.service.IPointService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/api/v1/points")
//public class PointController {
//
//    @Autowired
//    private IPointService pointService;
//
//
//    @PostMapping
//    public ResponseEntity<?> createPoint (@RequestBody PointDTO pointDTO) {
//        return new ResponseEntity<>(pointService.createPoint(pointDTO), HttpStatus.OK);
//    }
//}
