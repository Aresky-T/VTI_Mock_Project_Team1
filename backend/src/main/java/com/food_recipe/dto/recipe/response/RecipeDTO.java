package com.food_recipe.dto.recipe.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import com.food_recipe.entity.user.UserGender;

@Data
@NoArgsConstructor
public class RecipeDTO {

	private Integer id;

	private String code;

	private String name;

	private String imageUrl;

	private Integer point;

	private String createDate;

	private UserDTO creator;

	@Data
	@NoArgsConstructor
	static class UserDTO {
		private String fullName;
		private String avatarUrl;
		private UserGender gender;
	}
}
