package com.food_recipe.service;

import com.food_recipe.dto.PointDTO;
import com.food_recipe.entity.Point;


public interface IPointService {

    Point createPoint (PointDTO pointDTO);
}
