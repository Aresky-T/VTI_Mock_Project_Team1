package com.food_recipe.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "`Wallet`")
public class Wallet implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @ManyToOne
    private User user;

    @Column(name = "`soDuTK`")
    private Integer soDuTK;


}
