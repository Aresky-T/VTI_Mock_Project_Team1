package com.food_recipe.entity.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.food_recipe.entity.point.Point;
import com.food_recipe.entity.point.PointHistory;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.comment.Comment;
import com.food_recipe.entity.recipe.owner.RecipeOwner;
import com.food_recipe.entity.recipe.transaction.RecipeTransaction;
import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "`user`")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`username`", nullable = false, length = 50, unique = true)
    private String username;

    @Column(name = "`email`", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "`password`", nullable = false, length = 100)
    private String password;

    @Column(name = "avatar_url", columnDefinition = "TEXT")
    private String avatarUrl;

    @Column(name = "`first_name`", nullable = false, length = 50)
    private String firstName;

    @Column(name = "`last_name`", nullable = false, length = 50)
    private String lastName;

    @Column(name="`birth_date`")
    private LocalDate birthDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`gender`")
    private UserGender gender;

    @Column(name = "phone", length = 50 )
    private String phone;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`status`", nullable = false)
    private UserStatus status = UserStatus.NOT_ACTIVE;

    @Formula("concat(first_name, ' ', last_name)")
    private String fullName;

    @OneToOne(mappedBy = "user", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private Point point;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "creator", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Recipe> recipes;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "owner", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<RecipeOwner> recipeOwners;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<RecipeTransaction> recipeTransactions;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<PointHistory> pointHistories;

    public User(String username, String email, String password, String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(Integer userId) {
        this.id = userId;
    }
}