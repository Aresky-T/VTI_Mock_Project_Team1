package com.food_recipe.dto;

import com.food_recipe.entity.UserGender;

public class LoginInfoUser {

	private String token;

	private String userName;

	private String email;

	private String firstName;

	private String lastName;

	private String status;

	private Integer id;

	private UserGender gender;

	private Integer phone;

	public LoginInfoUser(String token, String userName, String email, String firstName, String lastName, String status, Integer id, UserGender gender, Integer phone) {
		this.token = token;
		this.userName = userName;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.status = status;
		this.id = id;
		this.gender = gender;
		this.phone = phone;
	}

	public String getToken() {
		return token;
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
