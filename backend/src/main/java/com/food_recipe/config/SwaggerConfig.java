package com.food_recipe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;
import java.util.Set;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return List.of(new SecurityReference("Authorization", authorizationScopes));
    }

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.OAS_30)
                .pathMapping("/")
                //  Define whether swagger is turned on, false is turned off, and can be controlled by variables
                .enable(true)
                //  Set the meta information of the api to be included in the json ResourceListing response.
                .securityContexts(List.of(securityContext()))
                .securitySchemes(List.of(apiKey()))
                .apiInfo(apiInfo())
                //  Which interfaces to choose to publish as swagger doc
                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.nms.master.controller"))
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .groupName("Final-exam")
                //  Supported communication protocol set
                .protocols(Set.of("https", "http"))
                ;
    }

    /**
     * The top half of the API page displays information
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .version("u.o.c")
                .title("Api Final Exam")
                .description("demo swagger for final exam")
                .contact(new Contact("VTI", null, "uoc@vti.edu.vn"))
                .termsOfServiceUrl("http://localhost:8080/").termsOfServiceUrl("http://192.168.88.210:8080/")
                .license("Apache 2.0")
                .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0.html")
                .build();
    }
}