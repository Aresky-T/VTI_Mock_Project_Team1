package com.food_recipe.dto.auth.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class LoginRequest {

    @NotNull(message = "Required username")
    private String username;

    @NotNull(message = "Required password")
    private String password;
}
