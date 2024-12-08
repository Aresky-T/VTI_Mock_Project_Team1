package com.food_recipe.authentication.annotations;

import org.springframework.core.annotation.AliasFor;
import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@securityService.hasAnyRole(#roles)")
public @interface RequiredAnyRole {

    @AliasFor(annotation = PreAuthorize.class, attribute = "value")
    String[] value() default {};

    @AliasFor(annotation = PreAuthorize.class, attribute = "value")
    String[] roles() default {};
}
