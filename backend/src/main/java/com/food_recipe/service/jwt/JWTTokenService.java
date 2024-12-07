package com.food_recipe.service.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.food_recipe.dto.auth.response.LoginInfoUser;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.user.UserStatus;
import com.food_recipe.utils.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JWTTokenService {
    public static void addJWTTokenAndUserInfoToBody(HttpServletResponse response, User user) throws IOException {
        String JWT = JwtUtil.generateToken(user.getUsername());

        // convert user entity to user dto
        LoginInfoUser userDto = new LoginInfoUser(
                user.getStatus().equals(UserStatus.ACTIVE) ? JWT : null,
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAvatarUrl(),
                user.getStatus().toString(),
                user.getId(),
                user.getGender(),
                user.getPhone()
        );

        // convert object to json
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(userDto);

        // return json
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(json);
    }

    public static Authentication parseTokenToUserInformation(HttpServletRequest request){
        String authorization = request.getHeader(JwtUtil.AUTHORIZATION);

        if (authorization == null || !authorization.startsWith(JwtUtil.JWT_PREFIX)) return null;

//        String token = authorization.replace(JwtUtil.JWT_PREFIX, "").trim();
        String token = JwtUtil.removePrefixFromAuthorizationHeader(authorization);
        String username = JwtUtil.getSubjectFromToken(token);

        return username != null ?
                new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList()) :
                null;
    }
}
