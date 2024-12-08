package com.food_recipe.dto.user.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class UserAvatarUpdate {
    @NotNull(message = "Required imageFile")
    private MultipartFile imageFile;
}
