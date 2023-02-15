package com.food_recipe.dto;

import com.food_recipe.entity.Recipe;
import com.food_recipe.entity.RecipeIngredient;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Data
public class RecipeFormForUpdate {

    private String name;

    private String imageUrl;

    private String description;

    private String processingSteps;

    private Integer points;

    private String note;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "`create_date`", nullable = false)
    private Date createDate;


}
