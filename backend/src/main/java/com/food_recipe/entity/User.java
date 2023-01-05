package com.food_recipe.entity;

import lombok.Data;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Entity
@Data
@Table(name = "`User`")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`first_name`", nullable = false)
    private String firstName;

    @Column(name = "`last_name`", nullable = false, length = 50)
    private String lastName;

    @Formula("concat(first_name, ' ', last_name)")
    private String fullName;

    @Column(name = "`username`", nullable = false, length = 50, unique = true)
    private String username;

    @Column(name = "`email`", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "`password`", nullable = false, length = 100)
    private String password;

    @Column(name="`birth_date`")
    private LocalDate birthDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`gender`")
    private UserGender gender;

    @Column(name = "phone", length = 10 )
    private Integer phone;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`status`", nullable = false)
    private UserStatus status = UserStatus.NOT_ACTIVE;

    @Column(name = "avatar_url")
    private String avatarUrl;

    public User() {

    }

    public User(String firstName, String lastName, String username, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.username = username;
        this.email = email;
        this.password = password;
    }

}