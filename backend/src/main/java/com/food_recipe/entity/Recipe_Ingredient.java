package com.food_recipe.entity;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "`Recipe_Ingredient`")
public class Recipe_Ingredient implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @ManyToOne
    private Recipes recipe;

    @ManyToOne
    private Ingredient ingredient;

    @Column(name = "`amount`", nullable = false)
    private Float amount;



}