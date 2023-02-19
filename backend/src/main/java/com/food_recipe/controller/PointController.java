package com.food_recipe.controller;

import com.food_recipe.dto.PointDTO;
import com.food_recipe.service.IPointService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/points")
public class PointController {

    @Autowired
    private final IPointService pointService;

    @Autowired
    private final ModelMapper modelMapper;

    public PointController(IPointService pointService, ModelMapper modelMapper) {
        this.pointService = pointService;
        this.modelMapper = modelMapper;
    }


    @PostMapping
    public ResponseEntity<?> createPoint (@RequestBody PointDTO pointDTO) {
        return new ResponseEntity<>(pointService.createPoint(pointDTO), HttpStatus.OK);
    }
}
