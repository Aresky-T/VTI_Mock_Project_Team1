package com.food_recipe.entity.point;

import lombok.Getter;

@Getter
public enum EPointActivity {
    // lose point activity
    PURCHASE_RECIPE(EPointActivityType.LOSE_POINTS, "Purchased recipe", "Purchased recipe"),
    EARN_POINTS_FROM_SALE(EPointActivityType.EARN_POINTS, "Earned points from sales", "Earned points from sale of a recipe"),

    // earn point activity
    DAILY_LOGIN(EPointActivityType.EARN_POINTS, "Daily login", "Logged in daily"),
    REGISTER_ACCOUNT(EPointActivityType.EARN_POINTS, "Registered account", "Registered and activated new account to system"),
    INVITE_FRIEND(EPointActivityType.EARN_POINTS, "Invite friend","Invited a friend to join"),
    CONTRIBUTE_NEW_RECIPE(EPointActivityType.EARN_POINTS, "Contributed new recipe","Contributed a new recipe"),
    SUBMIT_WEBSITE_FEEDBACK(EPointActivityType.EARN_POINTS, "Submitted website feedback","Submit a feedback to improve the website"),
    SHARE_RECIPE_ON_SOCIAL(EPointActivityType.EARN_POINTS, "Shared a recipe on social","Shared a recipe on social media");

    private final EPointActivityType type;
    private final String description;
    private final String template;

    EPointActivity(EPointActivityType type, String description, String template){
        this.type = type;
        this.description = description;
        this.template = template;
    }
}
