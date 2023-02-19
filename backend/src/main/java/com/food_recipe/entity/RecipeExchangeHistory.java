package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "`Recipe_Exchange_History`")
public class RecipeExchangeHistory implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private RecipeExchangeHistoryPK id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @Column(name = "`exchange_date`", nullable = false, columnDefinition = "datetime default now()")
    private LocalDate exchangeDate;

    public RecipeExchangeHistory(User userId, Recipe recipeId) {
    }

    public RecipeExchangeHistory() {

    }
}