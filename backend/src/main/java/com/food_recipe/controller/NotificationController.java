package com.food_recipe.controller;

import com.food_recipe.dto.NotificationDTO;
import com.food_recipe.entity.Notification;
import com.food_recipe.entity.UserNotification;
import com.food_recipe.service.NotificationService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.food_recipe.dto.NotificationFormCreating;
import com.food_recipe.service.INotificationService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/notifications")
@Validated
public class NotificationController {
    @Autowired
    private INotificationService notificationService;

    @Autowired
    private ModelMapper modelMapper;
    
    @PostMapping
    public ResponseEntity<?> createNotification (@RequestBody NotificationFormCreating data) {
        var response = notificationService.createNotification(data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getListNotifies (@RequestParam Integer receiverId) {
        List<Notification> entities = notificationService.getListNotifies(receiverId);
        List<NotificationDTO> dtos = modelMapper.map(entities, new TypeToken<List<NotificationDTO>>(){}.getType());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
