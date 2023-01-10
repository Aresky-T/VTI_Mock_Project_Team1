
package com.food_recipe.dto;

import com.food_recipe.entity.Recipes;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.Map;

@Data
public class RecipeFormForCreating {

    private String name;

    private String imageUrl;

    private String description;

    private String processingSteps;

    private Integer userId;

    private String note;

    private Float price;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    Map<Integer, Float> ingredientIds; // những đối tượng nguện liệu đã có trong BD

    //Map<IngredientDTO, Float>  ingredientDTOS; // Những đối tượng nguyên liệu chưa có trong BD, muốn lưu vào DB


    public Recipes toEntity() {
        return new Recipes(name, imageUrl, description, processingSteps, userId, note, price);
    }

}
