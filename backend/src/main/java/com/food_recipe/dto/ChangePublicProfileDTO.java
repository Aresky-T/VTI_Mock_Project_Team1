package com.food_recipe.dto;

import com.food_recipe.entity.UserGender;
import com.food_recipe.entity.UserStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
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
