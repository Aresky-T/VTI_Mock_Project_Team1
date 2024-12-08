package com.food_recipe.authentication;

import com.food_recipe.utils.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTRequestAuthenticationFilter extends OncePerRequestFilter {
    private final UserDetailsServiceImp userService;

    public JWTRequestAuthenticationFilter(UserDetailsServiceImp userService) {
        this.userService = userService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = getAuthorizationFromRequest(request);
        String token = JwtUtil.removePrefixFromAuthorizationHeader(authorizationHeader);

        if(token == null || !JwtUtil.validateToken(token)){
            filterChain.doFilter(request, response);
        } else {
            String username = JwtUtil.getSubjectFromToken(token);
            UserDetails userDetails = userService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());

            // Add request information details into authentication
            authentication.setDetails(buildAuthenticationDetails(request));

            // Add authentication object tor security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Go to next filter
            filterChain.doFilter(request, response);
        }
    }

    private String getAuthorizationFromRequest(HttpServletRequest request){
        return request.getHeader(HttpHeaders.AUTHORIZATION);
    }

    private WebAuthenticationDetails buildAuthenticationDetails(HttpServletRequest request){
        return new WebAuthenticationDetailsSource().buildDetails(request);
    }
}
