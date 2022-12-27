package com.food_recipe.dto;

import com.food_recipe.entity.UserGender;

import java.time.LocalDate;

public class ProfileDTO {

	private String userName;

	private String email;

	private String firstName;

	private String lastName;

	private LocalDate birthDate;

	private UserGender gender;

	private Integer phone;

	private String status;

	private String avatarUrl;


	public ProfileDTO(String userName, String email, String firstName, String lastName, LocalDate birthDate, UserGender gender, Integer phone, String status, String avatarUrl) {
		this.userName = userName;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.gender = gender;
		this.phone = phone;
		this.status = status;
		this.avatarUrl = avatarUrl;
	}

	public String getUserName() {
		return userName;
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

	public Integer getPhone() {
		return phone;
	}

	public String getStatus() {
		return status;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}
}
