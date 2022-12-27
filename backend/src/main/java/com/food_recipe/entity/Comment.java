package com.food_recipe.entity;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "`Comment`")
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Recipes recipes;

    @Column(name = "`comment`", nullable = false)
    private String comment;

    @Column(name = "`create_date`", nullable = false)
    private LocalDate createDate;



}