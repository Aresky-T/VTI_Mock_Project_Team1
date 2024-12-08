//package com.food_recipe.entity.food;
//
//import com.food_recipe.entity.recipe.Recipe;
//import lombok.*;
//import org.hibernate.annotations.Check;
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.UpdateTimestamp;
//
//import javax.persistence.*;
//import java.io.Serializable;
//import java.util.Date;
//import java.util.List;
//
//@Getter
//@Setter
//@Builder
//@ToString
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Check(constraints = "recipe_count >= 0")
//@Table(name = "`food_group`")
//public class FoodGroup implements Serializable {
//    private static final long serialVersionUID = 1L;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(name = "name", length = 100, nullable = false, unique = true)
//    private String name;
//
//    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
//    private String description;
//
//    @Column(name = "recipe_count", nullable = false)
//    private Integer recipeCount;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    @CreationTimestamp
//    @Column(name = "created_at", nullable = false)
//    private Date createdAt;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    @UpdateTimestamp
//    @Column(name = "updated_at", nullable = false)
//    private Date updatedAt;
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "group")
//    private List<Recipe> recipeList;
//}
