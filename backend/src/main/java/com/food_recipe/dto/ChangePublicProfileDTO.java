package com.food_recipe.dto;

import com.food_recipe.entity.UserGender;
import com.food_recipe.entity.UserStatus;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDate;

public class ChangePublicProfileDTO {

	private String firstName;

	private String lastName;

	private LocalDate birthDate;

	private UserGender gender;

	private String phone;

	// private String avatarUrl;

	public ChangePublicProfileDTO() {
	}



	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public UserGender getGender() {
		return gender;
	}

	public void setGender(UserGender gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	// public String getAvatarUrl() {
	// 	return avatarUrl;
	// }

	// public void setAvatarUrl(String avatarUrl) {
	// 	this.avatarUrl = avatarUrl;
	// }
}
