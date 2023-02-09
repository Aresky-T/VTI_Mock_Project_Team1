package com.food_recipe.dto;

import com.food_recipe.entity.Recipe;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

public class RecipeFormForUpdate {

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
