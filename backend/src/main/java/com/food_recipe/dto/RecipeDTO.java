package com.food_recipe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.food_recipe.entity.Recipes;
import com.food_recipe.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class RecipeDTO {

	private String name;

	private String imageUrl;

	private String description;

	private String processingSteps;


	private String note;

	private Float price;

	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate createdDate;

}
