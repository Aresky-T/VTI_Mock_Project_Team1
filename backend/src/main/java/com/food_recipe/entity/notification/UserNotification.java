package com.food_recipe.entity.notification;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.food_recipe.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("user_notification")
public class UserNotification extends Notification {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "`sender`", nullable = false)
    private User sender;
}
