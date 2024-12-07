package com.food_recipe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket api(SecurityContext jwtSecurityContext){
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.food_recipe.controller"))
                .paths(PathSelectors.any())
                .build()
                .securityContexts(List.of(jwtSecurityContext))
                .securitySchemes(springfoxSecurityScheme())
                .apiInfo(apiInfo());
    }

    @Bean
    public List<SecurityScheme> springfoxSecurityScheme() {
        return Collections.singletonList(new ApiKey("JWT", "Authorization", "header"));
    }

    @Bean
    public SecurityContext springfoxSecurityContext(){
        return SecurityContext.builder()
                .securityReferences(defaultSpringfoxAuth())
                .build();
    }

    private List<SecurityReference> defaultSpringfoxAuth(){
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "Access everything with JWT");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;

        SecurityReference securityReference = new SecurityReference("JWT", authorizationScopes);
        return Collections.singletonList(securityReference);
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "API Documentation",
                "API documentation with JWT authentication",
                "1.0.0",
                "Terms of service",
                new Contact("Aresky", "www.example.com", "tn6354103@gmail.com"),
                "License of API", "API license URL", Collections.emptyList());
    }
}
