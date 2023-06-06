package com.food_recipe.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
@DiscriminatorValue("user_notification")
public class UserNotification extends Notification {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "`sender`", nullable = false)
    private User sender;
}
