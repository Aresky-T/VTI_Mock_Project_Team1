package com.food_recipe.repository;

import com.food_recipe.entity.Voting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VotingRepository extends
        JpaRepository<Voting, Integer>,
        JpaSpecificationExecutor<Voting> {
}
