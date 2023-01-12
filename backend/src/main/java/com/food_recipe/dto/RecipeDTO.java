package com.food_recipe.dto;

import com.food_recipe.entity.RecipeIngredient;

import java.time.LocalDate;
import java.util.List;

public class RecipeDTO {
	
	private Integer id;

	private String name;

	private String imageUrl;

	private String description;

	private String processingSteps;

	private Integer userId;

	private String note;

	private Float price;

	private LocalDate createDate;

	private List<RecipeIngredient> ingredients;

	public RecipeDTO(Integer id, String name, String imageUrl, String description, String processingSteps, Integer userId, String note, Float price, LocalDate createDate) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.processingSteps = processingSteps;
		this.userId = userId;
		this.note = note;
		this.price = price;
		this.createDate = createDate;
	}

	public RecipeDTO() {
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}


	public String getImageUrl() {
		return imageUrl;
	}

	public String getDescription() {
		return description;
	}

	public String getProcessingSteps() {
		return processingSteps;
	}

	public Integer getUserId() {
		return userId;
	}

	public String getNote() {
		return note;
	}

	public Float getPrice() {
		return price;
	}

	public LocalDate getCreateDate() {
		return createDate;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setProcessingSteps(String processingSteps) {
		this.processingSteps = processingSteps;
	}

	public void setUser(Integer userId) {
		this.userId = userId;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public void setCreateDate(LocalDate createDate) {
		this.createDate = createDate;
	}
}
