package com.food_recipe.dto;

import com.food_recipe.entity.Point;
import com.food_recipe.entity.Voting;
import lombok.Data;

@Data
public class PointDTO {

    private Integer userId;

    private Integer points;

    public Point toEntity () {
        return new Point(userId, points);
    }
}
