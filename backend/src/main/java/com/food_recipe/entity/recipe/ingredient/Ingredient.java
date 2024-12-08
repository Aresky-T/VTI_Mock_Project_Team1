package com.food_recipe.entity.recipe.ingredient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.food_recipe.entity.recipe.Recipe;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "`recipe_ingredient`")
public class Ingredient implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ToString.Exclude
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "`recipe_id`", nullable = false)
    private Recipe recipe;

    @Column(name = "`name`", nullable = false)
    private String name;

    @Column(name = "`amount`", nullable = false)
    private Float amount;

    @Column(name = "`unit`", length = 50, nullable = false)
    private String unit;

    public Ingredient(Integer recipeId, String name, Float amount, String unit) {
        Recipe rec = new Recipe();
        rec.setId(recipeId);
        this.recipe = rec;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
}