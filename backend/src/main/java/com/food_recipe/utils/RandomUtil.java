package com.food_recipe.utils;

import java.util.Random;

public class RandomUtil {
    public static final String TEMPLATE_STRING = "abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789";
    public static final Random random = new Random();

    public static long randomNumber(int a, int b){
        if(a > b){
            return Math.round(Math.random() * (a - b) + b);
        }

        return Math.round(Math.random() * (b - a) + a);
    }

    public static String randomString(int length){
        StringBuilder builder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            char c = TEMPLATE_STRING.charAt(random.nextInt(TEMPLATE_STRING.length()));
            builder.append(c);
        }

        return builder.toString();
    }
}
