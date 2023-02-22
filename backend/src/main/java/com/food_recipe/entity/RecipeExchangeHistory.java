package com.food_recipe.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

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
    @CreationTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    private Date exchangeDate;



    public RecipeExchangeHistory() {

    }

    public RecipeExchangeHistory(Integer userId, Integer recipeId) {
        this.id = new RecipeExchangeHistoryPK(userId, recipeId);
        this.user = new User(userId);
        this.recipe = new Recipe(recipeId);
    }
}