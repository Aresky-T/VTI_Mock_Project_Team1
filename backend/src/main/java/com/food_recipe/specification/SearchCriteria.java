package com.food_recipe.specification;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchCriteria {
	private String key;
	private String operator;
	private Object value;

	public SearchCriteria(String key, String operator, Object value) {
		this.key = key;
		this.operator = operator;
		this.value = value;
	}
}
