package com.food_recipe.authentication;

import com.food_recipe.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private IUserService service;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(service).passwordEncoder(passwordEncoder);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/api/v1/login").anonymous()
				.antMatchers("/api/v1/users/profile").authenticated()
				.antMatchers("/api/v1/users/**").permitAll()
				.antMatchers(HttpMethod.POST,"/api/v1/users/recipes").authenticated()
				.antMatchers(HttpMethod.PUT,"/api/v1/users/recipes").authenticated()
				.antMatchers(HttpMethod.DELETE,"/api/v1/users/recipes").authenticated()
				.antMatchers(HttpMethod.POST,"/api/v1/users/forgot").permitAll()
				.antMatchers(HttpMethod.GET).permitAll()
				.anyRequest().authenticated()
				.and()
				.httpBasic()
				.and()
				.cors()
				.and()
				.csrf().disable()
				.addFilterBefore(
						new JWTAuthenticationFilter("/api/v1/login", authenticationManager(), service),
						UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(
						new JWTAuthorizationFilter(),
						UsernamePasswordAuthenticationFilter.class);
	}

//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//		final CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowedMethods(ImmutableList.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
//		configuration.applyPermitDefaultValues();
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
//		return source;
//	}
}