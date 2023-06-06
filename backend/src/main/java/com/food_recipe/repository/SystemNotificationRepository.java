package com.food_recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.food_recipe.entity.SystemNotification;

@Repository
public interface SystemNotificationRepository extends JpaRepository<SystemNotification, Integer>,
        JpaSpecificationExecutor<SystemNotification> {
}
