package com.food_recipe.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filter <FIELD_TYPE> implements Serializable {

    protected FIELD_TYPE equals;

    protected FIELD_TYPE notEquals;
}