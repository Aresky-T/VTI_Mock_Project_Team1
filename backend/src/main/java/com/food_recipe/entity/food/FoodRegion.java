//package com.food_recipe.entity.food;
//
//import com.food_recipe.entity.recipe.Recipe;
//import lombok.*;
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
//@ToString
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "food_region")
//public class FoodRegion implements Serializable {
//    private static final long serialVersionUID = 1L;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(name = "name", nullable = false, unique = true, length = 100)
//    private String name;
//
//    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
//    private String description;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "type", nullable = false)
//    private ERegionType type;
//
//    @Column(name = "famous_for", nullable = false, columnDefinition = "TEXT")
//    private String famousFor;
//
//    @Column(name = "image_url")
//    private String imageUrl;
//
//    @CreationTimestamp
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(name = "created_at", nullable = false)
//    private Date createdAt;
//
//    @UpdateTimestamp
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(name = "updated_at", nullable = false)
//    private Date updatedAt;
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "region")
//    private List<Recipe> recipeList;
//}
