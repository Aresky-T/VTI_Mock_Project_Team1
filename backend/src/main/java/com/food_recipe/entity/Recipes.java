package com.food_recipe.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "`Recipe`")
public class Recipes implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @Column(name = "`name`", nullable = false, unique = true, length = 200)
    private String name;

    @Column(name = "`image_url`", nullable = false, length = 200)
    private String imageUrl;

    @Column(name = "`description`", nullable = false)
    private String description;

    @Column(name = "`processing_steps`", nullable = false)
    private String processingSteps;


    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "`note`", length = 3000)
    private String note;

    @Column(name = "`price`")
    private Float price;

    @Column(name = "`views`")
    private Integer views = 0;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "`create_date`", nullable = false)
    private Date createDate;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.EAGER)
    private List<RecipeIngredient> ingredients;

    public Recipes(String name, String imageUrl, String description, String processingSteps, Integer userId, String note, Float price) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.processingSteps = processingSteps;
        this.userId = userId;
        this.note = note;
        this.price = price;
        this.createDate = new Date();
    }

    public Recipes() {

    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}