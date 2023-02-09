package com.food_recipe.dto;

import com.food_recipe.entity.UserGender;
import com.food_recipe.validation.EmailNotUnique;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;

public class ProfileDTO {

	private String username;


	private String email;

	private String firstName;

	private String lastName;

	@Past
	private LocalDate birthDate;

	private UserGender gender;

	private String phone;

	private String status;

	private String avatarUrl;


	public ProfileDTO(String username, String email, String firstName, String lastName, LocalDate birthDate, UserGender gender, String phone, String status, String avatarUrl) {
		this.username = username;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.gender = gender;
		this.phone = phone;
		this.status = status;
		this.avatarUrl = avatarUrl;
	}

	public String getUsername() {
		return username;
	}

	public String getEmail() {
		return email;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public UserGender getGender() {
		return gender;
	}

	public String getPhone() {
		return phone;
	}

	public String getStatus() {
		return status;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}
}
