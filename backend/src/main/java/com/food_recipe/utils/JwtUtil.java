package com.food_recipe.utils;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.Map;

@Slf4j
public class JwtUtil {
    private static final long JWT_EXPIRATION = 864000000; // 10days
    private static final String JWT_SECRET_KEY = "123456";
    public static final String JWT_PREFIX = "Bearer";
    public static final String AUTHORIZATION = "Authorization";

    public static String removePrefixFromAuthorizationHeader(String authorizationHeader){
        if(authorizationHeader == null || authorizationHeader.isEmpty()){
            return null;
        }

        if(authorizationHeader.startsWith(JWT_PREFIX)){
            return authorizationHeader.substring(JWT_PREFIX.length()).trim();
        }

        return authorizationHeader;
    }

    public static String generateToken(String subject){
        return getBuilder().setSubject(subject).compact();
    }

    public static String generateToken(Claims claims){
        return getBuilder().setClaims(claims).compact();
    }

    public static String generateToken(Map<String, Object> properties){
        return getBuilder().setClaims(properties).compact();
    }

    public static boolean validateToken(String token){
        try {
            return getSubjectFromToken(token) != null;
        } catch (SignatureException | MalformedJwtException ex) {
            log.error("Invalid JWT token: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.error("JWT token is unsupported: {}", ex.getMessage());
        }
        return false;
    }

    public static String getSubjectFromToken(String token){
        Claims claims = getClaimsFromJwt(token);
        return claims != null ? claims.getSubject() : null;
    }

    public static Claims getClaimsFromJwt(String token){
        return Jwts.parser().setSigningKey(JWT_SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public static boolean isExpired(String token){
        Claims claims = getClaimsFromJwt(token);
        Date current = new Date(System.currentTimeMillis());
        Date expiration = claims.getExpiration();
        return current.after(expiration);
    }

    private static JwtBuilder getBuilder(){
        Date now = new Date(System.currentTimeMillis());
        Date expirationTime = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET_KEY);
    }
}
