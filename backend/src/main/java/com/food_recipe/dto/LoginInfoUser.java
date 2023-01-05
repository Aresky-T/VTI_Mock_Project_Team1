package com.food_recipe.dto;

import com.food_recipe.entity.UserGender;

public class LoginInfoUser {

	private String token;

	private String username;

	private String email;

	private String firstName;

	private String lastName;

	private String avatarUrl;

	private String status;

	private Integer id;

	private UserGender gender;

	private Integer phone;

	public LoginInfoUser(String token, String username, String email, String firstName, String lastName, String avatarUrl ,String status, Integer id, UserGender gender, Integer phone) {
		this.token = token;
		this.username = username;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.avatarUrl = avatarUrl;
		this.status = status;
		this.id = id;
		this.gender = gender;
		this.phone = phone;
	}

	public String getToken() {
		return token;
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
	public String getAvatarUrl() {
		return avatarUrl;
	}
	public String getStatus() {
		return status;
	}

	public Integer getId() {
		return id;
	}

	public UserGender getGender() {
		return gender;
	}

	public Integer getPhone() {
		return phone;
	}
}
