package com.food_recipe.authentication;

import com.food_recipe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthenticationConfig {

	@Bean(name = "myPasswordEncoder")
	public PasswordEncoder passwordEncoder() {
		DelegatingPasswordEncoder delegatingPasswordEncoder = (DelegatingPasswordEncoder) PasswordEncoderFactories.createDelegatingPasswordEncoder();
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		delegatingPasswordEncoder.setDefaultPasswordEncoderForMatches(bCryptPasswordEncoder);
		return delegatingPasswordEncoder;
	}

	@Bean
	public UserDetailsServiceImp userDetailsServiceImp(IUserService userService){
		return new UserDetailsServiceImp(userService);
	}

	@Bean
	public JWTAuthenticationProvider jwtAuthenticationProvider(
			UserDetailsServiceImp userDetailsService,
			@Qualifier("myPasswordEncoder") PasswordEncoder passwordEncoder
	){
		return new JWTAuthenticationProvider(userDetailsService, passwordEncoder);
	}
}
