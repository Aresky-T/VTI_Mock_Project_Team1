package com.food_recipe.dto.notification.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotificationFormCreating {
    private Integer receiverId;
    private String content;
    private String type;
    private Integer senderId;
}
