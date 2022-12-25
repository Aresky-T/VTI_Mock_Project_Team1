package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "`Reset_Password_Token`")
public class ResetPasswordToken implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`reset_id`", unique = true, nullable = false)
    private Integer resetID;

    @Column(name = "`token`", nullable = false, length = 36, unique = true)
    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "`expiry_date`", nullable = false)
    private Date expiryDate;

}
