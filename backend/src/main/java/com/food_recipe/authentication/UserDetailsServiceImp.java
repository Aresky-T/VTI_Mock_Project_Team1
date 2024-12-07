package com.food_recipe.authentication;

import com.food_recipe.entity.user.User;
import com.food_recipe.service.user.IUserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImp implements UserDetailsService {

    private final IUserService userService;

    public UserDetailsServiceImp(IUserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username);

        if(user == null){
            throw new UsernameNotFoundException("Invalid username!");
        }

        return new UserDetailsImplement(user);
    }
}
