package com.food_recipe.repository;

import com.food_recipe.entity.user.User;
import com.food_recipe.entity.user.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

	public boolean existsByUsername(String userName);

	public boolean existsByEmail(String email);

	@Query("	SELECT 	status 		"
			+ "	FROM 	User 		"
			+ " WHERE 	email = :email")
	public UserStatus findStatusByEmail(@Param("email") String email);

	public User findByUsername(String name);
	
	public User findByEmail(String email);

	@Query("SELECT (count(a) = 0) from User a where a.email = :email")    // SQL
	boolean isEmailNotExists(String email);
}
