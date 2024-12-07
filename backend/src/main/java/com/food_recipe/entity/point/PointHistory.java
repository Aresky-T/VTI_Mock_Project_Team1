package com.food_recipe.entity.point;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.food_recipe.entity.recipe.Recipe;
import com.food_recipe.entity.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "`point_history`")
public class PointHistory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "`user_id`", nullable = false, referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "`activity_name`", nullable = false)
    private EPointActivity activityName;

    @Column(name = "`point_changed`", nullable = false)
    private Integer pointChanged;

    @Column(name = "`description`", nullable = false)
    private String description;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "`changed_date`", nullable = false)
    private Date changedDate;

    public PointHistory(User user, EPointActivity activityName, Integer pointChanged, String description) {
        this.user = user;
        this.activityName = activityName;
        this.pointChanged = pointChanged;
        this.description = description;
    }

    public static PointHistory buildForRecipePurchase(User user, Recipe recipe, Integer cost){
        EPointActivity activity = EPointActivity.PURCHASE_RECIPE;
        String description = activity.getTemplate() + ": " + recipe.getName();
        return new PointHistory(user, activity, -cost, description);
    }

    public static PointHistory buildForRecipeSale(Recipe recipe, Integer pointsEarned){
        EPointActivity activity = EPointActivity.EARN_POINTS_FROM_SALE;
        String description = "Earned " + pointsEarned + " points from the sale of a recipe: " + recipe.getName();
        return new PointHistory(recipe.getCreator(), activity, pointsEarned, description);
    }

    public static PointHistory buildForDailyLogin(User user, Integer earnedPoints){
        EPointActivity activity = EPointActivity.DAILY_LOGIN;
        return new PointHistory(user, activity, earnedPoints, activity.getTemplate());
    }

    public static PointHistory buildForRegisterAccount(User user, Integer earnedPoints){
        EPointActivity activity = EPointActivity.REGISTER_ACCOUNT;
        return new PointHistory(user, activity, earnedPoints, activity.getTemplate());
    }
}
