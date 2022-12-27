package com.food_recipe.dto;

import com.food_recipe.entity.User;
import lombok.Data;

@Data
public class UserDTO {

	// check not null, check length, check exists, check format (regex)...
	private String userName;

	// check not null, check length, check exists on database, check format
	// (regex)...
	private String email;

	// check not null, check length, check format (regex)...
	private String password;

	// check not null, check length, check format (regex)...
	private String firstName;

	// check not null, check length, check format (regex)...
	private String lastName;



	public User toEntity() {
		return new User( firstName, lastName, userName, email, password);
	}
}