package com.food_recipe.service;

import com.food_recipe.dto.NotificationFormCreating;
import com.food_recipe.entity.Notification;

import java.util.List;

public interface INotificationService {
    String createNotification(NotificationFormCreating data);

    List<Notification> getListNotifies(Integer receiverId);
}
