package com.food_recipe.utils;

import java.util.function.Consumer;

public class FieldUtil {
    public static <T> void updateIfValueNullable(Consumer<T> setter, T value){
        setter.accept(value);
    }

    public static <T> void updateIfValueNotNull(Consumer<T> setter, T value){
        if(value != null){
            setter.accept(value);
        }
    }
}
