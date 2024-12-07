package com.food_recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.food_recipe.entity.notification.UserNotification;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Integer>,
        JpaSpecificationExecutor<UserNotification> {

}
