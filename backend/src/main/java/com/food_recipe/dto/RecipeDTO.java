package com.food_recipe.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class RecipeDTO {

	private Integer id;

	private String name;

	private String description;

	private String imageUrl;

	private String processingSteps;

	private String note;

	private Integer point;

	private Integer views;

	private UserDTO creator;

	private Date createDate;

	private List<RecipeIngredientDTO> ingredients;

	private List<CommentDTO> comments;

	@Data
	@NoArgsConstructor
	static class RecipeIngredientDTO {
		private String name;
		private Float amount;
		private String unit;
	}

	@Data
	@NoArgsConstructor
	static class UserDTO {
		private Integer id;
		private String fullName;
		private String gender;
		private String avatarUrl;
	}

	@Data
	@NoArgsConstructor
	static class CommentDTO {
		private com.food_recipe.dto.CommentDTO.UserDTO user;
		private String comment;
		private Date createDate;
		private Date updateDate;

		@Data
		@NoArgsConstructor
		static class UserDTO {
			private Integer id;
			private String avatarUrl;
			private String fullName;
		}
	}
}
