package com.food_recipe.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
@Data
@Table(name = "`Ingredient`")
public class Ingredient implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @Column(name = "`name`", nullable = false)
    private String name;

    @Column(name = "`unit`", nullable = false)
    private String unit;

    @OneToMany(mappedBy = "ingredient", fetch = FetchType.EAGER)
    private List<RecipeIngredient> ingredients;
    
}