package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "`Recipe_Purchase_History`")
public class RecipePurchaseHistory implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @ManyToOne
    private User user;

    @ManyToOne
    private Recipes recipes;

    @Column(name = "`purchase_date`", nullable = false)
    private LocalDate purchaseDate;

}