package com.food_recipe.dto;

import com.food_recipe.entity.User;
import com.food_recipe.entity.UserGender;
import com.food_recipe.entity.UserStatus;
import com.food_recipe.validation.EmailNotUnique;
import io.swagger.models.auth.In;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UserDTO {

	private String username;

	private String email;

	private String password;

	private String firstName;

	private String lastName;

	private LocalDate birthDate;

	private UserGender gender;

	private String phone;

	private UserStatus status;

	private PointDTO point;

	@Data
	@NoArgsConstructor
	static class PointDTO {
		private Integer point;
	}



	public User toEntity() {
		return new User( firstName, lastName, username, email, password);
	}
}