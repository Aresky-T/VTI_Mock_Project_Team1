package com.food_recipe.entity.point;

import com.food_recipe.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`point`")
public class Point implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ToString.Exclude
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "point", nullable = false, columnDefinition = "int default 0")
    private Integer point;

    public static Point buildEntity(User user){
        return buildEntity(user, 0);
    }

    public static Point buildEntity(User user, Integer point){
        return Point.builder().user(user).point(point).build();
    }
}
