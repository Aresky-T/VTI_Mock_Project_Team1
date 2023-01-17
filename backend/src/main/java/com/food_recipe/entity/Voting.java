package com.food_recipe.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "`Voting`")
public class Voting implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private VotingPK id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private Recipe recipe;

    @Column(name = "`stars`", nullable = false, columnDefinition = "int default 0")
    private Integer stars;

    @Column(name = "`create_date`", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;
}