package com.food_recipe.entity.comment;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
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
@Table(name = "`comment`")
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ToString.Exclude
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "`user_id`", nullable = false, referencedColumnName = "`id`")
    private User user;

    @ToString.Exclude
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "`recipe_id`", nullable = false, referencedColumnName = "`id`")
    private Recipe recipe;

    @ToString.Exclude
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "`parent_comment_id`", referencedColumnName = "`id`")
    private Comment parentComment;

    @Column(name = "`message`", nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "`sub_comment_count`", columnDefinition = "INT NOT NULL DEFAULT 0")
    private Integer subCommentCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "`level`", nullable = false)
    private ECommentLevel level;

    @Enumerated(EnumType.STRING)
    @Column(name = "`user_role`", nullable = false)
    private EUserRole userRole;

    @Column(name = "`create_date`", columnDefinition = "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Column(name = "`update_date`", columnDefinition = "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updateDate;

    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "parentComment", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> subComments;
}