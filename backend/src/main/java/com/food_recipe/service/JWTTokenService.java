package com.food_recipe.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.food_recipe.dto.LoginInfoUser;
import com.food_recipe.entity.User;
import com.food_recipe.entity.UserStatus;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;

public class JWTTokenService {

    private static final long EXPIRATION_TIME = 864000000; // 10days
    private static final String SECRET = "123456";
    private static final String PREFIX_TOKEN = "Bearer";
    private static final String AUTHORIZATION = "Authorization";

    public static void addJWTTokenAndUserInfoToBody(HttpServletResponse response, User user) throws IOException {
        String JWT = Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();

        // convert user entity to user dto
        LoginInfoUser userDto = new LoginInfoUser(
                user.getStatus().equals(UserStatus.ACTIVE) ? JWT : null,
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getStatus().toString(),
                user.getId(),
                user.getGender(),
                user.getPhone());

        // convert object to json
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(userDto);

        // return json
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(json);
    }

    public static Authentication parseTokenToUserInformation(HttpServletRequest request){
        String token = request.getHeader(AUTHORIZATION);

        if (token == null){
            return null;
        }

        //parse the token
        String username = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token.replace(PREFIX_TOKEN, ""))
                .getBody()
                .getSubject();

        return username != null ?
                new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList()) :
                null;
    }
}
