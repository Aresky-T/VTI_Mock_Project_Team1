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
    @Column(name = "`id`", unique = true, nullable = false)
    private Integer id;

    @Column(name = "`firstName`", nullable = false)
    private String firstName;

    @Column(name = "`lastName`", nullable = false)
    private String lastName;

    @Formula("concat(firstName, ' ', lastName)")
    private String fullName;

    @Column(name = "`userName`", nullable = false, length = 50, unique = true)
    private String userName;

    @Column(name = "`email`", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "`password`", nullable = false, length = 50)
    private String password;

    @Column(name="`birthDate`", nullable = false )
    private LocalDate birthDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`gender`", nullable = false)
    private UserGender gender;

    @Column(name = "phone", nullable = false, length = 10 )
    private Integer phone;

    @Column(name = "avatarUrl")
    private String avatarUrl;

}