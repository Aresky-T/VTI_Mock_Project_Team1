package com.food_recipe.dto.user.request;

import com.food_recipe.entity.user.UserGender;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
public class ChangePublicProfileDTO {

	private String firstName;

	private String lastName;

	private LocalDate birthDate;

	private UserGender gender;

	private String phone;
}
