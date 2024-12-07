package com.food_recipe.service.notification;

import com.food_recipe.entity.notification.Notification;
import com.food_recipe.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.food_recipe.dto.notification.request.NotificationFormCreating;
import com.food_recipe.entity.notification.SystemNotification;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.notification.UserNotification;
import com.food_recipe.repository.SystemNotificationRepository;
import com.food_recipe.repository.UserNotificationRepository;

import java.util.List;
import java.util.Objects;

@Service
@Component
public class NotificationService implements INotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserNotificationRepository userNotificationRepository;
    
    @Autowired
    private SystemNotificationRepository systemNotificationRepository;

    @Override
    public String createNotification(NotificationFormCreating data) {
        SystemNotification systemNotification;
        UserNotification userNotification;
        if(Objects.equals(data.getType(), "system_notification")){
            systemNotification = new SystemNotification();
            User receiver = new User();
            receiver.setId(data.getReceiverId());
            systemNotification.setReceiver(receiver);
            systemNotification.setContent(data.getContent());
            systemNotification.setSeen(false);
            systemNotificationRepository.save(systemNotification);
            return "created system notification success!";
        }
        if(Objects.equals(data.getType(), "user_notification")){
            userNotification = new UserNotification();
            if (!Objects.equals(data.getSenderId(), data.getReceiverId())){
                User receiver = new User();
                User sender = new User();

                receiver.setId(data.getReceiverId());
                sender.setId(data.getSenderId());

                userNotification.setContent(data.getContent());
                userNotification.setReceiver(receiver);
                userNotification.setSender(sender);
                userNotification.setSeen(false);

                userNotificationRepository.save(userNotification);
                return "created user notification success!";
            }
            return "created user notification failed!";
        }

        return "created notification failed!";
    }

    @Override
    public List<Notification> getListNotifies (Integer receiverId) {
        return notificationRepository.getAllByReceiverId(receiverId);
    }
}
