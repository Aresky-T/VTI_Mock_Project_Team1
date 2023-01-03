package com.food_recipe.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IntegerFilter extends Filter<Integer> {

    private Long greaterThan;

    private Long greaterThanOrEquals;

    private Long lessThan;

    private Long lessThanOrEquals;
}
