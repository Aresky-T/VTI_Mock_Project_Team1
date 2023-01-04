package com.food_recipe.specification;

import com.food_recipe.dto.filter.RecipeFilter;
import com.food_recipe.entity.Recipes;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;


public class RecipeSpecificationBuilder {

    private RecipeFilter filter;
    private String search;

    public RecipeSpecificationBuilder(RecipeFilter filter, String search) {
        this.filter = filter;
        this.search = search;
    }

    @SuppressWarnings("deprecation")
    public Specification<Recipes> build() {

        SearchCriteria seachCriteria = new SearchCriteria("name", "Like", search);
        SearchCriteria minTotalRecipeCriteria = new SearchCriteria("totalRecipe", ">=", filter.getMinTotalRecipe());
        SearchCriteria maxTotalRecipeCriteria = new SearchCriteria("totalRecipe", "<=", filter.getMaxTotalRecipe());

        Specification<Recipes> where = null;

        // search
        if (!StringUtils.isEmpty(search)) {
            where = new RecipeSpecification(seachCriteria);
        }

        // min totalRecipe filter
        if (filter.getMinTotalRecipe() != 0) {
            if (where != null) {
                where = where.and(new RecipeSpecification(minTotalRecipeCriteria));
            } else {
                where = new RecipeSpecification(minTotalRecipeCriteria);
            }
        }

        // max totalRecipe filter
        if (filter.getMaxTotalRecipe() != 0) {
            if (where != null) {
                where = where.and(new RecipeSpecification(maxTotalRecipeCriteria));
            } else {
                where = new RecipeSpecification(maxTotalRecipeCriteria);
            }
        }

        return where;
    }
}
