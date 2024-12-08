package com.food_recipe.dto.user.request;

import com.food_recipe.entity.user.User;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserFormForCreating {


	@NotNull
	@NotBlank
	@Length(min = 6, max = 50)
	private String username;


	@NotNull
	@Email
//	@EmailNotUnique
	@Length(min = 6, max = 50)
	private String email;


	@NotNull
	private String password;


	@NotNull
	private String firstName;

	@NotNull
	private String lastName;



	public User toEntity() {
		return new User(username, email, password, firstName, lastName);
	}
}