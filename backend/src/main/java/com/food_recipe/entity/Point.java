package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "`Point`")
public class Point implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "point", nullable = false, columnDefinition = "int default 0")
    private Integer points;

    public Point(Integer userId, Integer points) {
    }

    public Point() {

    }
}
