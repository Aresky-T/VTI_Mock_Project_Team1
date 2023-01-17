package com.food_recipe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@Table(name = "`Recipe_Ingredient`")
public class RecipeIngredient implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "`recipe_id`", nullable = false)
    @JsonBackReference
    private Recipe recipe;

    @Column(name = "`name`", nullable = false)
    private String name;

    @Column(name = "`amount`", nullable = false)
    private Float amount;

    @Column(name = "`unit`", length = 50, nullable = false)
    private String unit;

    public RecipeIngredient(Integer recipeId, String name, Float amount, String unit) {
        Recipe rec = new Recipe();
        rec.setId(recipeId);
        this.recipe = rec;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
}