package com.food_recipe.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RecipeDTO {
	
	private short id;

	private String name;

	private String recipePhotoUrl;

}
