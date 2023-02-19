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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "point", nullable = false, columnDefinition = "int default 0")
    private Integer points;

    public Point(Integer user, Integer points) {
    }

    public Point() {

    }
}
