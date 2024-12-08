package com.food_recipe.controller;

import com.food_recipe.dto.response.PointHistoryResponse;
import com.food_recipe.entity.point.PointHistory;
import com.food_recipe.entity.user.User;
import com.food_recipe.service.point.IPointService;
import com.food_recipe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/point")
@Validated
public class PointController {

    @Autowired
    private IPointService pointService;

    @Autowired
    private IUserService userService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/changed-history")
    public ResponseEntity<List<PointHistoryResponse>> getPointChangedHistory(Authentication auth){
        User user = userService.findUserByUsername(auth.getName());
        List<PointHistory> histories = pointService.getAllPointHistories(user);
        List<PointHistoryResponse> dtos = histories.stream().map(PointHistoryResponse::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createPoint(@RequestParam Integer userId) {
        return new ResponseEntity<>(pointService.createPoint(userId), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updatePoint(@RequestParam Integer userId) {
        return new ResponseEntity<>(pointService.updatePoint(userId), HttpStatus.OK);
    }
}
