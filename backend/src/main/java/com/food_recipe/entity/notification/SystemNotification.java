package com.food_recipe.entity.notification;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("system_notification")
public class SystemNotification extends Notification {
    private static final long serialVersionUID = 1L;
}
