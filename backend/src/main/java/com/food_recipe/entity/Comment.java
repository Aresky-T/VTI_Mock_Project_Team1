package com.food_recipe.entity;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "`Comment`")
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private CommentPK id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @Column(name = "`comment`", nullable = false, columnDefinition = "TEXT")
    private String comment;

    @Column(name = "`create_date`", nullable = false, columnDefinition = "datetime default now()")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Column(name = "`update_date`")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updateDate;

    public Comment(Integer userId, Integer recipeId, String comment) {
        this.id = new CommentPK(userId, recipeId);
        this.user = new User(userId);
        this.recipe = new Recipe(recipeId);
        this.comment = comment;
    }
}