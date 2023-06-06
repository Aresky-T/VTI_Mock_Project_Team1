package com.food_recipe.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class NotificationDTO {
    private UserDTO sender;
    private String content;
    private Date notificationDate;
    private Boolean seen;

    @Data
    public static class UserDTO {
        private String fullName;
        private String avatarUrl;
    }
}
