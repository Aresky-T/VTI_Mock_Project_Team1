import React from "react";
import RecipeDetail from "../../components/HomeComponents/RecipeDetail";

const initallState = {
   homeItem: 1,
   listRecipes: "abc",
   recipeDetail: "",
   cart: "",
};
function HomeReducer(state = initallState, acction) {
   switch (acction.type) {
      case "SHOWLISTRECIPE":
         return {
            ...state,
            homeItem: 1,
            listRecipes: acction.payload,
         };
      case "SHOWRECIPEDETAIL":
         return {
            ...state,
            homeItem: <RecipeDetail />,
            recipeDetail: acction.payload,
         };

      default:
         return { ...state };
   }
}

export default HomeReducer;
