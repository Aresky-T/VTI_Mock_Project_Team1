package com.food_recipe.dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.food_recipe.entity.UserGender;
import com.food_recipe.entity.UserStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProfileDTO {
	private String username;
	private String email;
	private String avatarUrl;
	private String firstName;
	private String lastName;
	private LocalDate birthDate;
	private UserGender gender;
	private String phone;
	private UserStatus status;
	private PointDTO point;
	private List<UserDTO.RecipeDTO> recipes;

	@Data
	@NoArgsConstructor
	static class PointDTO {
		private Integer point;
	}

	@Data
	@NoArgsConstructor
	static class RecipeDTO {
		private Integer id;

		private String name;

		private String description;

		private String imageUrl;

		private String processingSteps;

		private String note;

		private Integer point;

		private Integer views;

		private Date createDate;

	}
}