package com.food_recipe.authentication;

import com.food_recipe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private IUserService userService;

	@Autowired
	private JWTAuthenticationProvider authenticationProvider;

	@Autowired
	private UserDetailsServiceImp customUserDetailsService;

	@Autowired
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailsService);
		auth.authenticationProvider(authenticationProvider);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/api/v1/login").anonymous()
				.antMatchers("/apy/v1/auth/**").authenticated()
				.antMatchers("/api/v1/users/profile/**").authenticated()
				.antMatchers("/api/v1/users/**").permitAll()
				.antMatchers(HttpMethod.POST,"/api/v1/recipes").authenticated()
				.antMatchers(HttpMethod.PUT,"/api/v1/recipes/**").authenticated()
//				.antMatchers(HttpMethod.DELETE,"/api/v1/recipes/**").authenticated()
				.antMatchers(HttpMethod.GET,"/api/v1/recipes/creator/**").authenticated()
				.antMatchers(HttpMethod.GET,"/api/v1/recipes/get-list-for-creator/**").authenticated()
//				.antMatchers("/api/v1/comment").authenticated()
				.antMatchers(HttpMethod.POST,"/api/v1/users/forgot").permitAll()
				.antMatchers("/api/v1/point").authenticated()
				.antMatchers("/api/v1/exchange").authenticated()
				.antMatchers(HttpMethod.GET).permitAll()
				.anyRequest().permitAll()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.httpBasic()
				.and()
				.cors()
				.and()
				.csrf().disable()
				.addFilterBefore(buildLoginAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(buildRequestAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	private JWTLoginAuthenticationFilter buildLoginAuthenticationFilter() throws Exception {
		return new JWTLoginAuthenticationFilter("/api/v1/login", getAuthenticationManager(), userService);
	}

	private JWTRequestAuthenticationFilter buildRequestAuthenticationFilter(){
		return new JWTRequestAuthenticationFilter(customUserDetailsService);
	}

	@Bean
	AuthenticationManager getAuthenticationManager() throws Exception {
		return super.authenticationManagerBean();
	}
}