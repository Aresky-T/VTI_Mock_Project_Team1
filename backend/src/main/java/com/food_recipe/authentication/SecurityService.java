//package com.food_recipe.authentication;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//
//@Service("securityService")
//public class SecurityService {
//    public boolean hasRole(String role){
//        System.out.println("role: " + role);
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        return authentication != null && authentication.getAuthorities().stream()
//                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_" + role));
//    }
//
//    public boolean hasAnyRole(String[] roles){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        for(String role : roles){
//            if(hasRole(role)) return true;
//        }
//
//        return false;
//    }
//}
