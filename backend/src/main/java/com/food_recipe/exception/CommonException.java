package com.food_recipe.exception;

public class CommonException extends RuntimeException {
    public static final CommonException INVALID_USERNAME = build("Invalid username!");
    public static final CommonException INVALID_PASSWORD = build("Invalid password!");
    public static final CommonException USER_ALREADY_EXISTS = build("This user already exists!");

    public static final CommonException INVALID_RECIPE_NAME = build("Invalid recipe name!");
    public static final CommonException RECIPE_ALREADY_EXISTS = build("This recipe already exists!");
    public static final CommonException RECIPE_NAME_ALREADY_EXISTS = build("This recipe name already exists!");
    public static final CommonException INVALID_RECIPE_ID = build("Invalid recipeId!");
    public static final CommonException INVALID_CREATOR_ID = build("Invalid creatorId!");
    public static final CommonException INVALID_RECIPE_OWNER = build("Access denied: You are not the recipe owner!");
    public static final CommonException INVALID_RECIPE_CREATOR = build("Access denied: You are not the recipe creator!");

    public static final CommonException INVALID_REGION_NAME = build("Invalid region name");
    public static final CommonException INVALID_REGION_ID = build("Invalid region id");
    public static final CommonException REGION_DOES_NOT_EXISTS = build("This region doesn't exists!");
    public static final CommonException REGION_ALREADY_EXISTS = build("This region already exists!");
    public static final CommonException REGION_NAME_ALREADY_EXISTS = build("This region name already exists!");

    public CommonException(String message){
        super(message);
    }

    public static CommonException build (String message){
        return new CommonException(message);
    }
}
