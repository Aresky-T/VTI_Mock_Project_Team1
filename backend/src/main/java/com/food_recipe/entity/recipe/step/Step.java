package com.food_recipe.entity.recipe.step;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.food_recipe.entity.recipe.Recipe;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "recipe_step"
//        uniqueConstraints = {@UniqueConstraint(name = "uk_recipe_id_n_step_number", columnNames = {"recipe_id", "step_number"})}
)
public class Step implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "step_number", nullable = false)
    private Integer stepNumber;

    @Column(name = "duration", length = 100)
    private String duration;

    @Column(name = "name")
    private String name;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @JsonIgnore
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false, referencedColumnName = "id")
    @ToString.Exclude // loại bỏ thuộc tính recipe khỏi toString
    private Recipe recipe;
}
