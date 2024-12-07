package com.food_recipe.authentication;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

public class JWTAuthenticationProvider extends DaoAuthenticationProvider {

    private final UserDetailsServiceImp userService;

    public JWTAuthenticationProvider(UserDetailsServiceImp userService, PasswordEncoder passwordEncoder) {
        super();
        setUserDetailsService(userService);
        setPasswordEncoder(passwordEncoder);
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();

        if (username == null){
            throw new BadCredentialsException("Invalid credentials!");
        }

        UserDetails userDetails = userService.loadUserByUsername(username);

        String credentials = (String) authentication.getCredentials();
        String encodedUserPassword = userDetails.getPassword();

        if(credentials != null && !this.getPasswordEncoder().matches(credentials, encodedUserPassword)){
            throw new BadCredentialsException("Invalid password!");
        }

        return new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }
}
