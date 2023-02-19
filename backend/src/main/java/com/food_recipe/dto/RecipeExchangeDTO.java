package com.food_recipe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RecipeExchangeDTO {

    private Integer recipeId;

    private Integer userId;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate exchangeDate;
}
