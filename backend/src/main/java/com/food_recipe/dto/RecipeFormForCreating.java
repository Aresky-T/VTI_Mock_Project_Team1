
package com.food_recipe.dto;

import com.food_recipe.entity.Recipes;
import com.food_recipe.entity.User;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class RecipeFormForCreating {

    private String name;

    private String imageUrl;

    private String description;

    private String processingSteps;

    private Integer userId;

    private String note;

    private Float price;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "`create_date`", nullable = false)
    private Date createDate;


    public Recipes toEntity() {
        return new Recipes(name, imageUrl, description, processingSteps, userId, note, price);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProcessingSteps() {
        return processingSteps;
    }

    public void setProcessingSteps(String processingSteps) {
        this.processingSteps = processingSteps;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
