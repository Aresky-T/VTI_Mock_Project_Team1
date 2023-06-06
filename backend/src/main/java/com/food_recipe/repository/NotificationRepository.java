package com.food_recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.food_recipe.entity.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer>,
        JpaSpecificationExecutor<Notification> {

    @Query("SELECT n FROM Notification as n WHERE n.receiver.id = ?1")
    List<Notification> getAllByReceiverId(Integer receiverId);
}
