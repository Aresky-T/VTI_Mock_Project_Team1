package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "`Recipe`")
public class Recipes implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @Column(name = "`name`" ,  nullable = false)
    private String name;

    @Column(name = "`imageUrl`" ,  nullable = false)
    private String imageUrl;

    @Column(name = "`description`" ,  nullable = false)
    private String description;

    @Column(name = "`processingSteps`" ,  nullable = false)
    private String processingSteps;

    @ManyToOne
    private User user;

    @Column(name = "`note`")
    private String note;

    @Column(name = "`price`")
    private Float price;

    @Column(name = "`views`")
    private Integer views;

    @Column(name = "`createDate`", nullable = false)
    private LocalDate createDate;



}