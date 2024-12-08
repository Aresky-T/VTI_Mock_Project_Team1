package com.food_recipe.service.notification;

import com.food_recipe.dto.notification.request.NotificationFormCreating;
import com.food_recipe.entity.notification.Notification;

import java.util.List;

public interface INotificationService {
    String createNotification(NotificationFormCreating data);

    List<Notification> getListNotifies(Integer receiverId);
}
