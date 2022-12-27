package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "`Voting`")
public class Voting implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Recipes recipes;

    @Column(name = "`stars`", nullable = false)
    private Integer stars;

    @Column(name = "`create_date`", nullable = false)
    private LocalDate createDate;



}