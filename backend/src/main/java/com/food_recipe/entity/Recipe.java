package com.food_recipe.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "`Recipe`")
public class Recipe implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;
    @Column(name = "`name`", nullable = false, length = 200)
    private String name;
    @Column(name = "`description`", nullable = false, columnDefinition = "TEXT")
    private String description;
    @Column(name = "`image_url`", nullable = false, columnDefinition = "TEXT")
    private String imageUrl;
    @Column(name = "`processing_steps`", nullable = false, columnDefinition = "TEXT")
    private String processingSteps;
    @Column(name = "`note`", nullable = false, columnDefinition = "TEXT")
    private String note;
    @Column(name = "`point`", columnDefinition = "int default 0")
    private Integer point;

    @Column(name = "`views`", columnDefinition = "int default 0")
    private Integer views = 0;
    @ManyToOne
    @JoinColumn(name = "`creator_id`", nullable = false)
    private User creator;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "`create_date`", nullable = false)
    private Date createDate;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE})
    @JsonManagedReference
    private List<RecipeIngredient> ingredients;

    @OneToMany(mappedBy = "recipe")
    private List<Comment> comments;

    public Recipe(String name, String description, String imageUrl, String processingSteps, String note, Integer point, Integer creator) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.processingSteps = processingSteps;
        this.note = note;
        this.point = point;
        this.creator = new User(creator);
    }

    public Recipe(Integer recipeId) {
        this.id = recipeId;
    }

    public Recipe() {

    }
}