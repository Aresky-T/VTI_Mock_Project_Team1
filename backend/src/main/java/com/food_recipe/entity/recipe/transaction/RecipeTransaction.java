package com.food_recipe.entity.recipe.transaction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "`recipe_transaction`")
public class RecipeTransaction implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "recipe_id", nullable = false, referencedColumnName = "id")
    private Recipe recipe;

    @Column(name = "cost", nullable = false)
    private Integer cost;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "transaction_date", nullable = false)
    private Date transactionDate;

    public static RecipeTransaction buildEntity(User user, Recipe recipe){
        return RecipeTransaction.builder()
                .user(user)
                .recipe(recipe)
                .cost(recipe.getPoint())
                .transactionDate(new Date(System.currentTimeMillis()))
                .build();
    }

    public static RecipeTransaction buildEntity(User user, Recipe recipe, Integer cost){
        return RecipeTransaction.builder()
                .user(user)
                .recipe(recipe)
                .cost(cost)
                .transactionDate(new Date(System.currentTimeMillis()))
                .build();
    }
}
