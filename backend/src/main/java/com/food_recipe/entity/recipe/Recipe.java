package com.food_recipe.entity.recipe;

import com.fasterxml.jackson.annotation.*;
import com.food_recipe.entity.comment.Comment;
import com.food_recipe.entity.recipe.ingredient.Ingredient;
import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.recipe.step.Step;
import com.food_recipe.entity.recipe.transaction.RecipeTransaction;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.voting.VotingStatistic;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`recipe`")
public class Recipe implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @Column(name = "`code`", nullable = false, unique = true, length = 20)
    private String code;

    @Column(name = "`name`", nullable = false, unique = true, length = 200)
    private String name;

    @Column(name = "`description`", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "`image_url`", nullable = false)
    private String imageUrl;

    @Column(name = "`note`", columnDefinition = "TEXT")
    private String note;

    @Column(name = "`point`", nullable = false, columnDefinition = "int default 0")
    private Integer point;

    @Column(name = "`views`", nullable = false, columnDefinition = "int default 0")
    private Integer views;

//    @ToString.Include(name = "getId")
//    @ManyToOne(cascade = { CascadeType.REMOVE })
//    @JoinColumn(name = "group_id", nullable = false)
//    private FoodGroup group;
//
//    @ToString.Exclude
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "region_id")
//    private FoodRegion region;

    @ToString.Exclude
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "`creator_id`", nullable = false)
    private User creator;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "`create_date`", nullable = false)
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    @Column(name = "`update_date`", nullable = false)
    private Date updateDate;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Ingredient> ingredients;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Step> steps;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = { CascadeType.ALL }, orphanRemoval = true)
    private List<Comment> comments;

    @OneToOne(mappedBy = "recipe")
    private VotingStatistic votingStatistic;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeOwner> owners;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeTransaction> transactions;
}