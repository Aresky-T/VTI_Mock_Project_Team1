package com.food_recipe.controller;

import com.food_recipe.dto.PointDTO;
import com.food_recipe.service.IPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/point")
@Validated
public class PointController {

    @Autowired
    private IPointService pointService;

    @PostMapping
    public ResponseEntity<?> createPoint(@RequestParam Integer userId) {
        return new ResponseEntity<>(pointService.createPoint(userId), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updatePoint(@RequestParam Integer userId) {
        return new ResponseEntity<>(pointService.updatePoint(userId), HttpStatus.OK);
    }
}
