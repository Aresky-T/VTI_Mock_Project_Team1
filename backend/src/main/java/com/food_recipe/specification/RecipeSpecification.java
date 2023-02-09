package com.food_recipe.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.food_recipe.entity.Recipe;
import org.springframework.data.jpa.domain.Specification;

public class RecipeSpecification implements Specification<Recipe> {

	private static final long serialVersionUID = 1L;
	private SearchCriteria criteria;

	public RecipeSpecification(SearchCriteria criteria) {
		this.criteria = criteria;
	}

	@Override
	public Predicate toPredicate(Root<Recipe> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

		if (criteria.getOperator().equalsIgnoreCase("Like")) {
			return criteriaBuilder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
		}

//		if (criteria.getOperator().equalsIgnoreCase(">=")) {
//			return criteriaBuilder.greaterThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString());
//		}
//
//		if (criteria.getOperator().equalsIgnoreCase("<=")) {
//			return criteriaBuilder.lessThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString());
//		}

		return null;
	}

}
